import os
import threading
from typing import Dict, Any

class LocalLLMAgent:
    """
    The Voltwise local generative agent.
    Refactored for non-blocking background initialization.
    """
    
    def __init__(self, model_id: str = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"):
        self.model_id = model_id
        self.tokenizer = None
        self.model = None
        self.status = "idle" # idle | loading | ready | failed
        self.is_loaded = False

    def _load_process(self):
        try:
            from transformers import AutoTokenizer, AutoModelForCausalLM
            import torch
            
            print(f"--- [Background] Initializing AI: {self.model_id} ---")
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_id)
            device = "cuda" if torch.cuda.is_available() else "cpu"
            self.model = AutoModelForCausalLM.from_pretrained(
                self.model_id, 
                torch_dtype=torch.float32, 
                device_map=device
            )
            self.is_loaded = True
            self.status = "ready"
            print("--- AI Brain Operational ---")
        except Exception as e:
            print(f"--- AI Load Failed: {str(e)} ---")
            self.status = "failed"

    def ensure_initialization(self):
        if self.status == "idle":
            self.status = "loading"
            threading.Thread(target=self._load_process, daemon=True).start()

    def respond_to_query(self, query: str) -> str:
        self.ensure_initialization()
        
        if self.status == "loading":
            return (
                "SYSTEM WARM-UP: The local AI brain is currently initializing (Axiom 13). "
                "While I spin up the stochastic processors, note that DAM refers to the Day-Ahead Market "
                "where prices are locked in 24h prior, whereas RTM (Real-Time Market) manages the 15-min imbalance variance."
            )
            
        if not self.is_loaded:
            return "AI OFFLINE: Operating in deterministic documentation mode. DAM/RTM spreads represent the fundamental volatility of the Indian grid. See /methodology for data structures."

        prompt = [
            {"role": "system", "content": (
                "You are the Voltwise System Navigator. You assist users with routing and technical documentation.\n"
                "THESIS: Voltwise is an INSTRUMENT, not an ADVISOR. Never give advice or recommendations.\n"
                "TONE: Engineering-grade, authoritative, supports Hinglish.\n"
                "REFUSAL: If asked for advice, state: 'Voltwise is a deterministic instrument, not an advisor.'"
            )},
            {"role": "user", "content": query}
        ]

        try:
            import torch
            inputs = self.tokenizer.apply_chat_template(prompt, add_generation_prompt=True, return_tensors="pt").to(self.model.device)
            # Use very few tokens for fast feedback on CPU
            outputs = self.model.generate(inputs, max_new_tokens=80, temperature=0.4, do_sample=True)
            response = self.tokenizer.decode(outputs[0][inputs.shape[-1]:], skip_special_tokens=True)
            return response.strip()
        except Exception as e:
            return f"Logic Error: {str(e)}. DAM/RTM spreads are best viewed in the Risk Console."

    def generate_report(self, financials: Dict[str, Any], meta: Dict[str, Any]) -> str:
        """
        Generates a sophisticated analysis report grounded in numerical context.
        """
        self.ensure_initialization()
        
        if not self.is_loaded:
            return self._fallback_report(financials, meta)

        context = (
            f"SYSTEM CONTEXT: Voltwise Decision Support v2.0\n"
            f"JURISDICTION: {meta.get('state')}\n"
            f"LOAD: {meta.get('load_mw')} MW {meta.get('category')} profile.\n"
            f"RESULTS: Expected Cost ₹{financials['expected_cost_inr']/100000:.2f}L, "
            f"Tail Risk P95 ₹{financials['p95_inr']/100000:.2f}L.\n"
        )
        
        prompt = [
            {"role": "system", "content": (
                "You are the Voltwise Senior Analyst. Provide brief, data-dense, descriptive analysis of risk distributions.\n"
                "THESIS: Voltwise is an instrument, not an advisor. Never give recommendations, optimization advice, or call-to-action.\n"
                "Focus on explaining the variance between the expected cost and P95 tail risk."
            )},
            {"role": "user", "content": f"Describe this risk profile:\n{context}\n\nProvide a 2-sentence descriptive summary of the distribution spread."}
        ]
        
        try:
            inputs = self.tokenizer.apply_chat_template(prompt, add_generation_prompt=True, return_tensors="pt").to(self.model.device)
            outputs = self.model.generate(inputs, max_new_tokens=100, temperature=0.7, do_sample=True)
            response = self.tokenizer.decode(outputs[0][inputs.shape[-1]:], skip_special_tokens=True)
            return response.strip()
        except:
            return self._fallback_report(financials, meta)

    def _fallback_report(self, financials: Dict[str, Any], meta: Dict[str, Any]) -> str:
        expected = financials.get('expected_cost_inr', 1)
        premium = (financials.get('p95_inr', expected) - expected) / expected
        return (
            f"Structural Risk Distribution: The {meta.get('state')} regime exhibits a {premium*100:.1f}% variance "
            f"between expected cost and P95 tail risk. This distribution is characteristic of high-volatility RTM intermittency."
        )

# Singleton Agent
analyst_agent = LocalLLMAgent()
