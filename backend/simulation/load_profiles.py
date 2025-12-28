import numpy as np
from typing import Dict, Any

class LoadProfileGenerator:
    """
    Step 3: Synthetic Load Engine
    """
    
    def __init__(self, time_steps: int = 96):
        self.time_steps = time_steps
        
    def generate_industrial_profile(self, 
                                  base_load_mw: float, 
                                  shift_type: str = "1_SHIFT_DAY") -> np.ndarray:
        
        t = np.arange(self.time_steps)
        daily_cycle = t % 96
        profile = np.full(self.time_steps, base_load_mw)
        
        if shift_type == "1_SHIFT_DAY":
            # 8 AM to 8 PM
            is_day_shift = (daily_cycle >= 32) & (daily_cycle <= 80)
            profile = np.where(is_day_shift, base_load_mw, base_load_mw * 0.1)
        elif shift_type == "2_SHIFT_MORNING_EVENING":
            # 6 AM to 10 PM
            is_running = (daily_cycle >= 24) & (daily_cycle <= 88)
            profile = np.where(is_running, base_load_mw, base_load_mw * 0.1)
        elif shift_type == "3_SHIFT_CONTINUOUS":
            pass # Mostly flat
            
        # Add 5% noise
        noise = np.random.normal(0, 0.05 * base_load_mw, size=self.time_steps)
        profile = np.maximum(profile + noise, 0.0)
        
        return profile
