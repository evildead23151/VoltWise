import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Zap, LayoutGrid, FileText, Server, Database, Newspaper, Info, HelpCircle, Activity } from 'lucide-react';
import { useToast } from './Toast';

const Navigation = () => {
    const { addToast } = useToast();
    const navigate = useNavigate();

    return (
        <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
            <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">

                {/* Instrument Logo */}
                <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                    <div className="w-9 h-9 border-2 border-slate-900 flex items-center justify-center bg-slate-900 text-white transition-all group-hover:bg-white group-hover:text-slate-900">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-sm uppercase tracking-tighter text-slate-900 leading-none">Voltwise</span>
                        <span className="text-[9px] text-slate-400 font-mono font-bold tracking-widest uppercase mt-0.5">Risk Infrastructure</span>
                    </div>
                </NavLink>

                {/* Unified Engineering Links */}
                <div className="hidden lg:flex items-center gap-2">
                    <NavItem to="/" label="Dashboard" />
                    <div className="w-px h-4 bg-slate-200 mx-2"></div>
                    <NavItem to="/how-it-works" label="Engine" />
                    <NavItem to="/architecture" label="Architecture" />
                    <NavItem to="/manifesto" label="Methodology" />
                    <NavItem to="/assumptions" label="Registry" />
                    <NavItem to="/writings" label="Writings" />
                </div>

                {/* Operation Control */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end mr-2">
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Network Status</span>
                        <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
                            Operational: P6
                        </span>
                    </div>
                    <button
                        onClick={() => navigate('/console')}
                        className="bg-slate-900 text-white px-6 py-2 rounded-none text-[11px] font-black uppercase tracking-widest transition-all hover:bg-slate-800 border border-slate-900"
                    >
                        Execute Console
                    </button>
                </div>
            </div>
        </nav>
    );
};

const NavItem = ({ to, label }) => (
    <NavLink
        to={to}
        end={to === "/"}
        className={({ isActive }) => `
            px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-all
            ${isActive ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50 border-b-2 border-transparent'}
        `}
    >
        {label}
    </NavLink>
);

export default Navigation;

