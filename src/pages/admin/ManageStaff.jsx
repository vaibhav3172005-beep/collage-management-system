import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useDepartment } from '../../context/DepartmentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const ManageStaff = () => {
    const { staff, addStaff } = useData();
    const { departments } = useDepartment();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', role: '', department: departments[0] });

    const handleSubmit = (e) => {
        e.preventDefault();
        addStaff(formData);
        setFormData({ name: '', role: '', department: departments[0] });
        setIsModalOpen(false);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-indigo-400">Manage Staff</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors">
                    <Plus size={18} /> <span>Add New Staff</span>
                </button>
            </div>

            <div className="glassmorphism rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-slate-300">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Department</th>
                            <th className="p-4">ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {staff.map((member) => (
                                <motion.tr
                                    key={member.id}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <td className="p-4 text-white font-medium">{member.name}</td>
                                    <td className="p-4 text-slate-400">{member.role}</td>
                                    <td className="p-4 text-emerald-400">{member.department}</td>
                                    <td className="p-4 text-slate-500">#{member.id}</td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glassmorphism p-8 rounded-2xl w-full max-w-md relative">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20} /></button>
                            <h3 className="text-xl font-bold text-white mb-6">Add New Staff Member</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Full Name</label>
                                    <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Role / Designation</label>
                                    <input required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Department</label>
                                    <select required value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500">
                                        {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                    </select>
                                </div>
                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors mt-4">Save Staff Member</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ManageStaff;
