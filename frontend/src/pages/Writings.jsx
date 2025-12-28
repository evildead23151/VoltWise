import React from 'react';
import { Newspaper, ArrowRight, Clock, Tag, ExternalLink } from 'lucide-react';

const Writings = () => {
    const [activeTab, setActiveTab] = React.useState('internal'); // 'internal' | 'live'
    const [livePapers, setLivePapers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // Newsletter State
    const [email, setEmail] = React.useState("");
    const [subStatus, setSubStatus] = React.useState("idle"); // idle | loading | success | error

    const handleSubscribe = async () => {
        if (!email || !email.includes("@")) {
            setSubStatus("error");
            return;
        }
        setSubStatus("loading");
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (res.ok) {
                setSubStatus("success");
                setEmail("");
            } else {
                setSubStatus("error");
            }
        } catch (e) {
            setSubStatus("error");
        }
    };

    const fetchLiveResearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/research/live');
            if (!res.ok) throw new Error("Service Unavailable");
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                setLivePapers(data);
            } else {
                setLivePapers([]);
            }
        } catch (err) {
            console.error("Feed Error", err);
            setError(true);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        if (activeTab === 'live' && livePapers.length === 0) {
            fetchLiveResearch();
        }
    }, [activeTab]);
    const articles = [
        {
            date: "Oct 27, 2023",
            category: "Grid Physics",
            title: "The Fallacy of the Average: Why Point-Predictions Fail in RTM Markets",
            excerpt: "Analyzing the mathematical intuition behind why stochastic simulation is superior to time-series forecasting for industrial consumers.",
            readTime: "8 min"
        },
        {
            date: "Sep 14, 2023",
            category: "Regulatory",
            title: "State-wise Tariff Arbitrage: A Structural Analysis of CSS and FPPCA",
            excerpt: "A deep dive into how retrospective surcharges are calculated and their impact on the tail risk of heavy industrial users.",
            readTime: "12 min"
        },
        {
            date: "Aug 02, 2023",
            category: "Infrastructure",
            title: "Memory, Patience, and Boredom: Building Systems that Compound",
            excerpt: "Our architectural philosophy for software that serves as long-term institutional decision support.",
            readTime: "6 min"
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-32">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Newspaper className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Intelligence & Research</h1>
                    </div>
                    <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-8">
                        Technical monographs and real-time market literature. Access our core architectural memos or stream live papers from global exchanges.
                    </p>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                        <button
                            onClick={() => setActiveTab('internal')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'internal' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Voltwise Monographs
                        </button>
                        <button
                            onClick={() => setActiveTab('live')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'live' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <ExternalLink className="w-3 h-3" /> Global Research Feed
                        </button>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="max-w-4xl mx-auto px-6 mt-12 space-y-12 min-h-[400px]">
                {loading && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <span className="text-xs font-bold uppercase tracking-widest">Connecting to ArXiv...</span>
                    </div>
                )}

                {activeTab === 'live' && error && (
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-red-100 bg-red-50/50 rounded-xl text-center">
                        <div className="text-red-500 font-bold mb-2">Live Stream Offline</div>
                        <p className="text-xs text-red-400 max-w-sm mb-4">
                            Unable to connect to the ArXiv Research Proxy. The backend service may be restarting or unreachable.
                        </p>
                        <button
                            onClick={fetchLiveResearch}
                            className="text-xs font-bold text-red-600 underline hover:text-red-800"
                        >
                            Retry Connection
                        </button>
                    </div>
                )}

                {activeTab === 'live' && !loading && !error && livePapers.length === 0 && (
                    <div className="text-center py-20 text-gray-400 italic">No recent papers found matching criteria.</div>
                )}

                {activeTab === 'internal' ? (
                    articles.map((article, idx) => (
                        <article key={idx} className="group cursor-pointer">
                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                <span>{article.date}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="text-blue-600 font-mono flex items-center gap-1">
                                    <Tag className="w-3 h-3" /> {article.category}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4 flex items-center justify-between">
                                {article.title}
                                <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                            </h2>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mb-6">
                                {article.excerpt}
                            </p>
                            <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-50 pt-4">
                                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {article.readTime} Read</span>
                                <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"><ExternalLink className="w-3 h-3" /> Technical Monograph</span>
                            </div>
                        </article>
                    ))
                ) : (
                    livePapers.map((paper, idx) => (
                        <article key={idx} className="group cursor-pointer bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-[10px] font-bold uppercase tracking-wide">
                                        {paper.source}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-mono">{paper.date}</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-purple-600 transition-colors" />
                            </div>

                            <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                                <a href={paper.link} target="_blank" rel="noopener noreferrer">{paper.title}</a>
                            </h2>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                                {paper.excerpt}
                            </p>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Research Link • Cornell API
                            </div>
                        </article>
                    ))
                )}
            </div>

            {/* Newsletter/Registry - PAUSED FOR GOVERNANCE */}
            <div className="max-w-4xl mx-auto px-6 mt-32">
                <div className="bg-gray-900 rounded-2xl p-12 text-center text-white relative overflow-hidden border border-white/5 shadow-2xl">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Protocol Syncing</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter italic">The Decision Ledger</h3>
                        <p className="text-sm text-gray-400 max-w-sm mx-auto mb-8 font-mono leading-relaxed">
                            THE LEDGER IS CURRENTLY PAUSED. <br />
                            We are formalizing our data sovereignty protocols. Monthly research updates will resume once the Institutional Review is complete.
                        </p>
                        <div className="max-w-md mx-auto">
                            <div className="w-full bg-white/5 border border-white/10 px-4 py-4 rounded text-center">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Institutional Freeze Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Writings;
