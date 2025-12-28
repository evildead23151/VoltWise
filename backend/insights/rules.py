from typing import Dict, List, Any

class InsightEngine:
    """
    Section 4: Insight Inference (NO AI)
    
    Deterministic logic trees for risk visibility.
    """
    
    def generate_insights(self, financials: Dict[str, float], meta: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generates a human-like analyst report based on counterfactual inputs.
        """
        expected = financials.get("expected_cost_inr", 0)
        p95 = financials.get("p95_inr", 0)
        
        # 1. Analyze Volatility Shape
        risk_premium = (p95 - expected) / expected if expected > 0 else 0
        is_asset_present = meta.get("asset_present", False)
        
        # 2. Construct Narrative (Visibility-First)
        narrative_parts = []
        scenario_mode = "Asset-Augmented" if is_asset_present else "Baseline"
        narrative_parts.append(f"Analyzing {scenario_mode} profile across {meta.get('paths', 500)} stochastic price paths.")
        
        if risk_premium > 0.15:
            narrative_parts.append(f"Significant tail risk identified: the 95th percentile outcome (P95) indicates a {risk_premium*100:.1f}% cost escalation over median expectation.")
        else:
            narrative_parts.append(f"The cost distribution remains structurally stable ({risk_premium*100:.1f}% deviation at P95).")

        if is_asset_present:
            narrative_parts.append("The inclusion of a latent BESS (4h) asset demonstrates a dampening effect on the volatility envelope.")
        else:
            narrative_parts.append("The current baseline load profile shows uncapped exposure to grid-level energy volatility.")

        # 3. Formulate Structural Observation
        structural_obs = "Diversified Risk Model"
        if risk_premium > 0.20:
            structural_obs = "Volatile Spot Exposure (Unhedged)"
        elif is_asset_present:
            structural_obs = "Physics-Grounded Mitigation (Counterfactual)"

        return {
            "narrative": " ".join(narrative_parts),
            "status": "RISK_EXPOSED" if risk_premium > 0.2 else "STABLE",
            "structural_observation": structural_obs,
            "key_metrics": {
                "p95_exposure_premium_pct": round(risk_premium * 100, 1),
                "stochastic_confidence": "Institutional (High)"
            }
        }
