import requests

payload = {
    "state": "MH_MSEDCL_HT",
    "category": "HT-2A",
    "load_mw": 1.0,
    "shift_type": "1_SHIFT_DAY",
    "market": "IN_IEX"
}

try:
    response = requests.post("http://localhost:8000/simulate", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Body: {response.text}")
except Exception as e:
    print(f"Error: {e}")
