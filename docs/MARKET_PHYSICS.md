# Market Physics & Stochastic Foundations: Voltwise v2.6
**Author**: Principal Systems Engineer, Voltwise Intelligence Units  
**Date**: December 2025  
**Subject**: Formal Specification of Simulation Physics  

---

## 1. Electricity Price Formation in India

The Indian power grid operates under a complex multi-market structure primarily managed via the Power Exchange India (PXIL) and IEX. Voltwise focuses on the interaction between two critical segments:

### Day-Ahead Market (DAM)
The DAM is a physical electricity trading market for delivery on the following day. It uses a **Uniform Price Auction** (Single-Price Clearing) mechanism. Participants submit bids for 15-minute time blocks.
- **Structural Stickiness**: DAM prices often reflect baseline fuel costs and planned generation.
- **Exposure**: Volatility in DAM is typically driven by macro-supply constraints (e.g., coal stocks) rather than transient physical shocks.

### Real-Time Market (RTM)
RTM was introduced to handle the growing penetration of renewables and unplanned grid deviations. Delivery happens within one hour of the auction clearing.
- **Volatility Mechanics**: RTM represents the "Imbalance Layer." When generation fails or load surges unexpectedly, RTM prices can hit the regulatory ceiling (₹10/kWh to ₹12/kWh) or collapse to the floor.
- **Structural Divergence**: The delta between DAM and RTM prices represents the **Imbalance Risk**. Voltwise treats this delta as a primary vector of fiscal uncertainty.

### The Fallacy of Averages
Institutional decision-making often relies on "Average Cost of Power." This is structurally misleading. Volatility is not noise; it is the signal of tail-risk. An average cost of ₹5/kWh hides the fact that a 2-hour price spike to ₹12/kWh during peak industrial load can erase an entire month's margin.

---

## 2. Stochastic Modeling Philosophy

Voltwise operates on the principle of **Groundable Intelligence**. The system does not predict the future; it maps the field of probabilistic possibilities.

### Mean-Reverting Processes
The engine utilizes a variant of the **Ornstein-Uhlenbeck (OU) Process** for price simulation. Unlike simple Random Walks, energy prices tend to return to a long-term mean based on fuel costs.
- **Mathematical Form**: $dx_t = \theta (\mu - x_t) dt + \sigma dW_t$
- **Regime Switching**: The engine incorporates jump-diffusion logic to account for price spikes that deviate from standard mean-reversion.

### Stress Testing vs. Forecasting
- **NOT a Forecast**: Voltwise makes no claim on what the price *will* be. 
- **Scenario Propagation**: Instead, it propagates 500 parallel futures to identify the **P95 Tail Risk**. 
- **Tail Exploration**: We optimize for "Worst-Case Literacy"—ensuring that the operator understands the maximum fiscal exposure during grid stress.

---

## 3. Scenario Engine Design

The stochastic engine is designed for **Deterministic Reproducibility**.

- **Distribution Generation**: We use a combination of historical variance baselines and user-defined volatility constants (found in the Assumptions Registry).
- **Stochastic Execution**: Each execution serializes 500 distinct scenarios. This high sample count ensures a stable convergence of the cost distribution.
- **Tail Dominance**: Our visualizations (Risk Topology) prioritize tail outcomes (P95) because these represent the "Black Swan" events that threaten institutional solvency.

---

## 4. Physical Constraints of Flexible Assets

Voltwise allows for the descriptive overlay of Battery Energy Storage Systems (BESS) to visualize risk mitigation.

- **State of Charge (SoC) Intuition**: The engine models 4-hour LFP (Lithium Iron Phosphate) discharge curves. It enforces strict energy conservation: power cannot be discharged if the theoretical SoC is zero.
- **Degradation & Depth of Discharge**: The simulation acknowledges that cycle depth impacts asset longevity, though it provides no optimization logic for such.
- **Non-Dispatch Constraint**: Voltwise does **NOT** provide a dispatch signal or a BOMS (Battery Optimization Management System). It merely visualizes the counterfactual: *"If an asset were present, how would it dampen the P95 tail risk?"*

---

> [!CAUTION]
> **Deterministic Disclaimer**  
> All outputs are numerical representations of stochastic assumptions. They are not predictive guarantees of future market performance. Voltwise is an instrument for risk visibility, not a tool for financial speculation.
