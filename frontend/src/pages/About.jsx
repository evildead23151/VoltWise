import React from 'react';
import { BookOpen, Target, Shield, Users, Building, Cpu, Zap, ArrowRight, FileText, Globe, Scale } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-32 selection:bg-blue-100">
            {/* Monograph Header */}
            <div className="bg-white border-b border-gray-200 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-1 px-2 bg-slate-100 border border-slate-300 text-slate-500 text-[10px] font-black tracking-widest uppercase">
                            DOC ID: VW-CORP-2025
                        </div>
                        <div className="h-4 w-[1px] bg-gray-300"></div>
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest line-through decoration-slate-300">Internal Document</span>
                        <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest pl-2">Approved for External Briefing</span>
                    </div>

                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-10 uppercase leading-none">
                        Visibility Must Precede <br />
                        <span className="text-slate-400">Intelligence.</span>
                    </h1>

                    <div className="relative border-l-4 border-slate-900 pl-8 mt-12 mb-8">
                        <p className="text-2xl text-slate-500 leading-relaxed font-serif italic max-w-2xl">
                            "Commercial and industrial electricity in India is not a cost variable to be optimized, but a physical system constraint to be quantified."
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Methodology / Philosophy */}
            <div className="max-w-4xl mx-auto px-6 mt-24">
                <div className="grid grid-cols-12 gap-16 mb-24">
                    <div className="col-span-5">
                        <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2 w-fit">
                            Design Ethos
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-6">Axiomatic Design</h2>
                        <p className="text-[15px] text-slate-500 leading-relaxed mb-6 font-medium">
                            Voltwise was built with a specific engineering bias: we reject the black-box "Savings Optimization" trend. Instead, we embrace <span className="text-slate-900 font-bold border-b-2 border-slate-100">System Transparency</span>.
                        </p>
                        <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
                            Our platform is calibrated for the Chief Engineer and the Institutional CFO who require verifiable risk models, not marketing-led savings promises.
                        </p>
                    </div>
                    <div className="col-span-7 space-y-4">
                        <PhilosophyBlock
                            title="Risk-Structure-First"
                            desc="We map the tail risks of the Indian grid. We prioritize the 5% of hours that cause 90% of the financial stress."
                            icon={<Shield className="w-4 h-4" />}
                        />
                        <PhilosophyBlock
                            title="Decision Support"
                            desc="Software doesn't save money; people pulling physical switches save money. Our job is to give them the map."
                            icon={<Target className="w-4 h-4" />}
                        />
                        <PhilosophyBlock
                            title="Infrastructure-Grade"
                            desc="Stateless, deterministic, and built with long-term institutional memory. Every calculation is serializable."
                            icon={<Scale className="w-4 h-4" />}
                        />
                    </div>
                </div>
            </div>

            {/* Institution Stats */}
            <div className="bg-slate-50 border-y border-slate-200 py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-3 gap-12">
                        <InstitutionStat label="Foundation" value="First Principles" />
                        <InstitutionStat label="Vertical" value="Grid Reliability" />
                        <InstitutionStat label="Jurisdiction" value="State-Level (KA, MH, GJ, TN)" />
                    </div>
                </div>
            </div>

            {/* Final CTA / Contact */}
            <div className="max-w-4xl mx-auto px-6 mt-32">
                <div className="border-4 border-slate-900 p-16 bg-white relative overflow-hidden">
                    {/* Watermark */}
                    <Globe className="absolute -bottom-8 -right-8 w-48 h-48 text-slate-50" />

                    <div className="relative z-10 max-w-lg">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-6">Built for the Transition.</h3>
                        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                            As the Indian grid shifts towards 500GW of renewable capacity, volatility is the new baseline. Voltwise provides the infrastructure to navigate this shift with technical confidence.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                                Request Technical Briefing
                            </button>
                            <button className="px-8 py-3 border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                                Institutional PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PhilosophyBlock = ({ title, desc, icon }) => (
    <div className="p-8 border border-slate-200 bg-white group hover:border-slate-900 transition-all">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-2 border border-slate-100 group-hover:border-slate-900 transition-all">
                {icon}
            </div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">{title}</h4>
        </div>
        <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
);

const InstitutionStat = ({ label, value }) => (
    <div className="border-l-2 border-slate-900 pl-6">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-lg font-black text-slate-900 uppercase tracking-tighter">{value}</div>
    </div>
);

export default About;

