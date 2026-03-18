import React, { useState } from 'react';
import { useDepartment } from '../context/DepartmentContext';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Video, UploadCloud } from 'lucide-react';

const StaffDashboard = () => {
    const { currentDepartment } = useDepartment();
    const { addToast } = useToast();
    const { materials, addMaterial } = useData();
    const { user } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', type: 'PDF' });

    const handleAction = (action) => {
        addToast(`${action} action triggered successfully.`, 'success');
    };

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        addMaterial({
            title: formData.title,
            type: formData.type,
            department: currentDepartment,
            uploader: user?.name || 'Faculty Member'
        });
        addToast(`Successfully uploaded ${formData.type}: ${formData.title}`, 'success');
        setFormData({ title: '', type: 'PDF' });
        setIsModalOpen(false);
    };

    const deptMaterials = materials.filter(m => m.department === currentDepartment);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-indigo-400">
                    Faculty Portal
                </h2>
                <span className="text-slate-400">Managing: {currentDepartment}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="glassmorphism p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-400">Today's Lectures</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                            <span>Data Structures (BCA-3)</span>
                            <button onClick={() => handleAction("Mark Data Structures Presenty")} className="text-sm bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded transition-colors text-white active:scale-95">Mark Presenty</button>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                            <span>Algorithms (BCA-2)</span>
                            <button onClick={() => handleAction("Mark Algorithms Presenty")} className="text-sm bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded transition-colors text-white active:scale-95">Mark Presenty</button>
                        </li>
                    </ul>
                </div>

                <div className="glassmorphism p-6 rounded-2xl flex flex-col justify-center">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-400">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setIsModalOpen(true)} className="p-4 bg-slate-800/50 hover:bg-slate-700 rounded-xl border border-white/5 transition-colors text-center active:scale-95 flex flex-col items-center justify-center space-y-2 group">
                            <UploadCloud size={24} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                            <span>Upload Material</span>
                        </button>
                        <button onClick={() => handleAction("Enter Marks Portal")} className="p-4 bg-slate-800/50 hover:bg-slate-700 rounded-xl border border-white/5 transition-colors text-center active:scale-95 flex flex-col items-center justify-center space-y-2">
                            <span className="text-xl font-bold text-indigo-400">A+</span>
                            <span>Enter Marks</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="glassmorphism p-8 rounded-2xl relative group">
                <h3 className="text-xl font-semibold mb-6 text-emerald-300">Recently Uploaded Materials ({currentDepartment})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence>
                        {deptMaterials.map((mat, idx) => (
                            <motion.div
                                key={mat.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-4 bg-slate-800/50 rounded-xl border border-white/5 flex items-start space-x-4 hover:bg-slate-700/50 transition-colors"
                            >
                                <div className="mt-1">
                                    {mat.type === 'PDF' ? <FileText size={24} className="text-rose-400" /> : <Video size={24} className="text-blue-400" />}
                                </div>
                                <div>
                                    <p className="font-medium text-white">{mat.title}</p>
                                    <p className="text-xs text-slate-400 mt-1">Uploaded by {mat.uploader} on {mat.date}</p>
                                </div>
                            </motion.div>
                        ))}
                        {deptMaterials.length === 0 && (
                            <p className="text-slate-500 text-center py-4 col-span-2">No materials uploaded yet for this department.</p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glassmorphism p-8 rounded-2xl w-full max-w-md relative border border-white/10 shadow-2xl">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center"><UploadCloud className="mr-2 text-emerald-400" /> Upload Study Material</h3>

                            <form onSubmit={handleUploadSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Material Title</label>
                                    <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 placeholder:text-slate-600" placeholder="e.g. Chapter 1 Notes" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Material Type</label>
                                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500">
                                        <option value="PDF">PDF Document</option>
                                        <option value="Video">Video Lecture</option>
                                        <option value="Assignment">Assignment File</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">File Attachment (Simulated)</label>
                                    <div className="w-full border-2 border-dashed border-white/20 rounded-xl p-6 text-center text-slate-500 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer bg-slate-900/30">
                                        <p className="text-sm">Click or drag file here</p>
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition-colors mt-6 shadow-lg">Upload to {currentDepartment}</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default StaffDashboard;
