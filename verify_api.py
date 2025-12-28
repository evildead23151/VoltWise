import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    url = f"{BASE_URL}/simulate"
    
    payload = {
        "state": "DL_BRPL_HT", # Testing the new Delhi Jurisdiction
        "category": "Industrial",
        "load_mw": 5.0,
        "shift_type": "2_SHIFT_MORNING_EVENING"
    }
    
    print(f"Sending Request to {url}...")
    response = None
    try:
        response = requests.post(url, json=payload)
        
        if response.status_code == 200:
            data = response.json()
            print("\n[SUCCESS] API Responded")
            print("------------------------------------------------")
            print(f"Jurisdiction: {data.get('market_status', {}).get('source')} -> DL (BSES BRPL)")
            print(f"Live Market Anchor: ₹{data.get('market_status', {}).get('iex_dam_price_inr_kwh')}/kWh")
            print(f"Scenarios Run: {data.get('meta', {}).get('scenarios_run')}")
            print(f"Expected Monthly Cost: ₹{data.get('financials', {}).get('expected_cost_inr'):,.2f}")
            print("------------------------------------------------")
                
            print("\nUsage Physics:")
            print(f"Total Energy: {data.get('physics', {}).get('total_energy_kwh'):,.0f} kWh")
        else:
            print(f"\n[FAILURE] Status: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"\n[ERROR] Could not connect: {str(e)}")
        print("Ensure the uvicorn server is running.")

    print(f"\nSimulation Test: {'SUCCESS' if response is not None and response.status_code == 200 else 'FAILED'}")

    # 2. Test Assumptions Registry
    print("\nTesting /assumptions...")
    try:
        res_assump = requests.get(f"{BASE_URL}/assumptions")
        if res_assump.status_code == 200:
            data = res_assump.json()
            print(f"Assumptions V{data['version_id']} retrieved. Inflation: {data['inflation_rate']}")
        else:
            print(f"FAILED to fetch assumptions: {res_assump.status_code}")
    except Exception as e:
         print(f"Error fetching assumptions: {e}")

    # 3. Test Scenarios Summary
    print("\nTesting /scenarios/summary...")
    try:
        res_scen = requests.get(f"{BASE_URL}/scenarios/summary")
        if res_scen.status_code == 200:
            data = res_scen.json()
            print(f"Scenario Engine: {data['engine']} (Default N={data['default_n']})")
        else:
            print(f"FAILED to fetch scenarios: {res_scen.status_code}")
    except Exception as e:
        print(f"Error fetching scenarios: {e}")

if __name__ == "__main__":
    test_api()
