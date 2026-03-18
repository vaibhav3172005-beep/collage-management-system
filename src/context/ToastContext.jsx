import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-xl border ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                    toast.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                                        'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                                } backdrop-blur-md`}
                        >
                            {toast.type === 'success' && <CheckCircle size={20} />}
                            {toast.type === 'error' && <XCircle size={20} />}
                            {toast.type === 'info' && <Info size={20} />}
                            <span className="font-medium">{toast.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
