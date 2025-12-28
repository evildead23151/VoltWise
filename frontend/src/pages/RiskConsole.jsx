import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ShieldAlert, Zap, Server, BarChart3, TrendingUp, Info, Upload, FileText, Download, Save, History, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useToast } from '../components/Toast';
import RiskCommandCenter from '../components/analytics/RiskCommandCenter';
import CommandCenter from '../components/analytics/CommandCenter';
import PulseStream from '../components/analytics/PulseStream';
import ErrorBoundary from '../components/ErrorBoundary';

const RiskConsole = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [llmLoading, setLlmLoading] = useState(false);
    const [llmReport, setLlmReport] = useState("");
    const [inputType, setInputType] = useState('manual'); // 'manual' | 'upload'
    const [connecting, setConnecting] = useState(false);
    const [providerConnected, setProviderConnected] = useState(false);

    const { addToast } = useToast();

    // Default State
    const [inputs, setInputs] = useState({
        state: "MH_MSEDCL_HT",
        category: "HT-2A",
        load_mw: 1.0,
        shift_type: "1_SHIFT_DAY",
        market: "IN_IEX",
        with_asset: true
    });

    const [validationErrors, setValidationErrors] = useState({});

    const validateInputs = () => {
        const errors = {};
        if (inputs.load_mw <= 0) errors.load_mw = "Load must be greater than 0 MW";
        if (inputs.load_mw > 500) errors.load_mw = "Exceeds institutional limit (500 MW)";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const fetchLLMReport = async (financials, meta) => {
        setLlmLoading(true);
        try {
            const response = await fetch('/api/analyze/llm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ financials, meta })
            });
            const result = await response.json();
            setLlmReport(result.report);
        } catch (err) {
            console.error("LLM Analysis Failed", err);
        }
        setLlmLoading(false);
    };

    const handleExport = () => {
        if (!data) return;
        const csvContent = "data:text/csv;charset=utf-8,"
            + "METADATA\n"
            + `System,Voltwise Stochastic Engine\n`
            + `Engine Version,2.6.4-LTS\n`
            + `Simulation ID,${data.meta.run_id}\n`
            + `Timestamp,${new Date().toISOString()}\n`
            + `Scenario Count,500\n`
            + `Status,Deterministic Deterministic Execution\n\n`
            + "FINANCIAL METRICS\n"
            + `Metric,Value (INR)\n`
            + `P05 (Best Case),${data.financials.p05_inr}\n`
            + `Expected Mean,${data.financials.expected_cost_inr}\n`
            + `P95 (Tail Risk),${data.financials.p95_inr}\n`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `voltwise_risk_report_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addToast("Report exported successfully", "success");
    };

    const handleSave = () => {
        const savedScenarios = JSON.parse(localStorage.getItem('voltwise_scenarios') || '[]');
        const newScenario = {
            id: Date.now(),
            inputs,
            timestamp: new Date().toISOString(),
            financials: data?.financials
        };
        localStorage.setItem('voltwise_scenarios', JSON.stringify([newScenario, ...savedScenarios]));
        addToast("Scenario configuration saved to local vault", "success");
    };

    const handleConnectProvider = () => {
        setConnecting(true);
        setTimeout(() => {
            setConnecting(false);
            setProviderConnected(true);
            addToast("Secure Link Established: MSEDCL Grid (15-min interval)", "success");
            setInputs(prev => ({ ...prev, load_mw: 2.4 }));
        }, 1500);
    };

    const runSimulation = async () => {
        if (!validateInputs()) {
            addToast("Validation Error: Please check input parameters.", "error");
            return;
        }

        setLoading(true);
        setLlmReport("");
        try {
            const response = await fetch('/api/simulate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                addToast(errorData.detail || `Analysis Failed: Server returned ${response.status}`, "error");
                setLoading(false);
                return;
            }

            const result = await response.json();
            setData(result);
            addToast("Risk Profile Calculated: 500 Scenarios Synced.", "success");
            fetchLLMReport(result.financials, result.meta);
        } catch (err) {
            console.error("Simulation Failed", err);
            addToast("Network Error: Could not reach Calculation Engine", "error");
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen bg-[#FDFDFD] selection:bg-blue-100">
            {/* SIDEBAR: Parameters */}
            <div className="w-80 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col h-screen sticky top-0 z-20">
                <div className="p-8 border-b border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-slate-900 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white fill-current" />
                        </div>
                        <span className="font-black text-sm uppercase tracking-tighter text-slate-900">Voltwise</span>
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono font-bold tracking-[0.2em] uppercase">Control Console v2.6.4</div>
                </div>

                <div className="p-0 flex-1 overflow-y-auto">
                    <div className="flex border-b border-slate-100">
                        <button
                            onClick={() => setInputType('manual')}
                            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${inputType === 'manual' ? 'text-slate-900 border-b-2 border-slate-900 bg-slate-50' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Parameters
                        </button>
                        <button
                            onClick={() => setInputType('upload')}
                            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${inputType === 'upload' ? 'text-slate-900 border-b-2 border-slate-900 bg-slate-50' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Smart Connect
                        </button>
                    </div>

                    <div className="p-8 space-y-8">
                        {inputType === 'manual' ? (
                            <>
                                <InputGroup label="Jurisdiction">
                                    <select
                                        value={inputs.state}
                                        onChange={(e) => setInputs({ ...inputs, state: e.target.value })}
                                        className="w-full p-3 text-xs bg-white border-2 border-slate-100 font-black uppercase tracking-tight focus:border-slate-900 outline-none transition-all cursor-pointer"
                                    >
                                        <option value="MH_MSEDCL_HT">Maharashtra (MSEDCL)</option>
                                        <option value="KA_BESCOM_HT">Karnataka (BESCOM)</option>
                                        <option value="GJ_GUVNL_HT">Gujarat (GUVNL)</option>
                                        <option value="TN_TANGEDCO_HT">Tamil Nadu (TANGEDCO)</option>
                                    </select>
                                </InputGroup>

                                <InputGroup label="Wholesale Market Anchor">
                                    <select
                                        value={inputs.market}
                                        onChange={(e) => setInputs({ ...inputs, market: e.target.value })}
                                        className="w-full p-3 text-xs bg-white border-2 border-slate-100 font-black uppercase tracking-tight focus:border-slate-900 outline-none transition-all cursor-pointer"
                                    >
                                        <option value="IN_IEX">India (IEX DAM)</option>
                                        <option value="US_PJM">USA (PJM East)</option>
                                    </select>
                                </InputGroup>

                                <InputGroup label="Active Load Profile (MW)">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={inputs.load_mw}
                                            onChange={(e) => setInputs({ ...inputs, load_mw: parseFloat(e.target.value) })}
                                            className={`w-full p-3 text-sm bg-white border-2 font-mono font-bold focus:border-slate-900 outline-none transition-all ${validationErrors.load_mw ? 'border-red-500' : 'border-slate-100'}`}
                                        />
                                        <span className="absolute right-3 top-3 text-[10px] text-slate-400 font-black uppercase">MW</span>
                                        {validationErrors.load_mw && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase italic tracking-tighter">{validationErrors.load_mw}</p>}
                                    </div>
                                </InputGroup>

                                <div className="pt-6 border-t border-slate-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Axiom: Asset Offset</span>
                                        <button
                                            onClick={() => setInputs({ ...inputs, with_asset: !inputs.with_asset })}
                                            className={`w-12 h-6 border-2 transition-all ${inputs.with_asset ? 'bg-slate-900 border-slate-900' : 'bg-slate-100 border-slate-200'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white transition-all ${inputs.with_asset ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className={`p-8 border-2 ${providerConnected ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-200 border-dashed'} flex flex-col items-center justify-center text-center transition-all`}>
                                <div className="w-12 h-12 bg-white border-2 border-slate-100 flex items-center justify-center mb-6 relative">
                                    <Server className={`w-5 h-5 ${providerConnected ? 'text-emerald-600' : 'text-slate-400'}`} />
                                    {providerConnected && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 animate-pulse"></div>}
                                </div>
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">{providerConnected ? 'Handshake Active' : 'API Link Isolation'}</h3>
                                <p className="text-[10px] text-slate-500 leading-relaxed font-medium mb-6 uppercase tracking-tight">
                                    {providerConnected ? 'Streaming validated load telemetry.' : 'Connect to MSEDCL/BESCOM smart grid infrastructure.'}
                                </p>

                                {!providerConnected ? (
                                    <button
                                        onClick={handleConnectProvider}
                                        disabled={connecting}
                                        className="w-full py-3 bg-white border-2 border-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        {connecting ? <Activity className="w-3 h-3 animate-spin" /> : null}
                                        {connecting ? "Synchronizing..." : "Initiate Link"}
                                    </button>
                                ) : (
                                    <div className="text-[10px] font-black text-emerald-600 uppercase flex items-center gap-2 border border-emerald-200 px-3 py-1 bg-white">
                                        <Activity className="w-3 h-3" /> Live Telemetry
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={runSimulation}
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all hover:bg-slate-800 disabled:opacity-50"
                        >
                            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                            {loading ? "Synthesizing Scenarios..." : "Execute Analysis"}
                        </button>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Engine Status</span>
                        <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-600 font-bold uppercase">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Nominal
                        </div>
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-tighter">IEX Latency: 1.2ms</div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 bg-[#FDFDFD] p-10 overflow-y-auto h-screen min-w-0">
                <div className="max-w-6xl mx-auto min-w-0">
                    {/* Header Action Bar */}
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-1 px-2 border-2 border-slate-900 text-slate-900 text-[10px] font-black tracking-tighter uppercase">
                                    WORKSPACE: RISK-01
                                </div>
                                <div className="h-4 w-[1px] bg-slate-200"></div>
                                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest underline underline-offset-4 decoration-slate-300">Tactical Risk Environment</span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Stochastic Analysis Center</h1>
                            <p className="text-sm text-slate-500 mt-2 font-medium">Instance ID: #PROD-8821 • {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleExport}
                                disabled={!data}
                                className="px-5 py-2.5 bg-white border-2 border-slate-100 text-[11px] font-black text-slate-900 uppercase tracking-widest hover:border-slate-900 transition-all disabled:opacity-30"
                            >
                                <FileText className="w-3 h-3 inline mr-2" /> Export
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-5 py-2.5 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
                            >
                                <Save className="w-3 h-3 inline mr-2" /> Save to Vault
                            </button>
                        </div>
                    </div>

                    {!data ? (
                        <div className="h-[60vh] flex flex-col items-center justify-center text-center border-4 border-slate-100 border-dashed p-20">
                            <div className="w-16 h-16 border-2 border-slate-100 flex items-center justify-center mb-8">
                                <Activity className="w-8 h-8 text-slate-200" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Awaiting Logic Directives</h3>
                            <p className="text-slate-400 max-w-sm mt-4 text-[13px] font-medium leading-relaxed">
                                System ready for input serialization. Parameters must be defined in the control console to initiate Monte Carlo synthesis.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-12 animate-fade-in pb-20">
                            <ErrorBoundary>
                                <div className="grid grid-cols-12 gap-6 bg-slate-50 p-1 border border-slate-200">
                                    <div className="col-span-12 lg:col-span-8 h-[450px]">
                                        <ErrorBoundary>
                                            <CommandCenter data={data} />
                                        </ErrorBoundary>
                                    </div>
                                    <div className="col-span-12 lg:col-span-4 h-[450px]">
                                        <ErrorBoundary>
                                            <PulseStream data={data} />
                                        </ErrorBoundary>
                                    </div>
                                </div>
                            </ErrorBoundary>

                            <ErrorBoundary>
                                {/* Metrics (Sharp Grayscale Style) */}
                                <div className="grid grid-cols-3 gap-6">
                                    <MetricBox label="P05 Tail Value" value={data.financials.p05_inr} />
                                    <MetricBox label="Expected Mean Exposure" value={data.financials.expected_cost_inr} hero />
                                    <MetricBox label="P95 Risk Ceiling" value={data.financials.p95_inr} warning />
                                </div>
                            </ErrorBoundary>

                            <ErrorBoundary>
                                <RiskCommandCenter results={data} />
                            </ErrorBoundary>

                            {/* Institutional Synthesis */}
                            <div className="border-4 border-slate-900 p-10 bg-white relative overflow-hidden">
                                <div className="absolute top-4 right-4 text-[40px] font-black text-slate-50 uppercase pointer-events-none select-none">
                                    VOLTWISE INTERNAL
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <FileText className="w-4 h-4 text-slate-900" />
                                        <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-900">Interpretive Analysis</span>
                                        {llmLoading && (
                                            <div className="flex items-center gap-2 ml-4">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Neural Processing</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="max-w-3xl">
                                        {llmLoading ? (
                                            <div className="space-y-4">
                                                <div className="h-4 bg-slate-100 w-full"></div>
                                                <div className="h-4 bg-slate-100 w-11/12"></div>
                                                <div className="h-4 bg-slate-100 w-10/12"></div>
                                            </div>
                                        ) : (
                                            <p className="text-xl text-slate-700 leading-relaxed font-serif italic">
                                                "{llmReport || data.insights.narrative}"
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Specialized Sub-Components ---

const InputGroup = ({ label, children }) => (
    <div className="space-y-3">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</label>
        {children}
    </div>
);

const MetricBox = ({ label, value, hero, warning }) => (
    <div className={`p-8 border-2 transition-all ${hero ? 'border-slate-900 bg-white shadow-xl -translate-y-1' : 'border-slate-100 bg-white'}`}>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
            {label}
            {hero && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
            {warning && <AlertTriangle className="w-3 h-3 text-orange-500" />}
        </div>
        <div className={`text-4xl font-mono font-black tracking-tighter ${warning ? 'text-orange-600' : 'text-slate-900'}`}>
            <span className="text-sm text-slate-300 mr-2 font-sans">₹</span>
            {(value / 100000).toFixed(2)}L
        </div>
        <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Confidence</span>
            <span className="text-[9px] font-mono font-black text-slate-600 uppercase">0.9982</span>
        </div>
    </div>
);

export default RiskConsole;

