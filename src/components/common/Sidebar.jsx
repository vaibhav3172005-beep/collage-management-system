import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    Settings,
    LogOut,
    CalendarCheck,
    Wallet
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const adminLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Users, label: 'Staff Management', path: '/admin/staff' },
        { icon: FileText, label: 'Financials', path: '/admin/finance' },
    ];

    const staffLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/staff' },
        { icon: CalendarCheck, label: 'Attendance (Presenty)', path: '/staff/attendance' },
        { icon: BookOpen, label: 'Study Materials', path: '/staff/materials' },
        { icon: FileText, label: 'Internal Marks', path: '/staff/marks' },
    ];

    const studentLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/student' },
        { icon: FileText, label: 'Document Requests', path: '/student/documents' },
        { icon: BookOpen, label: 'LMS (Materials)', path: '/student/lms' },
        { icon: Wallet, label: 'Fees & Admissions', path: '/student/fees' },
    ];

    const links = user?.role === 'admin' ? adminLinks
        : user?.role === 'staff' ? staffLinks
            : studentLinks;

    return (
        <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            className="w-64 glassmorphism flex flex-col justify-between"
        >
            <div className="p-6">
                <h1 className="text-2xl font-bold text-emerald-400 mb-8 tracking-wider">
                    COCSIT<span className="text-slate-100 text-sm block font-normal opacity-70">Management</span>
                </h1>

                <nav className="space-y-2">
                    {links.map((item) => {
                        const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === `/${user?.role}`);
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all ${isActive ? 'bg-indigo-600 shadow-lg shadow-indigo-500/30 text-white' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-6 border-t border-white/10">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 w-full p-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all font-medium"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
