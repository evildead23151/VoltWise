# Voltwise: Institutional Electricity Risk Instrument
**Version**: 2.6.4-LTS (Infrastructure Hardening Phase)  
**Classification**: Non-Advisory Decision Support System  

---

## 1. Executive Summary
Voltwise is an engineering-grade **visibility instrument** designed to make electricity cost uncertainty legible for high-capacity energy consumers. It provides a deterministic framework for mapping stochastic price outcomes in the Indian Day-Ahead (DAM) and Real-Time (RTM) markets.

Voltwise exists to solve the **"Fallacy of Averages"** by exposing the P95 Tail Risk that standard fiscal planning often ignores.

---

## 2. Product Identity & Non-Goals

### What Voltwise IS:
- **A Visibility Tool**: It makes mathematical risk structures visible and auditable.
- **A Stochastic Engine**: It propagates 500 scenarios to explore the limits of cost distributions.
- **An Audit Layer**: It generates reproducible traces for regulatory and corporate due diligence.

### What Voltwise IS NOT (Explicit Non-Goals):
- **NOT a Trading System**: It does not execute or suggest trades.
- **NOT a Forecasting Service**: It does not predict future prices; it maps future possibilities.
- **NOT an Advisory Platform**: It does not recommend "optimal" load shifts or asset dispatch.
- **NOT an Optimization Engine**: It provides no "black-box" optimization logic.

---

## 3. Core Capabilities

### Structural Visibility
Interact with real-market anchors to understand how DAM/RTM spreads impact your specific load profile.

### Tail Risk Exposure
Expose the **P95 (95th Percentile)** cost ceiling. Voltwise prioritizes the visualization of extreme volatility over baseline expectations.

### Deterministic Auditability
Every simulation is bound to an **Engine Version** and an **Assumptions Registry ID**, ensuring that any result can be reproduced and verified by third-party auditors.

---

## 4. Technical Specification

| Component | Specification | Description |
| :--- | :--- | :--- |
| **Engine** | Stochastic Monte Carlo | High-fidelity 500-scenario serialization. |
| **Logic** | Ornstein-Uhlenbeck | Mean-reverting price physics with jump-diffusion spikes. |
| **Stack** | FAS (FastAPI, React, SQLite) | High-performance, hardware-accelerated local stack. |
| **Intelligence** | Sovereign Local AI | `TinyLlama-1.1B` (Explanation & Navigation Only). |
| **Security** | 100% Air-Gapped Ready | All computation occurs on the local node. |

---

## 5. System Constraint: Non-Advisory Thesis
Voltwise adheres to a strict **Non-Advisory Code of Ethics**. The system is architected to preserve the autonomy of the human operator. 
- The **System Navigator** is programmatically bounded to refuse requests for recommendations or strategy.
- Analysis outputs are **descriptive**, not **prescriptive**.

---

## 6. Access & Audit (The Institutional Review Vault)
For technical deep-dives and governance specifications, refer to the [INSTITUTIONAL_REVIEW](/INSTITUTIONAL_REVIEW/) directory:
- [Product Overview](/INSTITUTIONAL_REVIEW/PRODUCT_OVERVIEW.md)
- [Market Physics White-Paper](/INSTITUTIONAL_REVIEW/MARKET_PHYSICS.md)
- [System Architecture Specification](/INSTITUTIONAL_REVIEW/SYSTEM_ARCHITECTURE.md)
- [AI Usage and Boundaries](/INSTITUTIONAL_REVIEW/AI_USAGE_AND_BOUNDARIES.md)
- [Auditability & Reproducibility](/INSTITUTIONAL_REVIEW/AUDITABILITY_AND_REPRODUCIBILITY.md)
- [Explicit Non-Goals](/INSTITUTIONAL_REVIEW/EXPLICIT_NON_GOALS.md)

---
*Voltwise is a deterministic instrument for the risk-literate enterprise. Built for stability, hardened for audit.*
