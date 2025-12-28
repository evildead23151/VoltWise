import numpy as np
from typing import Dict, Any, List
from dataclasses import dataclass

@dataclass
class HydrogenConfig:
    name: str = "Green Hydrogen Electrolyzer"
    power_rating_mw: float = 5.0
    min_stable_load_pct: float = 0.15 # Cannot run below 15% without purge
    ramp_up_limit_mw_per_min: float = 0.5 # Slower than BESS
    ramp_down_limit_mw_per_min: float = 1.0
    efficiency_kwh_per_kg_h2: float = 55.0 # Energy intensity

class HydrogenSimulator:
    """
    Axiom 70: Multi-Physics Hydrogen Model
    
    Models the physics of an alkaline/PEM electrolyzer system.
    Focus: Counterfactual load-following and risk absorption.
    """
    
    def __init__(self, config: HydrogenConfig = HydrogenConfig()):
        self.config = config

    def simulate_dispatch(self, price_paths: np.ndarray, load_profiles_mw: np.ndarray) -> Dict[str, np.ndarray]:
        """
        Axiom 70: Vectorized Hydrogen Dispatch.
        
        Logic: Operates when prices are below a critical "Green H2 Break-even".
        Constraints: Hard ramp rates and minimum stable load.
        """
        n_paths, t_steps = price_paths.shape
        
        # Initialize Tensors
        h2_load_mw = np.zeros((n_paths, t_steps))
        production_kg_h2 = np.zeros(n_paths)
        
        # Current state per path
        current_load_mw = np.zeros(n_paths)
        
        # H2 Break-even Threshold (Mocked @ ₹3.5/kWh for research)
        h2_break_even = 3.5

        for t in range(t_steps):
            prices = price_paths[:, t]
            
            # Target Load based on price signal
            target_load_mw = np.where(prices < h2_break_even, self.config.power_rating_mw, 0.0)
            
            # Apply Ramp Constraints (15-min blocks = 15 * ramp_per_min)
            max_ramp_up = self.config.ramp_up_limit_mw_per_min * 15
            max_ramp_down = self.config.ramp_down_limit_mw_per_min * 15
            
            potential_load = np.clip(target_load_mw, 
                                     current_load_mw - max_ramp_down,
                                     current_load_mw + max_ramp_up)
            
            # Apply Min Stable Load Constraint (Purge vs Run)
            is_above_min = potential_load >= (self.config.power_rating_mw * self.config.min_stable_load_pct)
            actual_load = np.where(is_above_min, potential_load, 0.0)
            
            # Physics Tracking
            h2_load_mw[:, t] = actual_load
            # Daily Production: energy (MWh) / efficiency (kWh/kg)
            production_kg_h2 += (actual_load * 0.25 * 1000) / self.config.efficiency_kwh_per_kg_h2
            
            current_load_mw = actual_load

        return {
            "asset_load_mw": h2_load_mw,
            "net_load_mw": load_profiles_mw + h2_load_mw,
            "total_production_kg": production_kg_h2,
            "mean_production_kg": np.mean(production_kg_h2)
        }
