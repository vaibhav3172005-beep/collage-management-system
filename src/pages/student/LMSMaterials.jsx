import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDepartment } from '../../context/DepartmentContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { FileText, Video, Download, Search, Briefcase, BookOpen } from 'lucide-react';

const LMSMaterials = () => {
    const { currentDepartment } = useDepartment();
    const { materials } = useData();
    const { addToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');

    const deptMaterials = materials.filter(m => m.department === currentDepartment);

    const filteredMaterials = deptMaterials.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.uploader.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDownload = (title) => {
        addToast(`Downloading ${title}...`, 'info');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-6xl mx-auto"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400 flex items-center">
                        <BookOpen className="mr-3" size={32} />
                        LMS & Study Materials
                    </h2>
                    <p className="text-slate-400 mt-2">Access all course resources for the {currentDepartment} department.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search materials..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-64 bg-slate-800 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <AnimatePresence>
                    {filteredMaterials.map((mat, idx) => (
                        <motion.div
                            key={mat.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                            className="glassmorphism p-6 rounded-2xl flex flex-col justify-between border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                {mat.type === 'PDF' ? <FileText size={120} /> : <Video size={120} />}
                            </div>

                            <div>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${mat.type === 'PDF' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {mat.type === 'PDF' ? <FileText size={24} /> : <Video size={24} />}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">{mat.title}</h3>
                                <div className="flex items-center text-sm text-slate-400 mb-6">
                                    <Briefcase size={14} className="mr-1.5" />
                                    <span>{mat.uploader}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                <span className="text-xs text-slate-500">{mat.date}</span>
                                <button
                                    onClick={() => handleDownload(mat.title)}
                                    className="flex items-center space-x-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors active:scale-95"
                                >
                                    <span>Download</span>
                                    <Download size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {filteredMaterials.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500">
                            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                            <p className="text-lg">No study materials found.</p>
                            <p className="text-sm">Try adjusting your search or check back later.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default LMSMaterials;
