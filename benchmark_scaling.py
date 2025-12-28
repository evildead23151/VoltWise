import time
import numpy as np
from backend.simulation.engine import SimulationEngine

def run_benchmark():
    engine = SimulationEngine()
    
    scales = [100, 500, 1000, 5000, 10000, 50000, 100000]
    print(f"{'Paths':<10} | {'Execution Time (s)':<20} | {'P95 (INR)':<15}")
    print("-" * 50)
    
    for n in scales:
        start_time = time.time()
        results = engine.run_simulation(num_scenarios=n, with_asset=True)
        end_time = time.time()
        
        duration = end_time - start_time
        p95 = results["financials"]["p95_inr"]
        
        print(f"{n:<10} | {duration:<20.4f} | {p95:<15.2f}")

if __name__ == "__main__":
    print("Voltwise Scaling Benchmark (Axiom 50 Vectorized Dispatch)")
    run_benchmark()
