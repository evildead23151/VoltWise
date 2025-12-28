from typing import Dict, List, Any
import numpy as np

class TariffEngine:
    """
    Layer 2 Service: Tariff Engine
    
    Responsibility: Deterministic calculation of specific valid tariff rules.
    Architecture Ref: System Architecture Section 2 (Layer 2)
    
    Axiom Compliance:
    - No Prediction: This engine calculates *costs* based on inputs, it does not forecast rates.
    - Visibility: Breakdown of Fixed vs. Variable vs. Regulatory charges.
    """
    
    def __init__(self, tariff_code: str = "MH_MSEDCL_HT"):
        """
        Initialize the multi-state tariff registry.
        Codes follow [STATE]_[DISCOM]_[TYPE] format.
        """
        self._registry = {
            "MH_MSEDCL_HT": {
                "name": "Maharashtra (MSEDCL)",
                "fixed_charges_inr_per_kva": 550.0,
                "energy_base_inr_per_kwh": 8.20,
                "tod_multiplier": 1.15, # Peak period impact simulated
                "surcharges": {"fppca": 1.65, "duty": 0.16, "css": 0.80}
            },
            "KA_BESCOM_HT": {
                "name": "Karnataka (BESCOM)",
                "fixed_charges_inr_per_kva": 475.0,
                "energy_base_inr_per_kwh": 7.60,
                "tod_multiplier": 1.10,
                "surcharges": {"fppca": 1.45, "duty": 0.09, "css": 0.65}
            },
            "GJ_GUVNL_HT": {
                "name": "Gujarat (GUVNL)",
                "fixed_charges_inr_per_kva": 420.0,
                "energy_base_inr_per_kwh": 6.90,
                "tod_multiplier": 1.05,
                "surcharges": {"fppca": 1.20, "duty": 0.15, "css": 0.40}
            },
            "TN_TANGEDCO_HT": {
                "name": "Tamil Nadu (TANGEDCO)",
                "fixed_charges_inr_per_kva": 600.0,
                "energy_base_inr_per_kwh": 7.50,
                "tod_multiplier": 1.25, # High peak sensitivity
                "surcharges": {"fppca": 1.30, "duty": 0.10, "css": 1.20} # High CSS
            },
            "DL_BRPL_HT": {
                "name": "Delhi (BSES BRPL)",
                "fixed_charges_inr_per_kva": 250.0,
                "energy_base_inr_per_kwh": 8.50,
                "tod_multiplier": 1.05,
                "surcharges": {"fppca": 3.20, "duty": 0.22, "css": 0.00} # PPAC is 35%+ in DL
            }
        }
        self.set_tariff(tariff_code)

    def set_tariff(self, code: str):
        if code in self._registry:
            self.tariff_code = code
            self.structure = self._registry[code]
        else:
            # Fallback to KA if invalid
            self.tariff_code = "KA_BESCOM_HT"
            self.structure = self._registry["KA_BESCOM_HT"]

    def calculate_bill(self, 
                      contract_demand_kva: float, 
                      price_scenarios: np.ndarray,
                      load_profile_mw: np.ndarray = None,
                      **kwargs) -> Dict[str, Any]:
        """
        Calculate bill using the selected state's regulatory structure.
        Compatible with vectorized (2D) price and load tensors (N paths, T steps).
        """
        # 1. Fixed Charges (Regulated)
        fixed_cost = contract_demand_kva * self.structure["fixed_charges_inr_per_kva"]
        
        # 2. Variable Energy (Full Vectorization)
        if price_scenarios is not None and load_profile_mw is not None:
            # Handle Load Shaping per path
            # load_profile_mw could be (T,) or (N, T)
            energy_per_block_kwh = load_profile_mw * 250.0 
            path_total_load_kwh = np.sum(energy_per_block_kwh, axis=-1)
            
            # Application of ToD Multiplier (Systemic Peak Exposure)
            tod_impact = self.structure["tod_multiplier"]
            
            # Base Market Cost (Vectorized product of Price and Volume)
            # If load is (T,) and price is (N, T), NumPy broadcasts correctly.
            # If both are (N, T), it performs path-wise dot products.
            base_variable_cost = np.sum(price_scenarios * energy_per_block_kwh, axis=-1) * tod_impact
            
            # State Surcharges (FPPCA + CSS applied to path-specific volume)
            surcharges_per_unit = self.structure["surcharges"]["fppca"] + self.structure["surcharges"]["css"]
            variable_cost_total = base_variable_cost + (path_total_load_kwh * surcharges_per_unit)
            
        else:
            # Deterministic Fallback (Legacy)
            load_kwh = kwargs.get("load_kwh", 0)
            base_rate = self.structure["energy_base_inr_per_kwh"]
            variable_cost_total = load_kwh * (base_rate + self.structure["surcharges"]["fppca"])
            path_total_load_kwh = load_kwh

        # 3. Regulatory Duty (State Tax)
        duty = (fixed_cost + variable_cost_total) * self.structure["surcharges"]["duty"]

        total_bill = fixed_cost + variable_cost_total + duty
        
        return {
            "state_manifest": self.structure["name"],
            "components": {
                "fixed_charges": float(fixed_cost),
                "variable_charges": variable_cost_total,
                "regulatory_charges": duty,
            },
            "total_estimated_bill": total_bill,
            "effective_rate": total_bill / path_total_load_kwh if np.any(path_total_load_kwh > 0) else 0
        }
