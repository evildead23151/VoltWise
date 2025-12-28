# System Architecture: The Voltwise Blueprint
**Version**: 2.6.4-LTS  
**Classification**: Infrastructure Specification  

---

## 1. Stack Topology
Voltwise is built on a **Sovereign Local Stack**. Every byte of code is executed on the host node, ensuring zero telemetry and maximum fiscal privacy.

- **Frontend**: React 18 / Vite / Tailwind
    - *Responsibility*: Hardware-accelerated visualization, tactical UI rendering, and user-input state management.
- **Backend**: Python 3.10+ / FastAPI / Uvicorn
    - *Responsibility*: High-performance stochastic serialization, Monte Carlo propagation, and local LLM orchestration.
- **Data Persistence**: Local Storage + SQLite
    - *Responsibility*: Immutable audit logs and versioned assumptions.

## 2. Quantitative Engine vs. Qualitative Layer
A critical architectural boundary exists between the "Math" and the "Words."

### The Quantitative Engine (The Core)
- **Engine Logic**: Numerical Monte Carlo simulation.
- **Language**: Python (NumPy/Pandas based logic).
- **Execution**: Deterministic and reproducible via versioned seeds.
- **Governance**: This layer is **not influenced by AI**. No LLM can modify the stochastic constants or interpret the numerical results during the simulation block.

### The Qualitative Layer (The Navigator)
- **Intelligence**: `TinyLlama-1.1B` (Quantized Local Model).
- **Responsibility**: Documentation retrieval, functional navigation assistance, and technical term explanation.
- **Boundary**: The LLM serves only as a **Read-Only Navigator**. It has no write access to the simulation engine.

## 3. Data Flow Specification
1. **Request Ingress**: Frontend sends Load/Market parameters via POST to `/api/run-simulation`.
2. **Deterministic Setup**: Backend initializes the stochastic seed from the Registry.
3. **Serialization**: 500 scenarios are propagated in a single compute pass.
4. **Aggregation**: Scenario results are reduced to statistical percentiles (P05, P50, P95).
5. **Tactical Delivery**: The P95 distribution is returned to the frontend for hardware-accelerated rendering.

## 4. Local AI Sovereignty
To maintain air-gapped readiness, the LLM (`TinyLlama`) is initialized locally. 
- **Initialization**: Dedicated background thread.
- **Communication**: Internal REST endpoints only.
- **Data Retention**: Prompts are ephemeral; they are never persisted to disk or cloud.

---
**Security Note**: Voltwise does not require an active internet connection for its core simulation or AI assistance features.
