# AI Usage and Boundaries: Governance Specification
**Module**: Local System Navigator  
**Model**: TinyLlama-1.1B (Quantized)  

---

## 1. Thesis: The Wall of Restraint
Voltwise utilizes Large Language Models (LLMs) to solve the **Documentation Barrier**, not the **Decision Problem**. We adhere to an "Axiomatic Wall" that separates generative AI from institutional quantitative results.

## 2. Permitted AI Capabilities
The local AI agent is permitted to perform the following:
- **Technical Definition**: Explaining terms like "Stochastic," "P95," or "DAM/RTM."
- **Functional Guidance**: Assisting the user in navigating the application (e.g., "Take me to the Registry").
- **Methodology Explanation**: Summarizing the Market Physics white-papers for faster reading.
- **Linguistic Support**: Assisting users in Hinglish (Hindi + English) to ensure accessibility for Indian grid operators.

## 3. Explicit AI Prohibitions (Foundational Boundaries)
The following behaviors are programmatically and legally prohibited:
- **NO Advisory Role**: The AI can never say "You should buy X" or "It is a good time to consume power."
- **NO Optimization Claims**: The AI cannot suggest "optimal" scenarios or "best" outcomes.
- **NO Simulation Influence**: The AI has zero capability to modify the numerical constants (Mean-reversion, Volatility) of the stochastic engine.
- **NO Prescriptive Logic**: The AI must refuse any prompt asking for "Recommendations" by stating its thesis: *“Voltwise is a deterministic instrument, not an advisor.”*

## 4. Technical Sovereignty & Privacy
- **100% Local**: The model operates entirely on the local CPU/GPU. No telemetry or prompt data is transmitted to external servers.
- **Zero Hallucination Grounding**: The AI's knowledge base is grounded in the static [INSTITUTIONAL_REVIEW] docs. It is instructed to prioritize system physics over generative creativity.

## 5. Decision Support vs. Decision Generation
- **Decision Support (Voltwise)**: Visualizing the P95 tail risk so a human can provision capital.
- **Decision Generation (Excluded)**: An AI agent automatically shifting load patterns. 

Voltwise believes that in critical energy infrastructure, the "Human-in-the-Loop" must be supported by high-fidelity data, not replaced by predictive agents.

---
**Governance Compliance**: This configuration is frozen in the `backend/insights/llm_agent.py` system-prompt configuration.
