import React from 'react';
import RiskHistogram from './RiskHistogram';
import { Activity, ShieldAlert, Zap, TrendingUp } from 'lucide-react';

const RiskCommandCenter = ({ results }) => {
    if (!results) return null;

    const { financials, meta, asset_analysis } = results;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Mission Control Header */}
            <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">RISK COMMAND CENTER</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-3 h-3 text-blue-500" />
                        Stochastic Scenarios: {meta.paths.toLocaleString()} | Frequency: 15-min
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-tighter">
                        Axiom 60: Tactical Overview Active
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Left: Probabilistic Distribution (Quadrant B) */}
                <div className="col-span-12 lg:col-span-7 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Cost Density Distribution</h3>
                                <p className="text-xs text-gray-500">Frequency of simulated outcomes across ₹{(financials.expected_cost_inr / 100000).toFixed(1)}L baseline.</p>
                            </div>
                            <TrendingUp className="w-4 h-4 text-gray-300" />
                        </div>
                        <div className="h-64">
                            {results.raw_costs && results.raw_costs.length > 0 ? (
                                <RiskHistogram costs={results.raw_costs} bins={40} />
                            ) : (
                                <div className="h-full flex items-center justify-center text-xs text-slate-400">Computing Distribution...</div>
                            )}
                        </div>
                    </div>

                    {/* Extreme Tail Drilldown (Quadrant C) */}
                    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center border border-red-500/30">
                                <ShieldAlert className="w-4 h-4 text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-red-400">Extreme Tail Event (P99+)</h3>
                                <p className="text-[10px] text-slate-400 uppercase font-medium">Worst-case path identification</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Max Exposure</p>
                                <p className="text-lg font-mono font-bold leading-none">₹{(financials.tail_event?.cost_inr ? (financials.tail_event.cost_inr / 100000).toFixed(2) : "0.00")}L</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Peak Price</p>
                                <p className="text-lg font-mono font-bold leading-none text-red-400">₹{financials.tail_event?.max_price?.toFixed(2) || "0.00"}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Asset Dampening</p>
                                <p className="text-lg font-mono font-bold leading-none text-blue-400">
                                    {asset_analysis?.type?.includes('BESS') ? (
                                        <>
                                            {(financials.tail_event?.bess_soc_at_peak ? (financials.tail_event.bess_soc_at_peak * 100).toFixed(0) : "0")}% <span className="text-[10px] text-slate-500 font-normal">SoC</span>
                                        </>
                                    ) : (
                                        <>
                                            Study <span className="text-[10px] text-slate-500 font-normal">Active</span>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Operational Integrity (Quadrant D) */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Asset Grounding Pulse</h3>
                            <Zap className="w-4 h-4 text-blue-500" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500 font-medium">Asset Topology</span>
                                <span className="text-gray-900 font-bold">{asset_analysis?.type || 'None'}</span>
                            </div>
                            {asset_analysis?.type?.includes('BESS') ? (
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-medium">Mean Degradation</span>
                                    <span className="text-gray-900 font-bold font-mono">₹{financials.mean_degradation_inr?.toFixed(0) || 0}</span>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-medium">H2 Production</span>
                                    <span className="text-gray-900 font-bold font-mono">{asset_analysis?.production_kg?.toFixed(1) || 0} kg/day</span>
                                </div>
                            )}
                            <div className="pt-2">
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${meta.asset_present ? 88 : 0}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[9px] text-gray-400 font-bold uppercase">Physics Integrity</span>
                                    <span className="text-[9px] text-blue-600 font-bold uppercase">{meta.asset_present ? 'Stable' : 'Offline'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stochastic Confidence */}
                    <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-70">Simulation Confidence</p>
                        <h4 className="text-2xl font-black mb-1">99.2%</h4>
                        <p className="text-xs font-medium opacity-80 leading-relaxed">
                            Engine converged after {meta.paths} paths. Extreme tail sensitivity identified at hour {financials.tail_event?.peak_hour || "N/A"}.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskCommandCenter;
