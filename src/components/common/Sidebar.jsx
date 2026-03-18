import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    Settings,
    LogOut,
    CalendarCheck
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const { user, login } = useAuth();
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
    ];

    const links = user?.role === 'admin' ? adminLinks
        : user?.role === 'staff' ? staffLinks
            : studentLinks;

    // Mock Role Switcher for dev demo purposes
    const switchRole = (role) => {
        login(role, role === 'admin' ? 'System Admin' : role === 'staff' ? 'Prof. Smith' : 'Alex Student');
    };

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
                {/* Development Tool: Role Switcher */}
                <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Dev Role Switcher</p>
                    <div className="flex gap-2 text-xs">
                        <button onClick={() => switchRole('admin')} className={`px-2 py-1 rounded ${user?.role === 'admin' ? 'bg-indigo-500' : 'bg-slate-800'}`}>Admin</button>
                        <button onClick={() => switchRole('staff')} className={`px-2 py-1 rounded ${user?.role === 'staff' ? 'bg-indigo-500' : 'bg-slate-800'}`}>Staff</button>
                        <button onClick={() => switchRole('student')} className={`px-2 py-1 rounded ${user?.role === 'student' ? 'bg-indigo-500' : 'bg-slate-800'}`}>Student</button>
                    </div>
                </div>

                <button className="flex items-center space-x-3 w-full p-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
