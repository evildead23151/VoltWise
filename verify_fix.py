import requests
import json

def verify():
    url = "http://localhost:8000/simulate"
    payload = {
        "state": "DL_BRPL_HT",
        "category": "Industrial",
        "load_mw": 1.0,
        "shift_type": "1_SHIFT_DAY"
    }
    
    print(f"--- Verifying Voltwise Backend v2.6 ---")
    print(f"Request: {json.dumps(payload)}")
    
    try:
        r = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {r.status_code}")
        
        if r.status_code == 200:
            data = r.json()
            print("[SUCCESS] Backend Operational")
            print(f"Expected Cost: ₹{data['financials']['expected_cost_inr']:,.2f}")
            print(f"Live Market: {data['market_status']['iex_dam_price_inr_kwh']} INR/kWh")
            return True
        else:
            print(f"[FAILURE] Error: {r.text}")
            return False
            
    except Exception as e:
        print(f"[ERROR] Connection Failed: {e}")
        return False

if __name__ == "__main__":
    verify()
