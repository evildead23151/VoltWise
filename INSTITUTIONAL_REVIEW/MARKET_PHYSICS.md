# Market Physics: The Stochastic Basis of Electricity Risk
**Date**: December 2025  
**Subject**: Formal Specification of Market Divergence  

---

## 1. The Multi-Market Topology
The Indian electricity grid operates via several distinct clearing layers. Voltwise specifically maps the interplay between the Day-Ahead Market (DAM) and the Real-Time Market (RTM).

### Day-Ahead Market (DAM) Mechanics
- **Clearing**: 24-hour advance uniform price auction.
- **Physicality**: Reflects "Planned" supply. Prices are typically capped by baseline fuel costs (Coal/Gas) and long-term contracts.
- **Risk Profile**: Low volatility, high inertia.

### Real-Time Market (RTM) Mechanics
- **Clearing**: 15-minute intervals.
- **Physicality**: This is the **Imbalance Layer**. It handles unplanned surges in load or sudden drops in renewable generation.
- **Risk Profile**: Extreme volatility. RTM prices can swing from ₹0/kWh to the regulatory ceiling (₹10/kWh+) within minutes.

## 2. Structural Volatility
Volatility is not an error in the market; it is the physical cost of intermittency. As more solar and wind assets join the grid, the "Imbalance Layer" (RTM) becomes the primary source of cost uncertainty for industrial consumers.

- **Divergence Points**: The spread between DAM and RTM represents the "Imbalance Premium."
- **Institutional Impact**: Unhedged exposure to RTM spikes is the single greatest threat to industrial energy solvency.

## 3. Stochastic Modeling Philosophy
Voltwise uses **Stochastic Differential Equations (SDEs)** to propagate potential futures.

### Mean-Reversion (Ornstein-Uhlenbeck)
Electricity prices, unlike stocks, are grounded in the physics of generation. They exhibit strong mean-reversion. Voltwise implements a mean-reverting process to reflect that spikes are transient but recurring.
- **The Engine**: We propagate 500 scenarios to converge on a stable probability distribution.
- **The P95 Metric**: We prioritize the 95th Percentile (P95) outcome. In risk management, the 50th percentile is a budget line; the 95th percentile is the insolvency boundary.

## 4. Modeling vs. Prediction
- **Modeling (Voltwise)**: "If volatility persists at level X, what is the P95 cost impact?"
- **Prediction (Excluded)**: "Price will be ₹4.50 at 2:00 PM tomorrow."
Voltwise deliberately ignores prediction. Prediction assumes a degree of grid control that no individual consumer possesses. Modeling assumes a degree of risk literacy that every consumer *should* possess.

---
**Institutional Note**: The mean-reversion constants utilized in the Voltwise engine are transparently documented in the [Assumptions Registry](/assumptions).
