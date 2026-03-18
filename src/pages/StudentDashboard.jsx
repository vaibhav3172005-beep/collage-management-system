import React from 'react';
import { useDepartment } from '../context/DepartmentContext';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, FileText, Video, Download } from 'lucide-react';

const StudentDashboard = () => {
    const { currentDepartment } = useDepartment();
    const { addToast } = useToast();
    const { announcements, materials } = useData();

    const handleDocumentRequest = (docName) => {
        addToast(`Request for ${docName} submitted successfully to the ${currentDepartment} department.`, 'success');
    };

    const filteredAnnouncements = announcements.filter(a => a.department === 'All' || a.department === currentDepartment);
    const deptMaterials = materials.filter(m => m.department === currentDepartment);

    const handleDownload = (title) => {
        addToast(`Downloading ${title}...`, 'info');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400">
                    Student Dashboard
                </h2>
                <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-500/30">
                    {currentDepartment} Sem-3
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Attendance Ring Box */}
                <div className="glassmorphism p-8 rounded-2xl flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold mb-6 w-full text-left text-emerald-400">Overall Attendance</h3>
                    <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                            <motion.circle
                                initial={{ strokeDashoffset: 440 }}
                                animate={{ strokeDashoffset: 440 - (440 * 85) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440"
                                className="text-emerald-500"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-4xl font-bold">85%</span>
                            <span className="text-xs text-slate-400">Good</span>
                        </div>
                    </div>
                </div>

                <div className="glassmorphism p-6 rounded-2xl flex flex-col space-y-4 lg:col-span-2">
                    <h3 className="text-lg font-semibold text-indigo-400 flex items-center">
                        <Bell className="mr-2" size={20} /> Notifications & Announcements
                    </h3>
                    <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence>
                            {filteredAnnouncements.map((ann, idx) => (
                                <motion.div
                                    key={ann.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-3 bg-slate-800/50 rounded-xl border border-white/5 border-l-4 border-l-indigo-500"
                                >
                                    <p className="font-medium text-white text-sm">{ann.title} {ann.department !== 'All' && <span className="text-[10px] ml-2 bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded uppercase">{ann.department}</span>}</p>
                                    <p className="text-xs text-slate-500 mt-1">{ann.time}</p>
                                </motion.div>
                            ))}
                            {filteredAnnouncements.length === 0 && (
                                <p className="text-slate-500 text-sm py-2">No new announcements.</p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glassmorphism p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-4">Study Materials</h3>
                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence>
                            {deptMaterials.map((mat, idx) => (
                                <motion.div
                                    key={mat.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors group"
                                >
                                    <div className="flex items-center space-x-3">
                                        {mat.type === 'PDF' ? <FileText size={20} className="text-rose-400" /> : <Video size={20} className="text-blue-400" />}
                                        <div>
                                            <p className="font-medium text-white text-sm">{mat.title}</p>
                                            <p className="text-xs text-slate-400">By {mat.uploader}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDownload(mat.title)} className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-500 hover:text-white">
                                        <Download size={16} />
                                    </button>
                                </motion.div>
                            ))}
                            {deptMaterials.length === 0 && (
                                <p className="text-slate-500 text-sm py-2">No materials uploaded yet for your department.</p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="glassmorphism p-6 rounded-2xl flex flex-col space-y-4">
                    <h3 className="text-lg font-semibold text-emerald-400">Document Requests</h3>
                    <p className="text-sm text-slate-400 mb-2">Apply for official college documents with a single click.</p>

                    <button
                        onClick={() => handleDocumentRequest('Bonafide Certificate')}
                        className="flex justify-between items-center p-4 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-white/5 transition-all group active:scale-95"
                    >
                        <span className="font-medium group-hover:text-indigo-400 transition-colors">Bonafide Certificate</span>
                        <span className="text-xs bg-indigo-600 px-3 py-1.5 rounded-lg text-white group-hover:bg-indigo-500 font-medium">Apply Now</span>
                    </button>

                    <button
                        onClick={() => handleDocumentRequest('Transcripts')}
                        className="flex justify-between items-center p-4 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-white/5 transition-all group active:scale-95"
                    >
                        <span className="font-medium group-hover:text-indigo-400 transition-colors">Transcripts</span>
                        <span className="text-xs bg-indigo-600 px-3 py-1.5 rounded-lg text-white group-hover:bg-indigo-500 font-medium">Apply Now</span>
                    </button>
                </div>
            </div>

        </motion.div>
    );
};

export default StudentDashboard;
