import React, { useState } from 'react';
import { useDepartment } from '../../context/DepartmentContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Bell, Search, Hexagon, Settings, UserCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Topbar = () => {
    const { currentDepartment, setCurrentDepartment, departments } = useDepartment();
    const { user, logout } = useAuth();
    const { addToast } = useToast();

    const [isDeptOpen, setIsDeptOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleNotificationsClick = () => {
        addToast('You have 3 new unread notifications.', 'info');
    };

    const handleLogout = () => {
        addToast('Logged out successfully.', 'success');
        logout();
    };

    return (
        <header className="h-20 border-b border-white/10 glassmorphism flex items-center justify-between px-8 relative z-50">

            {/* Department Switcher */}
            <div className="flex items-center space-x-4">
                {user?.role !== 'student' && (
                    <div className="relative">
                        <button
                            onClick={() => setIsDeptOpen(!isDeptOpen)}
                            className="flex items-center space-x-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 px-4 py-2 rounded-xl transition-all"
                        >
                            <Hexagon size={18} className="text-emerald-400" />
                            <span className="font-semibold">{currentDepartment} Dept</span>
                        </button>

                        <AnimatePresence>
                            {isDeptOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-12 left-0 w-48 bg-slate-800 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                                >
                                    {departments.map(dept => (
                                        <button
                                            key={dept}
                                            onClick={() => {
                                                setCurrentDepartment(dept);
                                                setIsDeptOpen(false);
                                                addToast(`Switched to ${dept} department context`, 'info');
                                            }}
                                            className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${currentDepartment === dept ? 'bg-indigo-600/50 text-white' : 'text-slate-300'}`}
                                        >
                                            {dept}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
                {user?.role === 'student' && (
                    <div className="flex items-center space-x-2 px-4 py-2">
                        <Hexagon size={18} className="text-emerald-400" />
                        <span className="font-semibold text-slate-300">{currentDepartment} Dept</span>
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-6">
                <div className="relative hidden md:block">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-slate-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                    />
                </div>

                <button onClick={handleNotificationsClick} className="relative p-2 rounded-full bg-white/5 hover:bg-indigo-500/20 transition-colors border border-white/10 active:scale-95">
                    <Bell size={20} className="text-slate-300" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
                </button>

                <div className="relative ml-4 pl-4 border-l border-white/10">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center space-x-3 text-left hover:bg-white/5 p-2 rounded-xl transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border-2 border-indigo-400 shadow-lg cursor-pointer">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="hidden sm:block cursor-pointer">
                            <p className="text-sm font-semibold text-white leading-tight">{user?.name}</p>
                            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                        </div>
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute right-0 top-16 w-56 bg-slate-800 border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden"
                            >
                                <div className="px-4 py-3 border-b border-white/5 mb-2">
                                    <p className="text-sm font-semibold text-white">{user?.name}</p>
                                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                                </div>

                                <button className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-white/5 text-slate-300 hover:text-white transition-colors">
                                    <UserCircle size={16} /><span>My Profile</span>
                                </button>
                                <button className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-white/5 text-slate-300 hover:text-white transition-colors">
                                    <Settings size={16} /><span>Settings</span>
                                </button>

                                <div className="border-t border-white/5 mt-2 pt-2">
                                    <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-rose-500/10 text-rose-400 transition-colors">
                                        <LogOut size={16} /><span>Sign out</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
