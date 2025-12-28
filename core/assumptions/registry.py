from datetime import datetime
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field

class AssumptionSet(BaseModel):
    """
    Represents a frozen set of assumptions for a specific simulation run.
    Once created, this should be treated as immutable.
    """
    version_id: str = Field(..., description="Unique semantic version of this assumption set")
    valid_from: datetime = Field(..., description="Date from which these assumptions are valid")
    
    # Macro-economic Assumptions
    inflation_rate: float = Field(default=0.06, description="Annual inflation rate (CPI)")
    interest_rate: float = Field(default=0.09, description="Cost of capital (WACC)")
    
    # Grid Physics Assumptions
    grid_loss_factor: float = Field(default=0.14, description="Technical and commercial loss factor")
    coal_shortage_probability: float = Field(default=0.05, description="Probability of critical coal shortage event")
    
    # Market Assumptions (IEX)
    dam_volatility_sigma: float = Field(default=0.18, description="15-min volatility standard deviation")
    rtm_spread_premium: float = Field(default=0.12, description="Premium of RTM over DAM on average")
    
    # Policy Assumptions
    cross_subsidy_growth: float = Field(default=0.03, description="Annual growth in CSS charges")

    class Config:
        frozen = True

class AssumptionsRegistry:
    """
    The Single Source of Truth for all simulation parameters.
    Ensures that every simulation run is traceable back to a specific set of beliefs.
    """
    
    def __init__(self):
        self._registry: Dict[str, AssumptionSet] = {}
        # Initialize with baseline assumptions
        self.register(AssumptionSet(
            version_id="1.0.0",
            valid_from=datetime(2023, 11, 1),
            inflation_rate=0.055,
            coal_shortage_probability=0.04
        ))

    def register(self, assumptions: AssumptionSet) -> None:
        """Register a new set of assumptions."""
        if assumptions.version_id in self._registry:
            raise ValueError(f"Version {assumptions.version_id} already exists.")
        self._registry[assumptions.version_id] = assumptions

    def get(self, version_id: str) -> AssumptionSet:
        """Retrieve a specific version of assumptions."""
        if version_id not in self._registry:
            raise KeyError(f"Assumption version {version_id} not found.")
        return self._registry[version_id]

    def get_latest(self) -> AssumptionSet:
        """Get the most recently added assumption set."""
        # In a real DB implementation, this would query by date.
        # For this in-memory mock, we return the last added.
        return list(self._registry.values())[-1]

# Global singleton instance
params = AssumptionsRegistry()
