import inspect
from backend.simulation.engine import SimulationEngine

engine = SimulationEngine()
try:
    source = inspect.getsource(engine.run_simulation)
    print("--- run_simulation SOURCE ---")
    print(source)
    print("-----------------------------")
except Exception as e:
    print(f"Error getting source: {e}")
