import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDepartment } from '../../context/DepartmentContext';
import { useToast } from '../../context/ToastContext';
import { FileText, GraduationCap, FileBadge, ArrowRight, CheckCircle2 } from 'lucide-react';

const DocumentRequests = () => {
    const { currentDepartment } = useDepartment();
    const { addToast } = useToast();
    const [requestedDocs, setRequestedDocs] = useState([]);

    const documents = [
        { id: 1, name: 'Bonafide Certificate', icon: FileText, desc: 'Official proof that you are a student of this college.' },
        { id: 2, name: 'Transcripts', icon: FileText, desc: 'Official record of all your marks and grades.' },
        { id: 3, name: 'Degree Certificate', icon: GraduationCap, desc: 'Final degree certificate upon graduation.' },
        { id: 4, name: 'Leaving Certificate (TC)', icon: FileBadge, desc: 'Required when leaving the college or finishing studies.' },
        { id: 5, name: 'Character Certificate', icon: FileText, desc: 'Certificate stating your behavior and conduct.' },
        { id: 6, name: 'Migration Certificate', icon: FileBadge, desc: 'Used to migrate to another university.' }
    ];

    const handleRequest = (doc) => {
        if (!requestedDocs.includes(doc.id)) {
            setRequestedDocs([...requestedDocs, doc.id]);
            addToast(`Successfully submitted request for ${doc.name} to the ${currentDepartment} department.`, 'success');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-5xl mx-auto"
        >
            <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400">
                    Document Requests
                </h2>
                <p className="text-slate-400 mt-2">Request official college documents, certificates, and transcripts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc, idx) => {
                    const isRequested = requestedDocs.includes(doc.id);
                    return (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glassmorphism p-6 rounded-2xl flex flex-col justify-between border border-white/5 hover:border-white/10 transition-all group"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <doc.icon size={24} className="text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{doc.name}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed mb-6">{doc.desc}</p>
                            </div>

                            <button
                                onClick={() => handleRequest(doc)}
                                disabled={isRequested}
                                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all ${isRequested
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95'
                                    }`}
                            >
                                {isRequested ? (
                                    <>
                                        <CheckCircle2 size={18} />
                                        <span>Requested</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Apply Now</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default DocumentRequests;
