# Explicit Non-Goals: Product Constraints
**Document Type**: Legal & Technical Boundary Specification  

---

## 1. Introduction
To ensure institutional trust, it is as important to define what Voltwise **is not** as it is to define what it is. The following capabilities are explicitly **EXCLUDED** from the Voltwise scope by design.

## 2. LIST OF NON-GOALS

### A. NO Active Trading / Execution
Voltwise does not have a "Buy" or "Sell" button. It does not interface with market clearing engines (IEX/PXIL) to execute trades. 
- *Why*: Direct execution creates massive liability and requires specific financial licenses that are outside the scope of an infrastructure instrument.

### B. NO Load Optimization / Control
Voltwise cannot turn off a factory furnace or shift a lithium battery's dispatch. It is an **Observation Layer**, not a **Control Layer**. 
- *Why*: Physical control of industrial assets requires real-time safety protocols and local PLC integrations that are structurally separated from our risk engine.

### C. NO Advisory or Strategic Recommendation
Voltwise does not give "Actionable Insights." It gives "Visible Risks." We do not tell you how to save money; we tell you how much money is at risk.
- *Why*: Strategy belongs to the human operator. Prescriptive AI often fails in extreme tail-risk scenarios (Black Swans), where historical data is no longer a guide.

### D. NO Financial Guarantees
We do not guarantee the accuracy of future cost predictions. 
- *Why*: A stochastic engine maps "Possible Futures," not "Plausible Predictions." The market is influenced by political, physical, and regulatory acts of God that no model can fully encapsulate.

### E. NO Cloud-Based Multi-Tenancy
Voltwise is not a centralized "SaaS" where diverse users’ load profiles are co-mingled on a single database. 
- *Why*: Local data sovereignty is a requirement for serious industrial infrastructure. 

## 3. The "Freezing" of Capabilities
Voltwise v2.6.4-LTS is **Scope-Locked**. No future updates will include the above non-goals without a complete re-issuance of the Product Governance Thesis.

---
**Institutional Summary**: If a feature sounds like "Control," "Advice," or "Guarantee," it is not a part of Voltwise. 
