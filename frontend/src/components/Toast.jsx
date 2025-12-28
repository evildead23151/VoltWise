import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium animate-slide-up
                            ${toast.type === 'success' ? 'bg-white border-green-100 text-gray-800' : ''}
                            ${toast.type === 'error' ? 'bg-white border-red-100 text-gray-800' : ''}
                            ${toast.type === 'info' ? 'bg-gray-900 border-gray-800 text-white' : ''}
                        `}
                    >
                        {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                        {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}

                        {toast.message}

                        <button onClick={() => removeToast(toast.id)} className="ml-4 opacity-50 hover:opacity-100">
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};
