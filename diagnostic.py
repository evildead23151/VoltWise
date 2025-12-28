import traceback
import sys
import os

# Add current directory to path
sys.path.append(os.getcwd())

from backend.simulation.engine import SimulationEngine

def diagnostic():
    engine = SimulationEngine()
    try:
        print("Starting Diagnostic Simulation...")
        result = engine.run_simulation(
            state_code="DL_BRPL_HT",
            category="Industrial",
            load_mw=1.0,
            shift_type="1_SHIFT_DAY"
        )
        print("SUCCESS! Result generated.")
        print(f"IEX Price: {result['market_status']['iex_dam_price_inr_kwh']}")
    except Exception:
        print("--- DIAGNOSTIC FAILURE ---")
        traceback.print_exc()

if __name__ == "__main__":
    diagnostic()
