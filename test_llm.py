import requests

# 1. First get a simulation result
payload_sim = {
    "state": "MH_MSEDCL_HT",
    "category": "HT-2A",
    "load_mw": 1.0,
    "shift_type": "1_SHIFT_DAY",
    "market": "IN_IEX"
}

print("Stepping 1: Running Simulation...")
res_sim = requests.post("http://localhost:8000/simulate", json=payload_sim)
sim_data = res_sim.json()

# 2. Now call LLM analysis
payload_llm = {
    "financials": sim_data["financials"],
    "meta": sim_data["meta"]
}

print("Stepping 2: Calling LLM Analysis...")
try:
    res_llm = requests.post("http://localhost:8000/analyze/llm", json=payload_llm)
    print(f"Status: {res_llm.status_code}")
    print(f"Body: {res_llm.text}")
except Exception as e:
    print(f"Error: {e}")
