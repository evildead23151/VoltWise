# Auditability & Reproducibility Specification
**Standard**: Institutional Verification v1.0  

---

## 1. The Audit Axiom
Institutional trust in a risk system requires that any result can be challenged, verified, and reproduced by a third-party auditor. Voltwise implements a **Deterministic Trace Hierarchy** to ensure this.

## 2. Versioned Components

### Assumptions Registry Versioning
Every simulation run is bound to a snapshot of the **Assumptions Registry**. 
- If a user changes the "Volatility Constant" or "Mean Reversion Rate," the system generates a new Registry Hash.
- Past reports include this hash, allowing an auditor to reconstruct the exact "World View" present during the calculation.

### Engine Versioning
The core simulation logic is bound to a specific semantic version (e.g., `2.6.4-LTS`). Any change to the mathematical physics (e.g., modifying the OU-process jump diffusion intensity) triggers a version bump.

## 3. The Deterministic Seed
While the Monte Carlo engine is stochastic (random), it is **Pseudorandom**. 
- We use versioned seeds for the stochastic RNG.
- **Reproducibility Guarantee**: Given the same Registry Hash, the same Engine Version, and the same Seed, Voltwise will produce bit-identical numerical outputs across different machines.

## 4. Audit Log Exports
Voltwise provides a **Full Audit Log Export** feature:
- **Format**: Deterministic JSON.
- **Contents**: 
    - Input Load Pattern
    - Market Constants (OU-params)
    - Engine Version Metadata
    - Timestamp & System ID
    - Final Cost Distribution trace.

## 5. Limitations of Reproducibility
- **Environmental Drift**: While mathematical logic is deterministic, floating-point precision differences between extreme CPU architectures (e.g., Intel vs ARM) may result in negligible variance (<0.0001%). 
- **Historical Data Snapshots**: If a user runs a "Live Connect" simulation, the result is only reproducible if the underlying market provider (e.g., IEX) maintains an immutable record of the data fed at that specific millisecond.

---
**Institutional Verification**: For a full verification run, auditors are encouraged to use the `Download Full Audit Log` button in the [Assumptions Registry](/assumptions).
