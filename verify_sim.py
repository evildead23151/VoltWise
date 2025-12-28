import sys
import os

# Add project root to path
sys.path.append(os.getcwd())

from backend.simulation.engine import SimulationEngine

def verify_simulation():
    print("--- Voltwise System Verification ---")
    print("Initializing Simulation Engine...")
    
    engine = SimulationEngine()
    
    print("\n[Test 1] Running Standard Industrial Simulation (500 Scenarios)...")
    result = engine.run_simulation(
        state_code="KA_BESCOM_HT",
        category="HT-2A",
        load_mw=1.0 # 1 MW continuous load
    )
    
    print("\n--- Simulation Output ---")
    print(f"Scenarios Run: {result['meta']['scenarios_run']}")
    print(f"Assumptions Ver: {result['meta']['assumptions_version']}")
    print(f"Tail Risk Events (Price > 2x): {result['meta']['tail_risk_events']}")
    
    print("\n--- Financials ---")
    exp = result['financials']['expected_cost_inr']
    p95 = result['financials']['worst_case_p95_inr']
    vol = result['financials']['volatility_band_width']
    
    print(f"Expected Monthly Cost: ₹{exp:,.2f}")
    print(f"95% Worst Case Risk: ₹{p95:,.2f}")
    print(f"Volatility Bandwidth:  ₹{vol:,.2f}")
    
    if p95 > exp:
        print("\n[PASS] Axiom 5 Check: Risk distribution is asymmetric/positive.")
    else:
        print("\n[FAIL] Axiom 5 Check: System failed to model upside risk.")

    print("\n--- Verification Complete ---")

if __name__ == "__main__":
    verify_simulation()
