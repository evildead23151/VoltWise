import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Zap, Info, ArrowUpRight } from 'lucide-react';

const PulseStream = ({ data }) => {
    const [logs, setLogs] = useState([]);
    const scrollRef = useRef();

    const mockLogBases = [
        { type: 'Phys_chk', icon: <Zap className="w-3 h-3 text-yellow-400" />, msg: "BESS State-of-Charge within safety envelope (88%)" },
        { type: 'Mkt_gnd', icon: <ArrowUpRight className="w-3 h-3 text-green-400" />, msg: "PJM East DAM grounding successful" },
        { type: 'Sec_ver', icon: <Shield className="w-3 h-3 text-red-400" />, msg: "Simulation integrity verified: 100k paths" }
    ];

    // Inject live simulation results into the feed
    useEffect(() => {
        if (data && data.financials) {
            const p95 = data.financials.p95_inr || 0;
            const expected = data.financials.expected_cost_inr || 1;
            const riskRatio = (p95 / expected).toFixed(2);

            const newLog = {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
                type: 'SIM_DONE',
                icon: <Info className="w-3 h-3 text-blue-400" />,
                msg: `Analysis Complete. Risk Ratio: ${riskRatio}x. Mean: ₹${(expected / 100000).toFixed(2)}L`
            };
            setLogs(prev => [...prev.slice(-15), newLog]);
        }
    }, [data]);

    useEffect(() => {
        const interval = setInterval(() => {
            const base = mockLogBases[Math.floor(Math.random() * mockLogBases.length)];
            const newLog = {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
                type: 'SYS_LOG',
                icon: base.icon,
                msg: base.msg
            };
            setLogs(prev => [...prev.slice(-15), newLog]);
        }, 2500); // Slowed down background chatter

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="bg-slate-900 h-full w-full rounded-2xl p-6 text-white border border-slate-800 shadow-2xl flex flex-col overflow-hidden relative">
            <div className="flex justify-between items-start mb-4 flex-shrink-0">
                <div>
                    <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-blue-500" />
                        System Activity Stream
                    </h2>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono font-bold text-blue-400">LIVE_STREAM</span>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar min-h-0"
                style={{ scrollBehavior: 'smooth' }}
            >
                {logs.map((log) => (
                    <div
                        key={log.id}
                        className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                        <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <span className="text-[10px] text-slate-500 font-mono mt-0.5">{log.timestamp}</span>
                            <div className="mt-1">{log.icon}</div>
                            <div className="flex-1">
                                <span className={`text-[9px] font-black uppercase tracking-tighter mr-2 ${log.type === 'SIM_DONE' ? 'text-blue-400' :
                                    log.type === 'Phys_chk' ? 'text-yellow-400' :
                                        log.type === 'Mkt_gnd' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                    [{log.type}]
                                </span>
                                <span className="text-xs text-slate-300 font-medium leading-tight">
                                    {log.msg}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                    <span>Process Threads</span>
                    <span className="text-white">4 / 4 Online</span>
                </div>
                <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex-1 h-0.5 bg-blue-500/20 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
            `}} />
        </div>
    );
};

export default PulseStream;
