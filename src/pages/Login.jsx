import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [institutionalId, setInstitutionalId] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure strictly lowercase matches on both Login and Register
        const generatedEmail = `${institutionalId.trim().toLowerCase()}@cocsit.edu`;

        const { success } = await login(generatedEmail, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glassmorphism p-8 rounded-2xl w-full max-w-md relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-indigo-500"></div>

                <div className="text-center mb-8">
                    <Hexagon size={48} className="text-emerald-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold tracking-wider mb-2">
                        COCSIT<span className="text-slate-400 font-normal">Portal</span>
                    </h1>
                    <p className="text-slate-400">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-slate-300 mb-1 ml-1">Institutional ID / Admin ID</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                required
                                value={institutionalId}
                                onChange={(e) => setInstitutionalId(e.target.value)}
                                placeholder="e.g. STU-1001 or ADM-01"
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1 ml-1">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/30 mt-6"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-slate-400">
                    Don't have an account? <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">Register here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
