import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, BookOpen, Battery, Zap, Copy, Shield, Target, Scale, AlertOctagon } from 'lucide-react';
import { useToast } from '../components/Toast';

const Manifesto = () => {
    const { addToast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText("engineering@voltwise.io");
        addToast("Address copied to clipboard", "success");
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-32 selection:bg-blue-100">
            {/* Engineering Header */}
            <div className="bg-white border-b border-gray-200 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-1 px-2 bg-slate-900 text-white text-[10px] font-black tracking-widest uppercase">
                            METHODOLOGY: MANIFESTO-01
                        </div>
                        <div className="h-4 w-[1px] bg-gray-300"></div>
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Axiomatic Principles</span>
                    </div>

                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-10 uppercase leading-none">
                        Engineering Transparency <br />
                        <span className="text-slate-400">for Power Markets.</span>
                    </h1>

                    <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl">
                        A structural analysis of cost volatility in modern electrical grids. We provide raw data aggregation and technical research tools, devoid of speculative forecasting or commercial bias.
                    </p>
                </div>
            </div>

            {/* Core Directives */}
            <div className="max-w-4xl mx-auto px-6 mt-24">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-12 border-b border-slate-100 pb-4 w-fit">
                    Tactical Directives
                </h2>

                <div className="grid md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                    <DirectiveCard
                        icon={<Battery className="w-5 h-5" />}
                        title="Physics First"
                        text="Our methodology is derived from first principles of electrical engineering, not financial derivatives. We approach the grid as a physical machine with operational constraints, load factors, and transmission limits."
                    />
                    <DirectiveCard
                        icon={<Zap className="w-5 h-5" />}
                        title="Volatility Isolation"
                        text="Price variance is a symptom of physical stress. By correlating price spikes with telemetry data, we isolate the structural inefficiencies driving institutional cost."
                    />
                </div>
            </div>

            {/* Compliance Matrix */}
            <div className="max-w-4xl mx-auto px-6 mt-32">
                <div className="bg-slate-900 p-16 text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-16">
                        {/* Operational Scope */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                <h3 className="text-xs font-black uppercase tracking-widest">In-Scope System Functions</h3>
                            </div>
                            <div className="space-y-10">
                                <Item title="Analytical Inference" text="Deterministic processing of physical grid states using rule-based logic." />
                                <Item title="Entropy Visualization" text="High-resolution mapping of energy market variance and tail-risks." />
                                <Item title="Axiom Registry" text="Transparent methodology for calculating local nodal pricing efficiency." />
                            </div>
                        </div>

                        {/* Non-Operational Boundaries */}
                        <div>
                            <div className="flex items-center gap-3 mb-8 text-slate-400">
                                <AlertOctagon className="w-5 h-5" />
                                <h3 className="text-xs font-black uppercase tracking-widest">Non-Operational Boundaries</h3>
                            </div>
                            <div className="space-y-10 opacity-60">
                                <Item negative title="Financial Guidance" text="Voltwise does not offer investment advice or commercial trading signals." />
                                <Item negative title="Speculative Prediction" text="No AI-generated price forecasts. Analysis is bound to historical physics." />
                                <Item negative title="Commercial Influence" text="Stateless independence from energy generation conglomerates and OEMs." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formal Contact */}
            <div className="max-w-4xl mx-auto px-6 mt-32 text-center pb-24">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Technical Inquiries Only</div>
                <div className="inline-flex items-center gap-6 px-10 py-6 border-2 border-slate-900 group">
                    <span className="font-mono text-lg font-black text-slate-900">engineering@voltwise.io</span>
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                    >
                        <Copy className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
                <p className="mt-8 text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                    Sales requests are systematically discarded.
                </p>
            </div>
        </div>
    );
};

const DirectiveCard = ({ title, text, icon }) => (
    <div className="bg-white p-12 hover:bg-slate-50 transition-colors">
        <div className="mb-8 p-3 inline-block border border-slate-100">
            {icon}
        </div>
        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">{title}</h3>
        <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
            {text}
        </p>
    </div>
);

const Item = ({ title, text, negative }) => (
    <div className="space-y-2">
        <h4 className={`text-[12px] font-black uppercase tracking-widest ${negative ? 'text-slate-400' : 'text-blue-400'}`}>
            {title}
        </h4>
        <p className="text-[13px] text-slate-300 leading-relaxed font-medium">
            {text}
        </p>
    </div>
);

export default Manifesto;

