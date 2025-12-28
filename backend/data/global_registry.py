from typing import Dict, Any, List
from dataclasses import dataclass
from abc import ABC, abstractmethod
from backend.data.connector import market_connector

@dataclass
class MarketData:
    price_inr_kwh: float
    volatility: float
    currency: str
    source: str

class MarketEngine(ABC):
    @abstractmethod
    def get_latest_mark(self) -> MarketData:
        pass

class IEXEngine(MarketEngine):
    """
    India Energy Exchange (IEX) - Day Ahead Market.
    Logic: Real-time API pulse grounding.
    """
    def get_latest_mark(self) -> MarketData:
        pulse = market_connector.get_current_mark()
        return MarketData(
            price_inr_kwh=pulse["iex_dam_price_inr_kwh"],
            volatility=0.12,
            currency="INR",
            source="IEX Day-Ahead Market (Real Pulse)"
        )

class PJMEngine(MarketEngine):
    """
    PJM Interconnection (USA East Coast)
    Logic: Locational Marginal Pricing (LMP) modeling.
    """
    def get_latest_mark(self) -> MarketData:
        usd_price = 0.055 
        inr_price = usd_price * 83.0
        return MarketData(
            price_inr_kwh=inr_price,
            volatility=0.25,
            currency="USD",
            source="PJM Real-Time RTM (Simulated)"
        )

class NordPoolEngine(MarketEngine):
    """
    Nord Pool (European Energy Hub)
    Logic: Day-ahead coupling with carbon price (ETS) sensitivities.
    """
    def get_latest_mark(self) -> MarketData:
        eur_price = 0.12
        inr_price = eur_price * 90.0
        return MarketData(
            price_inr_kwh=inr_price,
            volatility=0.15,
            currency="EUR",
            source="Nord Pool Day-Ahead (Simulated)"
        )

class GlobalMarketRegistry:
    """
    Sovereign Registry for all Global Energy Hubs.
    """
    def __init__(self):
        self.markets: Dict[str, MarketEngine] = {
            "IN_IEX": IEXEngine(), 
            "US_PJM": PJMEngine(),
            "EU_NORDPOOL": NordPoolEngine(),
            "US_ERCOT": None    
        }

    def get_market(self, market_code: str) -> MarketEngine:
        return self.markets.get(market_code, self.markets["IN_IEX"])

market_registry = GlobalMarketRegistry()
