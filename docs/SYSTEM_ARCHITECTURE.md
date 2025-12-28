# System Architecture: Voltwise v2.6
**Author**: Principal Systems Engineer  
**Status**: Institutional Specification  

---

## 1. High-Level Design Philosophy
Voltwise is architected as an **Asynchronous Deterministic Instrument**. The system separates the high-variance stochastic computation from the high-fidelity tactical visualization layer.

### Core Stack
- **Frontend**: React 18, Vite, TailwindCSS (Hardware-accelerated rendering).
- **Backend**: FastAPI, Uvicorn (Stateful simulation logic).
- **Intelligence**: Local LLM (`TinyLlama-1.1B`) for sovereign documentation assistance.

---

## 2. Frontend Architecture
The frontend is designed to handle high-density risk data without browser-thread blocking.

- **Deterministic Rendering**: Component states are driven by versioned simulation outputs.
- **Hardware Acceleration**: The "Risk Topology" (CommandCenter) utilizes optimized CSS and SVG rendering to visualize 500-scenario price paths with minimal latency.
- **Separation of Concerns**: The UI layer contains zero simulation logic. It is a "Tactical Mirror" of the backend's quantitative state.

---

## 3. Backend Architecture
The backend is a high-performance Python-based service optimized for stochastic serialization.

- **Stateless Simulation**: The `/api/run-simulation` endpoint is stateless. It accepts a parameter set (Load, Jurisdiction, Assets) and returns a complete distribution.
- **API Contracts**: All endpoints communicate via strict JSON schemas (Pydantic), ensuring compatibility with external institutional audit tools.

---

## 4. Data Flow: The Simulation Lifecycle
1. **Parameter Entry**: User specifies load profile and market anchors.
2. **Stochastic Serialization**: The engine generates 500 parallel Monte Carlo paths based on the mean-reversion constants in the Assumptions Registry.
3. **Execution**: Scenarios are propagated across the temporal horizon.
4. **Aggregation**: Results are reduced to statistical metrics (P95, P50, P05, Expected Cost).
5. **Output**: The frontend receives a deterministic payload containing both the metrics and the scenario trace metadata.

---

## 5. Local AI Sovereignty
Voltwise integrates a local AI agent (`analyst_agent`) specifically to support "Visibility and Navigation."

- **Role**: The AI serves as the **System Navigator**. It explains technical terms (What is P95?), guides usage (How to use the console?), and retrieves methodology documentation.
- **Wall of Restraint**: 
    - **NO influence on simulation**: The AI cannot modify the stochastic engine constants.
    - **NO decision generation**: The AI is strictly forbidden from recommending "Optimal" actions or "Best" times.
    - **NO predictive advice**: All AI responses must be groundable in the system's static documentation.

---

## 6. Auditability & Reproducibility
To meet institutional standards, Voltwise implements three layers of auditability:

| Layer | Implementation | Purpose |
| :--- | :--- | :--- |
| **Assumption Versioning** | Registry ID & Engine Version (`2.6.4-LTS`) | Ensures the "Ground Truth" of a simulation is known. |
| **Audit Log Export** | Deterministic JSON Trace | Allows a third-party auditor to re-run the same parameters. |
| **Reproducible Seeds** | Stochastic state-locking | Ensures that running the same audit trace yields the identical numerical output. |

---

> [!NOTE]
> **Sovereignty Statement**  
> Voltwise operates 100% locally. No simulation data, load profiles, or AI queries are transmitted to external servers. This preserves the fiscal sovereignty of the institutional user.
