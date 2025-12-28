import React from 'react';
import { ArrowLeft, BookOpen, Database, Sigma } from 'lucide-react';

const Methodology = ({ onBack }) => {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <button
                onClick={onBack}
                className="mb-6 flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Simulator
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Methodology</h1>
            <p className="text-lg text-gray-600 mb-8">
                Why we model <span className="font-semibold text-black">Risk</span> instead of <span className="font-semibold text-black">Cost</span>.
            </p>

            <div className="space-y-8">

                {/* Market Physics Section */}
                <section className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-100 rounded">
                            <BookOpen className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-tighter">Market Physics: DAM vs RTM</h2>
                            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                                Voltwise models the structural divergence between the Day-Ahead Market (DAM) and the Real-Time Market (RTM).
                                While DAM reflects baseline fuel constraints via uniform price auctions, RTM serves as the grid's "Imbalance Layer."
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="p-3 bg-gray-50 border border-gray-100">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">DAM Mechanics</span>
                                    <p className="text-xs text-gray-600 mt-1">Single-price clearing for 24h delivery. Reflects macro-supply stability.</p>
                                </div>
                                <div className="p-3 bg-gray-50 border border-gray-100">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">RTM Volatility</span>
                                    <p className="text-xs text-gray-600 mt-1">15-minute intervals. High-variance shocks during renewable intermittency.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Axiom Block */}
                <section className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-100 rounded">
                            <Sigma className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-tighter">The Stochastic Engine</h2>
                            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                                We utilize a Mean-Reverting **Ornstein-Uhlenbeck (OU) Process** with jump-diffusion logic to simulate price paths.
                                This acknowledges that electricity prices return to long-run averages but are prone to extreme transient spikes.
                            </p>
                            <code className="block bg-gray-900 p-4 mt-4 text-[10px] font-mono text-emerald-400 overflow-x-auto">
                                dx_t = θ(μ - x_t)dt + σdW_t + J(μ_j, σ_j)dn_t
                            </code>
                            <p className="text-gray-500 mt-2 text-[10px] leading-tight font-mono uppercase">
                                θ = Rate of Reversion | μ = Long-run Mean | σ = Brownian Motion | J = Jump Intensity
                            </p>
                        </div>
                    </div>
                </section>

                {/* Scenario Strategy */}
                <section className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-100 rounded">
                            <Database className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-tighter">Scenario Propagation</h2>
                            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                                Each execution serializes 500 parallel futures. We do not provide "Forecasts" (which imply certainty); we map **Tail Risk Distributions (P95)**.
                            </p>
                            <ul className="mt-4 space-y-3 text-[11px] text-gray-600 font-mono uppercase">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-gray-900"></span>
                                    <span>P95 Alignment: Focus on the 95th Percentile "Worst Case" exposure.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-gray-900"></span>
                                    <span>Deterministic Seeds: Versioned simulation repeatability for audit.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Methodology;
