import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Layers, Activity, Lock, Database, Server } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-[#F5F5F7] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* HERO SECTION */}
            <header className="max-w-7xl mx-auto px-6 pt-32 pb-24 border-b border-gray-200">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full mb-8 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">System Online v2.6.4-LTS</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1] uppercase italic">
                        Stochastic Risk <br /> Visibility.
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-10 font-medium">
                        Voltwise is a deterministic instrument for non-deterministic electricity markets.
                        We make volatility legible, exposing tail-risk without prescribing action.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link to="/console" className="inline-flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-sm">
                            Initialize Console
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link to="/architecture" className="inline-flex items-center gap-2 px-6 py-4 bg-white text-slate-900 border-2 border-slate-900 rounded text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors shadow-sm">
                            System Architecture
                        </Link>
                    </div>
                </div>
            </header>

            {/* SYSTEM CAPABILITIES GRID */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="mb-12">
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Functional Thesis</h2>
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic">Visibility precedes Intelligence.</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white p-8 border-2 border-gray-200 shadow-sm relative overflow-hidden group">
                        <div className="w-10 h-10 bg-slate-50 border border-gray-100 flex items-center justify-center mb-6">
                            <Activity className="w-5 h-5 text-slate-700" />
                        </div>
                        <h3 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-tight">Stochastic Modeling</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Propagates 500+ mean-reverting OU-process scenarios to map the cost distribution ceiling.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 border-2 border-gray-200 shadow-sm">
                        <div className="w-10 h-10 bg-slate-50 border border-gray-100 flex items-center justify-center mb-6">
                            <Layers className="w-5 h-5 text-slate-700" />
                        </div>
                        <h3 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-tight">Instrument Neutrality</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            A non-advisory platform. We provide the analytics; the human operator provides the strategy.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 border-2 border-gray-200 shadow-sm">
                        <div className="w-10 h-10 bg-slate-50 border border-gray-100 flex items-center justify-center mb-6">
                            <Lock className="w-5 h-5 text-slate-700" />
                        </div>
                        <h3 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-tight">Auditable Reproducibility</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Deterministic seeds and engine versioning ensure any simulation state remains verifiable by third-party auditors.
                        </p>
                    </div>
                </div>
            </section>

            {/* TECHNICAL SPECIFICATION */}
            <section className="bg-white border-t-2 border-slate-900">
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase italic">The Non-Advisory Moat.</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                                Voltwise rejects the black-box advisor model. By focusing purely on visibility and auditability,
                                we provide a sovereign data layer that high-fidelity enterprises can trust in regulatory environments.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100 font-mono">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Simulation Model</span>
                                    <span className="text-[11px] font-black text-slate-900 uppercase">Ornstein-Uhlenbeck (Stochastic)</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100 font-mono">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sovereignty</span>
                                    <span className="text-[11px] font-black text-slate-900 uppercase">Local Execution / Zero-Telemetry</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100 font-mono">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compute Trace</span>
                                    <span className="text-[11px] font-black text-slate-900 uppercase">Deterministic JSON Audit Traces</span>
                                </div>
                            </div>
                        </div>

                        {/* Static Architecture Logic Diagram */}
                        <div className="bg-slate-50 p-10 border-2 border-slate-200 grayscale">
                            <div className="text-[10px] uppercase font-black text-slate-400 mb-12 tracking-widest text-center">Engine Flow [FIG. 1]</div>

                            <div className="flex flex-col gap-6 items-center">
                                {/* Input Node */}
                                <div className="w-56 bg-white border-2 border-slate-900 p-4 text-center">
                                    <div className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">IEX / Market Anchors</div>
                                </div>

                                {/* Arrow Down */}
                                <div className="h-8 w-px bg-slate-900"></div>

                                {/* Process Node */}
                                <div className="w-56 bg-white border-2 border-slate-900 p-4 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-slate-900 animate-pulse"></div>
                                    <div className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">Stochastic Serialization</div>
                                    <div className="text-[8px] text-slate-400 mt-1 font-mono uppercase font-bold">500 Scenario Fan-out</div>
                                </div>

                                {/* Arrow Down */}
                                <div className="h-8 w-px bg-slate-900"></div>

                                {/* Output Node */}
                                <div className="w-56 bg-white border-2 border-slate-900 p-4 text-center">
                                    <div className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">P95 Risk Distribution</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#F5F5F7] border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="text-sm font-bold text-slate-900">Voltwise Systems.</div>
                    <div className="text-xs text-slate-500">Infrastructure Grade v2.5.0</div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
