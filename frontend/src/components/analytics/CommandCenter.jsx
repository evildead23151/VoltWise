import React from 'react';

// Zero-dependency SVG Icons to prevent import crashes
const RadarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-500">
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
        <path d="M12 3v18" />
        <path d="M3 12h18" />
    </svg>
);

const SafeRiskPillar = ({ height, color, label, left, top }) => {
    // Ensure height is a safe number between 10 and 100
    const safeHeight = Math.min(Math.max(Number(height) * 20, 10), 100) || 10;

    return (
        <div className="absolute z-10 group" style={{ left, top }}>
            {/* Center the group on the coordinates */}
            <div className="relative flex flex-col items-center" style={{ transform: 'translate(-50%, -50%)' }}>

                {/* Text Label - Absolute positioned above */}
                <div className="absolute bottom-full mb-2 px-2 py-0.5 rounded bg-black/60 border border-white/10 backdrop-blur text-[9px] font-mono font-bold text-white whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                    {label}
                </div>

                {/* The Dot (Anchor Point) */}
                <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] relative z-20" style={{ backgroundColor: color }}>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: color }}></div>
                </div>

                {/* The Stem - Absolute positioned below */}
                <div className="absolute top-2 w-0.5 bg-current opacity-60 origin-top" style={{ height: `${safeHeight}px`, color: color }}></div>
            </div>
        </div>
    );
};

const CommandCenter = ({ data }) => {
    // Ultra-safe data access
    const market = data?.market_status?.source || "Global Market";
    const p95 = Number(data?.financials?.p95_inr) || 0;
    const expected = Number(data?.financials?.expected_cost_inr) || 1;
    const riskRatio = expected !== 0 ? (p95 / expected) : 1;

    const isIndia = market.includes("India") || market.includes("IEX");

    return (
        <div className="w-full h-full bg-slate-950 rounded-3xl overflow-hidden relative border border-slate-800 shadow-2xl flex flex-col p-6">
            {/* Header */}
            <div className="flex justify-between items-start z-20 mb-2">
                <div>
                    <h2 className="text-xl font-black text-white tracking-tighter flex items-center gap-2">
                        <RadarIcon />
                        RISK TOPOLOGY
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">System Nominal</span>
                    </div>
                </div>
            </div>

            {/* Main Content: CSS Globe */}
            <div className="flex-1 relative flex items-center justify-center">
                {/* Reduced size for better fit in 450px container */}
                <div className="relative w-64 h-64 rounded-full bg-slate-900 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)] overflow-hidden shrink-0">
                    {/* Fake Map Background */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.4)_2px,transparent_2px)] bg-[length:30px_30px]"></div>

                    {/* Lat/Long Lines */}
                    <div className="absolute inset-0 border rounded-full border-blue-500/10 rotate-45"></div>
                    <div className="absolute inset-0 border rounded-full border-blue-500/10 -rotate-45"></div>

                    {/* Pillars */}
                    <SafeRiskPillar
                        left="75%" top="55%"
                        height={isIndia ? riskRatio : 1}
                        color={isIndia ? "#3b82f6" : "#64748b"}
                        label="INDIA"
                    />
                    <SafeRiskPillar
                        left="25%" top="40%"
                        height={0.8}
                        color="#64748b"
                        label="USA"
                    />
                    <SafeRiskPillar
                        left="50%" top="30%"
                        height={0.9}
                        color="#64748b"
                        label="EU"
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-2 border-t border-slate-800 pt-3 z-20 flex justify-between">
                <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Target</p>
                    <p className="text-xs font-mono text-white">{market}</p>
                </div>
                <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Engine</p>
                    <p className="text-xs font-mono text-blue-400">CSS Rendering</p>
                </div>
            </div>
        </div>
    );
};

export default CommandCenter;
