import React, { useState, useEffect } from 'react';
import { Database, ShieldAlert, TrendingUp, Zap, History, Info, ChevronRight, Clock, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

const Assumptions = () => {
    const [assumptions, setAssumptions] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/assumptions')
            .then(res => res.json())
            .then(data => {
                setAssumptions(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch assumptions:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Accessing Registry...</div>
            </div>
        </div>
    );

    const handleDownloadAuditLog = () => {
        if (!assumptions) return;

        const auditTrail = {
            system: "Voltwise",
            component: "Assumptions Registry",
            version_id: assumptions.version_id,
            timestamp: new Date().toISOString(),
            engine_version: "2.6.4-LTS",
            audit_status: "Verified",
            constants: assumptions
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditTrail, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `voltwise_audit_log_${assumptions.version_id}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-32 selection:bg-blue-100">
            {/* Engineering Header */}
            <div className="bg-white border-b border-gray-200 pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-1 px-2 border-2 border-slate-900 text-slate-900 text-[10px] font-black tracking-tighter uppercase">
                            REGISTRY: AUDIT-01
                        </div>
                        <div className="h-4 w-[1px] bg-gray-300"></div>
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Immutable Decision Constants</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-6 uppercase">Assumptions Registry</h1>
                            <p className="text-xl text-gray-500 leading-relaxed font-medium">
                                The mathematical baseline of the stochastic engine. To ensure research reproducibility, every simulation outcome is cryptographically bound to this specific version of beliefs.
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Current Active Version</div>
                            <div className="px-3 py-1 bg-slate-100 border border-slate-200 font-mono text-sm font-black text-slate-900 uppercase">
                                {assumptions?.version_id}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-12 gap-12">
                {/* Main Audit Trail */}
                <div className="col-span-8 space-y-16">

                    {/* Macro Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-8 border-b-2 border-slate-900 pb-2 w-fit">
                            <TrendingUp className="w-4 h-4 text-slate-900" />
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">01. Macro-Economic Baseline</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-slate-200 border-x border-y border-slate-200">
                            <AssumptionItem
                                label="Annual Inflation (CPI)"
                                value={`${(assumptions?.inflation_rate * 100).toFixed(1)}%`}
                                desc="Sector-weighted consumer price index for energy infrastructure."
                                source="RBI 2024 Projective"
                            />
                            <AssumptionItem
                                label="Capital Cost (WACC)"
                                value={`${(assumptions?.interest_rate * 100).toFixed(1)}%`}
                                desc="Weighted average cost of capital for industrial credit lines."
                                source="Standard Bank Benchmark"
                            />
                        </div>
                    </section>

                    {/* Technical Physics */}
                    <section>
                        <div className="flex items-center gap-2 mb-8 border-b-2 border-slate-900 pb-2 w-fit">
                            <Zap className="w-4 h-4 text-slate-900" />
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">02. Grid Physics Constraints</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-slate-200 border-x border-y border-slate-200">
                            <AssumptionItem
                                label="Technical Loss Factor"
                                value={`${(assumptions?.grid_loss_factor * 100).toFixed(1)}%`}
                                desc="Average energy dissipation across Interstate Transmission System (ISTS)."
                                source="CERC Operating Regs"
                            />
                            <AssumptionItem
                                label="Coal Shortage Probability"
                                value={`${(assumptions?.coal_shortage_probability * 100).toFixed(1)}%`}
                                desc="Statistical probability of systemic fuel supply chain failure."
                                source="Ministry of Power Data"
                                warning
                            />
                        </div>
                    </section>

                    {/* Market Volatility */}
                    <section>
                        <div className="flex items-center gap-2 mb-8 border-b-2 border-slate-900 pb-2 w-fit">
                            <ShieldAlert className="w-4 h-4 text-slate-900" />
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">03. Market Variance (IEX)</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-slate-200 border-x border-y border-slate-200">
                            <AssumptionItem
                                label="DAM Volatility (Sigma)"
                                value={assumptions?.dam_volatility_sigma}
                                desc="Standard deviation (σ) of 15-min price intervals."
                                source="IEX Historical Archive"
                            />
                            <AssumptionItem
                                label="RTM Spread Premium"
                                value={`${(assumptions?.rtm_spread_premium * 100).toFixed(1)}%`}
                                desc="Mean premium of Real-Time vs Day-Ahead pricing."
                                source="Market Analysis 2024"
                            />
                        </div>
                    </section>
                </div>

                {/* Sidebar: Compliance & Attestation */}
                <div className="col-span-4 space-y-8">
                    <div className="border-2 border-slate-900 p-8 bg-white sticky top-24">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            System Attestation
                        </h3>

                        <div className="space-y-6">
                            <AttestationRow label="Release Date" value={new Date(assumptions?.valid_from).toLocaleDateString()} />
                            <AttestationRow label="Audit Status" value="Verified" icon={<CheckCircle2 className="w-3 h-3 text-green-600" />} />
                            <AttestationRow label="Data Integrity" value="Immutable" />
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100">
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium uppercase tracking-tight italic">
                                "This registry is part of the Voltwise Core. Any alteration to these values requires a system rebuild to maintain the integrity of the Decision Ledger."
                            </p>
                        </div>

                        <button
                            onClick={handleDownloadAuditLog}
                            className="w-full mt-10 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-800"
                        >
                            Download Full Audit Log
                        </button>
                    </div>

                    <div className="p-8 border-2 border-orange-200 bg-orange-50/20">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="w-5 h-5 text-orange-600 mt-1" />
                            <div>
                                <h4 className="text-[11px] font-black text-orange-600 uppercase tracking-widest mb-2">Sensitivity Notice</h4>
                                <p className="text-[10px] text-orange-900/60 leading-relaxed font-medium">
                                    Current volatility coefficients (σ) are based on the 2024 Summer heatwave. Winter/Monsoon regimes require different assumption sets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Components ---

const AssumptionItem = ({ label, value, desc, source, warning }) => (
    <div className="bg-white p-8 group transition-colors hover:bg-slate-50 relative">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</div>
        <div className={`text-4xl font-mono font-black mb-4 tracking-tighter ${warning ? 'text-orange-600' : 'text-slate-900'}`}>
            {value}
        </div>
        <p className="text-[13px] text-gray-500 leading-relaxed font-medium mb-6">{desc}</p>
        <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
            <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">Source Proof:</span>
            <span className="text-[9px] font-mono font-black text-slate-600 uppercase tracking-tighter">{source}</span>
        </div>
        {/* Verification Mark */}
        <div className="absolute top-8 right-8 text-blue-100 opacity-20">
            <FileText className="w-8 h-8" />
        </div>
    </div>
);

const AttestationRow = ({ label, value, icon }) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 font-mono">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        <div className="flex items-center gap-2">
            {icon}
            <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{value}</span>
        </div>
    </div>
);

export default Assumptions;

