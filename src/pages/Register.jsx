import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDepartment } from '../context/DepartmentContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, User, Mail, Lock, Briefcase } from 'lucide-react';

const Register = () => {
    const { register } = useAuth();
    const { departments } = useDepartment();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'student',
        department: departments[0]
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData);
        // AuthContext updates the user, and App.jsx Router triggers redirection
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glassmorphism p-8 rounded-2xl w-full max-w-lg relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-indigo-500"></div>

                <div className="text-center mb-6">
                    <Hexagon size={40} className="text-emerald-400 mx-auto mb-2" />
                    <h1 className="text-2xl font-bold tracking-wider mb-1">Create an Account</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-1 ml-1">Full Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="John Doe" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-1 ml-1">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@cocsit.edu" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1 ml-1">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input required name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-1 ml-1">Role</label>
                            <div className="relative">
                                <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 appearance-none">
                                    <option value="student">Student</option>
                                    <option value="staff">Staff/Faculty</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-1 ml-1">Department</label>
                            <select name="department" value={formData.department} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-indigo-500 appearance-none">
                                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition-all shadow-lg mt-4">
                        Register Account
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-slate-400">
                    Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
