import numpy as np
from typing import Dict
from dataclasses import dataclass

@dataclass
class SimulationResult:
    scenarios: np.ndarray  # Shape: (num_scenarios, num_timesteps)
    percentiles: Dict[str, np.ndarray] # p10, p50, p90
    tail_risk_events: int # Count of scenarios exceeding safety thresholds

class MonteCarloEngine:
    """
    The Core Stochastic Engine.
    dX_t = theta * (mu - X_t) * dt + sigma * dW_t
    """

    def __init__(self, num_scenarios: int = 500, time_steps: int = 96):
        self.num_scenarios = num_scenarios
        self.time_steps = time_steps

    def generate_price_paths(self, 
                             base_price: float, 
                             volatility: float, 
                             mean_reversion_speed: float = 0.1) -> SimulationResult:
        
        # Initialize arrays efficiently
        paths = np.empty((self.num_scenarios, self.time_steps))
        paths[:, 0] = base_price
        
        dt = 1.0
        shocks = np.random.normal(0, np.sqrt(dt), size=(self.num_scenarios, self.time_steps))
        
        # Optimized OU Loop
        current_paths = np.full(self.num_scenarios, base_price)
        for t in range(1, self.time_steps):
            drift = mean_reversion_speed * (base_price - current_paths) * dt
            diffusion = volatility * shocks[:, t]
            current_paths = np.maximum(current_paths + drift + diffusion, 0.5)
            paths[:, t] = current_paths

        # High-Resolution Quantile Mapping (Axiom 60)
        p10 = np.percentile(paths, 10, axis=0)
        p50 = np.percentile(paths, 50, axis=0)
        p90 = np.percentile(paths, 90, axis=0)
        
        # Identify Tail Risks (Prices > 2x Mean)
        tail_threshold = base_price * 2.0
        tail_count = np.sum(np.max(paths, axis=1) > tail_threshold)

        return SimulationResult(
            scenarios=paths,
            percentiles={
                "p10": p10,
                "p50": p50,
                "p90": p90
            },
            tail_risk_events=int(tail_count)
        )
