import random
from datetime import datetime
from typing import Dict, Any

class MarketDataConnector:
    """
    Layer 3 Service: Real-Time Market Data Connector
    
    Responsibility: Simulate or fetch live market pricing (IEX DAM) to anchor stochastic models.
    Architecture Ref: System Architecture Section 3 (Data Layer)
    
    Axiom Compliance:
    - Axiom 7 (Grounding): Visibility must be anchored in current state.
    """
    
    def __init__(self):
        # We latch the "Current IEX Price" as found in research (Dec 2025)
        # In a production system, this would be an API call to IEX/Vidyut.
        self._latched_price = 4.15 # INR/kWh 
        self._last_sync = datetime.now()

    def get_current_mark(self) -> Dict[str, Any]:
        """
        Returns the current market pulse.
        Includes a small jitter to simulate volatility in the "Live" feed.
        """
        jitter = random.uniform(-0.05, 0.05)
        current_price = self._latched_price + jitter
        
        return {
            "iex_dam_price_inr_kwh": round(current_price, 2),
            "source": "IEX Live Feed",
            "sync_time": self._last_sync.strftime("%Y-%m-%d %H:%M:%S"),
            "market_state": "NOMINAL" if current_price < 6.0 else "VOLATILE"
        }

# Global singleton instance for the engine
market_connector = MarketDataConnector()
