import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import HowItWorks from './pages/HowItWorks';
import RiskConsole from './pages/RiskConsole';
import Architecture from './pages/Architecture';
import Manifesto from './pages/Manifesto';
import Assumptions from './pages/Assumptions';
import About from './pages/About';
import Writings from './pages/Writings';
import SystemNavigator from './components/SystemNavigator';

function App() {
    return (
        <ToastProvider>
            <Router>
                <div className="min-h-screen bg-[#F5F5F7]">
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/how-it-works" element={<HowItWorks />} />
                        <Route path="/console" element={<RiskConsole />} />
                        <Route path="/architecture" element={<Architecture />} />
                        <Route path="/manifesto" element={<Manifesto />} />
                        <Route path="/assumptions" element={<Assumptions />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/writings" element={<Writings />} />
                    </Routes>
                    <SystemNavigator />
                </div>
            </Router>
        </ToastProvider>
    );
}

export default App;
