from typing import Dict, Any, List
from core.assumptions.registry import params
from backend.simulation.monte_carlo import MonteCarloEngine
from backend.simulation.load_profiles import LoadProfileGenerator
from backend.tariffs.engine import TariffEngine
from backend.insights.rules import InsightEngine
from backend.data.connector import market_connector
from backend.data.global_registry import market_registry
from backend.simulation.assets.bess_model import BESSSimulator, BESSConfig
from backend.simulation.assets.hydrogen_model import HydrogenSimulator, HydrogenConfig
import numpy as np

class SimulationEngine:
    """
    Scenario Comparator Engine (Axiom 70: Multi-Physics)
    
    Responsibility: Compare baseline load exposure against counterfactual latent asset scenarios.
    """
    
    def __init__(self):
        self.tariff_engine = TariffEngine()
        self.load_generator = LoadProfileGenerator()
        self.bess_sim = BESSSimulator()
        self.h2_sim = HydrogenSimulator()

    def run_simulation(self, 
                       state_code: str = "MH_MSEDCL_HT", 
                       category: str = "Industrial", 
                       load_mw: float = 1.0, 
                       num_scenarios: int = 1000,
                       shift_type: str = "1_SHIFT_DAY",
                       market_code: str = "IN_IEX",
                       with_asset: bool = True,
                       asset_type: str = "BESS",
                       **kwargs) -> Dict[str, Any]:
        """
        Runs a multi-physics hyper-scale counterfactual risk comparison study.
        """
        assumptions = params.get_latest()

        # 1. Physics: Generate Load Profile
        load_profile_mw = self.load_generator.generate_industrial_profile(
            base_load_mw=load_mw, 
            shift_type=shift_type
        )
        
        # 2. Market Grounding
        market_engine = market_registry.get_market(market_code)
        market_mark = market_engine.get_latest_mark()
        live_price_anchor = market_mark.price_inr_kwh

        # 3. Stochastic Generation (Axiom 50: Vectorized Scaling)
        mc_engine = MonteCarloEngine(num_scenarios=num_scenarios)
        price_sim = mc_engine.generate_price_paths(
            base_price=live_price_anchor,
            volatility=assumptions.dam_volatility_sigma
        )
        scenarios = price_sim.scenarios 

        # 4. Multi-Physics Asset Grounding (Counterfactual)
        asset_impact = None
        asset_results = None
        sim_load_profiles_mw = np.tile(load_profile_mw, (num_scenarios, 1))
        
        if with_asset:
            if asset_type == "BESS":
                self.bess_sim.reset()
                asset_results = self.bess_sim.simulate_dispatch(scenarios, sim_load_profiles_mw)
                sim_load_profiles_mw = asset_results["net_load_mw"]
                asset_impact = {
                    "type": "BESS (4h Li-ion)",
                    "soc_trail": asset_results["soc_trail"][0].tolist(),
                    "mean_degradation_inr": float(asset_results["mean_degradation_inr"])
                }
            elif asset_type == "HYDROGEN":
                asset_results = self.h2_sim.simulate_dispatch(scenarios, sim_load_profiles_mw)
                sim_load_profiles_mw = asset_results["net_load_mw"]
                asset_impact = {
                    "type": "Hydrogen Electrolyzer",
                    "production_kg": float(asset_results["mean_production_kg"]),
                    "load_trail": asset_results["asset_load_mw"][0].tolist()
                }

        # 5. Financial Exposure Mapping (Regulatory Reality)
        self.tariff_engine.set_tariff(state_code)
        
        # Calculate Exposure (Vectorized over paths)
        bill_results = self.tariff_engine.calculate_bill(
            contract_demand_kva=load_mw * 1000 / 0.9,
            price_scenarios=scenarios,
            load_profile_mw=sim_load_profiles_mw
        )

        costs = bill_results["total_estimated_bill"]
        
        # 6. Axiom 50: Extreme Tail Search
        # Identify the single worst-case scenario
        worst_idx = np.argmax(costs)
        
        # Guarded access for asset-specific metrics
        bess_soc_at_peak = 0.0
        if with_asset and asset_results:
            peak_time_idx = np.argmax(scenarios[worst_idx])
            bess_soc_at_peak = float(asset_results["soc_trail"][worst_idx][peak_time_idx])

        tail_event = {
            "path_index": int(worst_idx),
            "max_price": float(np.max(scenarios[worst_idx])),
            "peak_hour": int(np.argmax(scenarios[worst_idx])),
            "cost_inr": float(costs[worst_idx]),
            "bess_soc_at_peak": bess_soc_at_peak
        }

        financials = {
            "expected_cost_inr": float(np.mean(costs)),
            "p05_inr": float(np.percentile(costs, 5)),
            "p95_inr": float(np.percentile(costs, 95)),
            "tail_risk_at_p99_inr": float(np.percentile(costs, 99)),
            "volatility": float(np.std(costs)),
            "tail_event": tail_event,
            "market": {
                "anchor": live_price_anchor,
                "source": market_mark.source,
                "currency": market_mark.currency
            }
        }

        # 7. Causal Insight Generation
        meta_data = {
            "state": state_code,
            "category": category,
            "asset_present": with_asset,
            "paths": num_scenarios
        }
        
        insight_engine = InsightEngine()
        report = insight_engine.generate_insights(financials, meta_data)

        return {
            "meta": meta_data,
            "financials": financials,
            "asset_analysis": asset_impact,
            "insights": report,
            "raw_costs": costs.tolist(),
            "distribution": {
                "p05": financials["p05_inr"],
                "p50": financials["expected_cost_inr"],
                "p95": financials["p95_inr"]
            }
        }
