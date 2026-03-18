import React, { useState } from 'react';
import { useDepartment } from '../context/DepartmentContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AdminDashboard = () => {
    const { currentDepartment, departments } = useDepartment();
    const { students, staff, announcements, addAnnouncement } = useData();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', department: 'All' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addAnnouncement(formData);
        addToast('Announcement posted successfully.', 'success');
        setFormData({ title: '', department: 'All' });
        setIsModalOpen(false);
    };

    const filteredAnnouncements = announcements.filter(a => a.department === 'All' || a.department === currentDepartment);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400">
                    Admin Overview
                </h2>
                <span className="text-slate-400">System metrics for {currentDepartment}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.button
                    onClick={() => navigate('/admin/students')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glassmorphism p-6 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-emerald-500/30"
                >
                    <span className="text-slate-400 font-medium">Total Students</span>
                    <span className="text-4xl font-bold text-white">{students.length + 1243}</span>
                    <span className="text-sm text-emerald-400">Click to manage</span>
                </motion.button>

                <motion.button
                    onClick={() => navigate('/admin/staff')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glassmorphism p-6 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-indigo-500/30"
                >
                    <span className="text-slate-400 font-medium">Total Staff</span>
                    <span className="text-4xl font-bold text-white">{staff.length + 140}</span>
                    <span className="text-sm text-indigo-400">Click to manage</span>
                </motion.button>

                <motion.div
                    className="glassmorphism p-6 rounded-2xl flex flex-col items-center justify-center space-y-2"
                >
                    <span className="text-slate-400 font-medium">Avg Attendance</span>
                    <span className="text-4xl font-bold text-white">89%</span>
                    <span className="text-sm text-rose-400">-1% this month</span>
                </motion.div>
            </div>

            <div className="glassmorphism p-8 rounded-2xl mt-8 relative group">
                <h3 className="text-xl font-semibold mb-6 text-emerald-300">Recent System Announcements</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-8 right-8 text-sm bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white transition-colors active:scale-95 shadow-lg shadow-indigo-500/20"
                >
                    + New Announcement
                </button>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence>
                        {filteredAnnouncements.map((ann, idx) => (
                            <motion.div
                                key={ann.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-4 bg-slate-800/50 rounded-xl border border-white/5 cursor-pointer hover:bg-slate-700/50 transition-colors relative"
                            >
                                <p className="font-medium text-white">{ann.title} {ann.department !== 'All' && <span className="text-xs ml-2 bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">{ann.department}</span>}</p>
                                <p className="text-xs text-slate-500 mt-1">{ann.time}</p>
                            </motion.div>
                        ))}
                        {filteredAnnouncements.length === 0 && (
                            <p className="text-slate-500 text-center py-4">No announcements for this department.</p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Announcement Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glassmorphism p-8 rounded-2xl w-full max-w-md relative">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20} /></button>
                            <h3 className="text-xl font-bold text-white mb-6">Create Announcement</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Announcement Message</label>
                                    <textarea required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} rows={3} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 resize-none placeholder:text-slate-600" placeholder="Type here..." />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Target Audience</label>
                                    <select value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500">
                                        <option value="All">All Departments</option>
                                        {departments.map(dept => <option key={dept} value={dept}>{dept} Only</option>)}
                                    </select>
                                </div>
                                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition-colors mt-4 shadow-lg">Post Announcement</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AdminDashboard;
