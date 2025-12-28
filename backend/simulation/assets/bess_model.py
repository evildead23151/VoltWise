import numpy as np
from typing import Dict, Any, List
from dataclasses import dataclass

@dataclass
class BESSConfig:
    capacity_mwh: float = 4.0
    power_mw: float = 1.0  # 4-hour duration
    round_trip_efficiency: float = 0.88
    min_soc: float = 0.1
    max_soc: float = 0.9
    initial_soc: float = 0.5
    degradation_cost_per_cycle_inr: float = 5000.0 # Estimated cost of wear

class BESSSimulator:
    """
    Axiom 40: Latent Multi-Physics BESS Model
    
    Strictly for counterfactual risk simulation. 
    Models the physics of a 4-hour Li-ion system to evaluate 
    volatility dampening and tail-risk reduction.
    """
    
    def __init__(self, config: BESSConfig = BESSConfig()):
        self.config = config
        self.soc = config.initial_soc
        self.energy_stored_mwh = config.capacity_mwh * self.soc
        
        # Stats tracking for Decision Support
        self.soc_history = []
        self.cycle_count = 0.0
        self.degradation_accumulated_inr = 0.0

    def simulate_dispatch(self, price_paths: np.ndarray, load_profiles_mw: np.ndarray) -> Dict[str, np.ndarray]:
        """
        Axiom 50: Hyper-Scale Vectorized Dispatch.
        
        Processes all stochastic paths (N) simultaneously across time steps (T).
        Input shapes: (N, T)
        """
        n_paths, t_steps = price_paths.shape
        
        # Initialize Tensors
        bess_action_mw = np.zeros((n_paths, t_steps))
        soc_trail = np.zeros((n_paths, t_steps))
        
        # Current state per path
        current_soc = np.full(n_paths, self.config.initial_soc)
        current_energy_mwh = current_soc * self.config.capacity_mwh
        cycle_count = np.zeros(n_paths)

        # Dynamic Thresholding (Vectorized per path)
        # We can use a rolling mean or global mean per path
        price_means = np.mean(price_paths, axis=1) # (N,)
        charge_thresholds = price_means * 0.8
        discharge_thresholds = price_means * 1.2

        for t in range(t_steps):
            prices = price_paths[:, t]
            
            # Logic Masks (N, )
            wants_charge = (prices < charge_thresholds) & (current_soc < self.config.max_soc)
            wants_discharge = (prices > discharge_thresholds) & (current_soc > self.config.min_soc)

            # 1. Charge Logic (Vectorized)
            avail_cap = (self.config.max_soc - current_soc) * self.config.capacity_mwh
            charge_power = np.minimum(self.config.power_mw, avail_cap / 0.25)
            
            # 2. Discharge Logic (Vectorized)
            avail_energy = (current_soc - self.config.min_soc) * self.config.capacity_mwh
            discharge_power = np.minimum(self.config.power_mw, avail_energy / 0.25)

            # Calculate Net Actions
            actions = np.zeros(n_paths)
            actions[wants_charge] = charge_power[wants_charge]
            actions[wants_discharge] = -discharge_power[wants_discharge]

            # Update Physics (Vectorized)
            # Energy Change: +ive for charge (efficiency applied), -ive for discharge
            energy_change = np.where(actions > 0, 
                                     actions * 0.25 * self.config.round_trip_efficiency, 
                                     actions * 0.25)
            
            current_energy_mwh += energy_change
            current_soc = current_energy_mwh / self.config.capacity_mwh
            
            # Enforce Hard Physics Constraints
            current_soc = np.clip(current_soc, self.config.min_soc, self.config.max_soc)
            current_energy_mwh = current_soc * self.config.capacity_mwh

            # Tracking
            bess_action_mw[:, t] = actions
            soc_trail[:, t] = current_soc
            cycle_count += np.where(actions > 0, (actions * 0.25) / self.config.capacity_mwh, 0)

        degradation_inr = cycle_count * self.config.degradation_cost_per_cycle_inr
        
        return {
            "bess_action_mw": bess_action_mw,
            "soc_trail": soc_trail,
            "net_load_mw": load_profiles_mw + bess_action_mw,
            "path_degradation_inr": degradation_inr,
            "mean_degradation_inr": np.mean(degradation_inr)
        }

    def reset(self):
        self.soc = self.config.initial_soc
        self.energy_stored_mwh = self.config.capacity_mwh * self.soc
        self.cycle_count = 0.0
        self.degradation_accumulated_inr = 0.0
