import React, { useState } from 'react';
import { Download, Share2, Server, Globe, Cpu, Database, Shield, Activity, Lock, Layers, Zap, Network } from 'lucide-react';

const Architecture = () => {
    const [view, setView] = useState('topology'); // 'topology' | 'data' | 'infrastructure'
    const [actionStatus, setActionStatus] = useState(null);

    const handleDownloadPDF = () => {
        setActionStatus('Downloading...');
        const techSummary = `
VOLTWISE SYSTEM SPECIFICATION v2.6.4-LTS
========================================
Runtime: Python 3.10+ / FastAPI
AI Sovereign: TinyLlama-1.1B (Local)
Engine: Stochastic OU-Process
Classification: Institutional Instrument

DATA FLOW:
1. Market Ingestion -> 2. Stochastic Serialization -> 3. 500-Scenario Propagation -> 4. P95 Topology
        `.trim();

        const blob = new Blob([techSummary], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'VOLTWISE_SPEC_v2.6.md';
        a.click();

        setTimeout(() => setActionStatus(null), 2000);
    };

    const handleShareSchema = () => {
        setActionStatus('Schema Copied!');
        const schema = {
            "endpoint": "/api/run-simulation",
            "method": "POST",
            "schema": {
                "load_mw": "number",
                "jurisdiction": "string",
                "scenarios": 500,
                "engine": "stochastic_ou_v2.6"
            }
        };
        navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
        setTimeout(() => setActionStatus(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-32 font-sans selection:bg-blue-100">
            {/* Status Notification */}
            {actionStatus && (
                <div className="fixed top-6 right-6 z-[100] bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 shadow-2xl animate-in slide-in-from-right duration-300">
                    {actionStatus}
                </div>
            )}

            {/* Engineering Header */}
            <div className="bg-white border-b border-gray-200 pt-20 pb-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-1 px-2 border-2 border-slate-900 text-slate-900 text-xs font-black tracking-tighter uppercase">
                            DOC: ARCH-2025
                        </div>
                        <div className="h-4 w-[1px] bg-gray-300"></div>
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">System Specification v2.6.4</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-4 uppercase">System Topology</h1>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                Technical schematics of the Voltwise Stochastic Engine. Designed for sub-millisecond data serialization and multi-tenant isolation.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleDownloadPDF}
                                className="px-4 py-2 border-2 border-slate-200 text-xs font-bold text-slate-500 uppercase hover:bg-slate-50 transition-colors tracking-widest"
                            >
                                <Download className="w-3 h-3 inline mr-2" /> Technical PDF
                            </button>
                            <button
                                onClick={handleShareSchema}
                                className="px-4 py-2 bg-slate-900 border-2 border-slate-900 text-xs font-bold text-white uppercase hover:bg-slate-800 transition-colors tracking-widest"
                            >
                                <Share2 className="w-3 h-3 inline mr-2" /> Share Schema
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs - Sharp Engineering Style */}
            <div className="max-w-6xl mx-auto px-6 mt-12">
                <div className="flex gap-4 border-b border-gray-200">
                    <button
                        onClick={() => setView('topology')}
                        className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all relative ${view === 'topology' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'}`}
                    >
                        01. Logic Topology
                        {view === 'topology' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>}
                    </button>
                    <button
                        onClick={() => setView('data')}
                        className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all relative ${view === 'data' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'}`}
                    >
                        02. Data Pipeline
                        {view === 'data' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>}
                    </button>
                    <button
                        onClick={() => setView('infrastructure')}
                        className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all relative ${view === 'infrastructure' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'}`}
                    >
                        03. Infrastructure
                        {view === 'infrastructure' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-12 gap-12">
                {/* Left Side: Schematic Drawing */}
                <div className="col-span-8">
                    <div className="bg-white border-2 border-slate-200 p-12 min-h-[600px] relative overflow-hidden flex flex-col items-center justify-center">
                        {/* Patent Paper Background Effect */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                        {view === 'topology' && <TopologySchematic />}
                        {view === 'data' && <DataFlowSchematic />}
                        {view === 'infrastructure' && <InfrastructureSchematic />}

                        {/* Schematic Metadata Labels (Fixed corner positions) */}
                        <div className="absolute top-4 left-4 text-[9px] font-mono font-bold text-slate-400 uppercase">
                            Ref: FIG. 1A // Physical Layer Separation
                        </div>
                        <div className="absolute bottom-4 right-4 text-[9px] font-mono font-bold text-slate-400 uppercase">
                            Voltwise © 2025 // All Rights Reserved
                        </div>
                    </div>

                    {/* Technical Footnotes */}
                    <div className="mt-8 grid grid-cols-3 gap-6">
                        <Footnote title="01. AI Sovereignty" text="Intelligence is performed locally via quantized LLM. No prompt telemetry leaves the node." />
                        <Footnote title="02. Core Determinism" text="The simulation engine executes within a strictly deterministic Python runtime with versioned seeds." />
                        <Footnote title="03. Data Immutability" text="Market inputs are snapshotted and stored as versioned JSON blobs for institutional audit." />
                    </div>
                </div>

                {/* Right Side: Technical Specs */}
                <div className="col-span-4 space-y-8">
                    <section>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 border-l-4 border-slate-900 pl-3">
                            Physical Specifications
                        </h3>
                        <div className="space-y-3">
                            <SpecRow label="Runtime" value="Python 3.10+ (FastAPI)" />
                            <SpecRow label="Web Server" value="Uvicorn (ASGI)" />
                            <SpecRow label="AI Agent" value="TinyLlama-1.1B (Local)" />
                            <SpecRow label="Analytics" value="NumPy / Stochastic" />
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 border-l-4 border-slate-900 pl-3 text-blue-600">
                            Service Health
                        </h3>
                        <div className="p-4 bg-slate-50 border border-slate-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Load Balancer Status</span>
                                <div className="flex items-center gap-1.5 font-mono text-[10px] text-green-600 font-bold uppercase">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Nominal
                                </div>
                            </div>
                            <div className="h-1 bg-slate-200 w-full mb-1">
                                <div className="h-full bg-blue-600 w-[24%]"></div>
                            </div>
                            <div className="flex justify-between text-[9px] font-mono font-bold text-slate-400">
                                <span>2.4 TB/S</span>
                                <span>10.0 TB/S MAX</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 border-l-4 border-slate-900 pl-3">
                            Security Protocol
                        </h3>
                        <ul className="space-y-4">
                            <SecurityFeature icon={<Lock className="w-4 h-4" />} title="mTLS Enforcement" text="All internal inter-service communication requires certificate validation." />
                            <SecurityFeature icon={<Shield className="w-4 h-4" />} title="VPC Isolation" text="The stochastic core is inaccessible from the public internet." />
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

// --- Schematic Components (SVG Patent Style) ---

const TopologySchematic = () => (
    <div className="w-full flex flex-col items-center gap-12">
        <svg width="400" height="300" viewBox="0 0 400 300" className="opacity-80">
            {/* Legend Style Box */}
            <rect x="50" y="50" width="100" height="60" fill="none" stroke="#64748b" strokeWidth="2" />
            <text x="100" y="85" textAnchor="middle" fontSize="10" className="font-mono font-bold uppercase fill-slate-900 tracking-tighter">Client Layer</text>

            <line x1="150" y1="80" x2="250" y2="80" stroke="#64748b" strokeWidth="1" strokeDasharray="4 2" />

            <rect x="250" y="30" width="120" height="100" fill="none" stroke="#2563eb" strokeWidth="2" />
            <text x="310" y="85" textAnchor="middle" fontSize="11" className="font-mono font-black uppercase fill-blue-600 tracking-tighter">Stochastic Core</text>

            <line x1="310" y1="130" x2="310" y2="200" stroke="#64748b" strokeWidth="1" />

            <rect x="250" y="200" width="120" height="60" fill="none" stroke="#64748b" strokeWidth="2" />
            <text x="310" y="235" textAnchor="middle" fontSize="10" className="font-mono font-bold uppercase fill-slate-900 tracking-tighter">Market Registry</text>

            <circle cx="100" cy="230" r="30" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            <text x="100" y="235" textAnchor="middle" fontSize="9" className="font-mono fill-slate-400 uppercase tracking-widest">Async DB</text>
        </svg>
        <div className="text-center font-mono space-y-1">
            <div className="text-sm font-black uppercase tracking-tighter text-slate-900">Physical Topology Graph [FIG 1.2]</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest tracking-widest px-2 py-0.5 border border-slate-200 w-fit mx-auto">Verified Core Architecture</div>
        </div>
    </div>
);

const DataFlowSchematic = () => (
    <div className="w-full flex flex-col items-center gap-16">
        <div className="flex items-center gap-12">
            <SchematicNode icon={<Database />} label="Market Feed" />
            <SchematicLine />
            <SchematicNode icon={<Layers />} label="Serialization" active />
            <SchematicLine />
            <SchematicNode icon={<Cpu />} label="Monte Carlo" active />
            <SchematicLine />
            <SchematicNode icon={<Network />} label="Interpretation" />
        </div>
        <div className="w-full max-w-md p-6 bg-slate-50 border border-slate-200">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-4 tracking-widest">Live Pipeline Log</div>
            <div className="space-y-2 font-mono text-[10px] text-slate-600">
                <div className="flex gap-4">
                    <span className="text-blue-500">[08:24:01]</span>
                    <span>INGESTION_START: STATE=TX MARKET=ERCOT</span>
                </div>
                <div className="flex gap-4">
                    <span className="text-blue-500">[08:24:02]</span>
                    <span>SERIALIZED: BYTES=24,802 CHECKSUM=HEX_xFF9A</span>
                </div>
                <div className="flex gap-4 border-t border-slate-200 pt-2 text-slate-900 font-black uppercase tracking-tighter">
                    <span className="text-blue-600">[SYST_READY]</span>
                    <span>PIPELINE_STATUS: NOMINAL / 0 ERRORS</span>
                </div>
            </div>
        </div>
    </div>
);

const InfrastructureSchematic = () => (
    <div className="w-full flex flex-col items-center justify-center gap-12">
        <div className="grid grid-cols-3 gap-8 w-full max-w-2xl px-12">
            <InfraCard icon={<Server />} label="Simulation Core" count="Local Process" status="Active" />
            <InfraCard icon={<Cpu />} label="AI Sovereign" count="TinyLlama 1.1B" status="Ready" />
            <InfraCard icon={<Lock />} label="Air-Gap Bridge" count="Zero-External" status="Secured" />
        </div>
        <div className="w-full h-24 border-2 border-slate-200 flex items-center justify-center relative bg-slate-50">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase absolute top-4 left-4">VPC Local Network Bus</div>
            <div className="flex gap-24 relative">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
        </div>
    </div>
);

// --- Sub-Helper Components ---

const Footnote = ({ title, text }) => (
    <div className="space-y-2">
        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{title}</h4>
        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{text}</p>
    </div>
);

const SpecRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 font-mono">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{value}</span>
    </div>
);

const SecurityFeature = ({ icon, title, text }) => (
    <div className="flex gap-4">
        <div className="mt-1 text-slate-900">{icon}</div>
        <div>
            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1">{title}</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{text}</p>
        </div>
    </div>
);

const SchematicNode = ({ icon, label, active }) => (
    <div className="flex flex-col items-center gap-3">
        <div className={`p-4 border-2 transition-all ${active ? 'border-blue-600 text-blue-600 bg-white shadow-lg' : 'border-slate-200 text-slate-400'}`}>
            {React.cloneElement(icon, { size: 20 })}
        </div>
        <span className="text-[9px] font-mono font-black text-slate-900 uppercase tracking-tighter">{label}</span>
    </div>
);

const SchematicLine = () => <div className="w-12 h-0.5 bg-slate-200 border-t border-b border-slate-100"></div>;

const InfraCard = ({ icon, label, count, status }) => (
    <div className="border-2 border-slate-200 p-6 flex flex-col items-center text-center group hover:border-blue-600 transition-all cursor-default">
        <div className="text-slate-900 group-hover:text-blue-600 transition-all mb-4">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div className="text-[10px] font-black text-slate-900 uppercase tracking-tighter mb-1">{label}</div>
        <div className="text-[9px] font-mono font-bold text-slate-400 uppercase mb-4 tracking-widest">{count}</div>
        <div className="text-[9px] font-mono font-extrabold text-blue-600 tracking-widest border border-blue-100 px-2 py-0.5 uppercase bg-blue-50/50">
            {status}
        </div>
    </div>
);

export default Architecture;

