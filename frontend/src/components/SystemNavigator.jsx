import React, { useState, useEffect, useRef } from 'react';
import { Compass, X, Send, BookOpen, Map, MessageSquare, ExternalLink, HelpCircle, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SystemNavigator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [query, setQuery] = useState("");
    const [chat, setChat] = useState([
        { role: 'system', content: "SYSTEM NAVIGATOR ACTIVATED. I can assist with terminal navigation, methodology lookup, and documentation retrieval. I do not provide financial advice or operational recommendations." }
    ]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const speak = (text) => {
        if (!voiceEnabled || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1;
        utterance.pitch = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        scrollToBottom();
        const lastMsg = chat[chat.length - 1];
        if (lastMsg && (lastMsg.role === 'assistant' || lastMsg.role === 'system')) {
            speak(lastMsg.content);
        }
    }, [chat, voiceEnabled]);

    const handleAction = (type, payload) => {
        if (type === 'NAVIGATE') {
            navigate(payload);
            setChat(prev => [...prev, { role: 'system', content: `Redirecting to ${payload}...` }]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMsg = { role: 'user', content: query };
        setChat(prev => [...prev, userMsg]);
        setQuery("");
        setLoading(true);

        try {
            const res = await fetch('/api/navigator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const data = await res.json();

            setChat(prev => [...prev, { role: 'assistant', content: data.response }]);

            if (data.action) {
                handleAction(data.action.type, data.action.payload);
            }
        } catch (err) {
            setChat(prev => [...prev, { role: 'system', content: "ERROR: Navigation logic unavailable." }]);
        }
        setLoading(false);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 flex items-center justify-center transition-all shadow-2xl ${isOpen ? 'bg-slate-900 rotate-90' : 'bg-slate-900 hover:scale-110'}`}
            >
                {isOpen ? <X className="text-white w-6 h-6" /> : <Compass className="text-white w-6 h-6" />}
            </button>

            {/* Panel */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-96 h-[500px] bg-white border-2 border-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 duration-300">
                    <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Compass className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">System Navigator v1.1</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setVoiceEnabled(!voiceEnabled)}
                                className={`p-1 hover:bg-white/10 rounded transition-colors ${voiceEnabled ? 'text-emerald-400' : 'text-slate-500'}`}
                            >
                                {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                            </button>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[11px]">
                        {chat.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 border ${msg.role === 'user' ? 'bg-slate-50 border-slate-200 text-slate-900' : (msg.role === 'system' ? 'bg-slate-900 text-slate-400 border-slate-800 italic' : 'bg-white border-slate-900 text-slate-900')}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="p-3 bg-white border border-slate-900 flex gap-1">
                                    <div className="w-1 h-1 bg-slate-900 animate-bounce"></div>
                                    <div className="w-1 h-1 bg-slate-900 animate-bounce delay-75"></div>
                                    <div className="w-1 h-1 bg-slate-900 animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Pre-sets */}
                    <div className="p-3 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                        <QuickLink icon={<Map />} label="Open Console" onClick={() => setQuery("Open Risk Console")} />
                        <QuickLink icon={<BookOpen />} label="Methodology" onClick={() => setQuery("Explain the engine methodology")} />
                        <QuickLink icon={<HelpCircle />} label="What is P95?" onClick={() => setQuery("What does P95 represent?")} />
                        <QuickLink icon={<MessageSquare />} label="Hinglish Batao" onClick={() => setQuery("Hinglish mode mein samjhao")} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 border-t-2 border-slate-900 flex gap-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="SEARCH SYSTEM DIRECTORY..."
                            className="flex-1 text-[10px] font-black uppercase tracking-widest outline-none"
                        />
                        <button type="submit" className="p-2 hover:bg-slate-100 transition-colors">
                            <Send className="w-4 h-4 text-slate-900" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

const QuickLink = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 p-2 bg-white border border-slate-200 hover:border-slate-900 transition-all text-[9px] font-black uppercase tracking-tighter text-slate-600 hover:text-slate-900"
    >
        {React.cloneElement(icon, { size: 12 })}
        {label}
    </button>
);

export default SystemNavigator;
