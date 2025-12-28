import React from 'react';
import { Cpu, Zap, BarChart3, ShieldCheck, ArrowRight, Database, TrendingUp, Search, Code, Activity, Scale, Box } from 'lucide-react';

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-32 selection:bg-blue-100">
            {/* Engineering Header */}
            <div className="bg-white border-b border-gray-200 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-1 px-2 bg-slate-900 text-white text-[10px] font-black tracking-widest uppercase">
                            METHODOLOGY-01
                        </div>
                        <div className="h-4 w-[1px] bg-gray-300"></div>
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest underline underline-offset-4 decoration-blue-500">Axiomatic Modeling Approach</span>
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-8 uppercase">Axiomatic Risk Infrastructure</h1>
                    <p className="text-xl text-gray-500 leading-relaxed font-medium">
                        Voltwise does not predict the future. We quantify the variance of possible futures. By modeling electricity as a <span className="text-slate-900 underline decoration-slate-300">stochastic financial variable</span>, we provide a mathematical floor for industrial survival.
                    </p>
                </div>
            </div>

            {/* Logical Flow - Vertical Timeline Style */}
            <div className="max-w-4xl mx-auto px-6 mt-24">
                <div className="relative border-l-2 border-slate-200 pl-12 space-y-24">

                    {/* Step 01 */}
                    <Section
                        number="01"
                        title="Physics Ingestion Layer"
                        subtitle="Physical-to-Digital Twin Construction"
                        icon={<Zap className="w-5 h-5" />}
                        desc="We reject static load profiles. Our engine ingests industrial shift schedules, harmonic distortion limits, and thermal constraints to build a 15-minute resolution 'Physics Twin' of your facility."
                        math="L(t) = \sum_{i=1}^{n} Shift(i, t) + \epsilon_{mechanical}(t)"
                    />

                    {/* Step 02 */}
                    <Section
                        number="02"
                        title="Stochastic Market Engine"
                        subtitle="Monte Carlo Scenario Synthesis"
                        icon={<TrendingUp className="w-5 h-5" />}
                        desc="Using Ornstein-Uhlenbeck processes and Levy Jumps, we simulate 500 parallel realities of local power exchanges. This explicitly models price spikes caused by renewable intermittency and coal supply failures."
                        math="dP_t = \theta(\mu - P_t)dt + \sigma dW_t + dJ_t"
                    />

                    {/* Step 03 */}
                    <Section
                        number="03"
                        title="Regulatory Translation"
                        subtitle="State-Specific Axiom Application"
                        icon={<Scale className="w-5 h-5" />}
                        desc="We translate local tariff orders (e.g., BESCOM 2025) into vectorized computation rules. This includes Time-of-Day (ToD) multipliers, Cross-Subsidy Surcharges (CSS), and Fuel Adjustment adjustments."
                        math="Total\_Bill = \int (L_t \cdot P_t \cdot R_{tod}) dt + \Psi_{fixed} + \Omega_{surcharge}"
                    />
                </div>
            </div>

            {/* The Intelligence Section */}
            <div className="max-w-5xl mx-auto px-6 mt-32">
                <div className="border-4 border-slate-900 p-12 bg-white relative overflow-hidden">
                    {/* Patent Watermark */}
                    <div className="absolute top-8 right-8 text-[40px] font-black text-slate-100 uppercase pointer-events-none select-none -rotate-12">
                        VOLTWISE PAT. PEND.
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 relative z-10">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-8 border-b-2 border-slate-900 w-fit">Engine Reliability</h2>
                            <div className="space-y-8">
                                <FeatureItem
                                    title="Explainable Inference"
                                    desc="Voltwise uses symbolic logic, not black-box statistical models. Every risk callout points to a specific regulatory axiom or market anomaly."
                                />
                                <FeatureItem
                                    title="Traceable Bias"
                                    desc="All assumptions—from grid loss factors to coal inflation—are isolated in a versioned registry for open stakeholder audit."
                                />
                                <FeatureItem
                                    title="Zero Hallucination"
                                    desc="The 'Local Analyst Agent' parses your specific simulation results using constrained JSON schemas. Only data-backed insights are presented."
                                />
                            </div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Decision Ledger Logic</div>
                                <div className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 border border-blue-100">Verified System</div>
                            </div>
                            <div className="space-y-3 font-mono text-[11px] text-slate-600 leading-tight">
                                <p className="text-slate-400">// P95 Risk Ceiling Calculation</p>
                                <p>fn calculate_tail_risk(scenarios: Vec&lt;Scenario&gt;) &#123;</p>
                                <div className="pl-4">
                                    <p>let sorted = scenarios.sort_by_net_cost();</p>
                                    <p>let p95_bound = sorted.get_percentile(0.95);</p>
                                    <p>let cVAR = average(sorted.tail(0.05));</p>
                                    <p className="text-blue-600">report_exposure(p95_bound, cVAR);</p>
                                </div>
                                <p>&#125;</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <div className="text-[9px] font-mono font-bold text-slate-400 uppercase">Latency</div>
                                        <div className="text-xs font-black text-slate-900 font-mono">1.2ms</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[9px] font-mono font-bold text-slate-400 uppercase">Purity</div>
                                        <div className="text-xs font-black text-slate-900 font-mono">100%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="max-w-4xl mx-auto px-6 mt-32 text-center">
                <a
                    href="/console"
                    className="inline-flex items-center gap-4 group"
                >
                    <div className="text-[12px] font-black uppercase text-slate-900 tracking-[0.2em] border-b-2 border-transparent group-hover:border-slate-900 transition-all py-2">
                        Execute Live Analysis
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </a>
            </div>
        </div>
    );
};

const Section = ({ number, title, subtitle, icon, desc, math }) => (
    <div className="relative">
        {/* Circle on the line */}
        <div className="absolute -left-[57px] top-0 w-10 h-10 bg-white border-2 border-slate-900 flex items-center justify-center font-black text-xs text-slate-900 z-10 transition-all hover:bg-slate-900 hover:text-white">
            {number}
        </div>

        <div className="max-w-2xl">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{subtitle}</h3>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">{title}</h2>
            <p className="text-gray-500 leading-relaxed font-medium mb-6">{desc}</p>

            <div className="bg-slate-50 border border-slate-200 p-6 font-mono text-sm text-slate-700 relative group">
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Code className="w-3 h-3 text-slate-300" />
                </div>
                <div className="text-blue-700 font-bold mb-1">// Mathematical Expression</div>
                {math}
            </div>
        </div>
    </div>
);

const FeatureItem = ({ title, desc }) => (
    <div className="space-y-2">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-2 border-blue-600 pl-3">{title}</h4>
        <p className="text-[13px] text-gray-500 leading-relaxed font-medium">{desc}</p>
    </div>
);

export default HowItWorks;

