import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [staff, setStaff] = useState([
        { id: 1, name: 'Dr. Alan Turing', role: 'Professor', department: 'Data Science' },
        { id: 2, name: 'Prof. Grace Hopper', role: 'HOD', department: 'BCA' }
    ]);

    const [students, setStudents] = useState([
        { id: 101, name: 'Alice Smith', year: 'Year 2', department: 'BCA', status: 'Active' },
        { id: 102, name: 'Bob Jones', year: 'Year 1', department: 'BBA', status: 'Active' }
    ]);

    const [policies, setPolicies] = useState([
        { id: 1, title: 'Attendance Requirement', description: '75% mandatory attendance to sit for exams.', date: '2023-08-01' }
    ]);

    const [announcements, setAnnouncements] = useState([
        { id: 1, title: 'Mid-term schedule released', department: 'All', time: '2 hours ago' },
        { id: 2, title: 'System Maintenance Scheduled', department: 'All', time: '1 day ago' }
    ]);

    const [materials, setMaterials] = useState([
        { id: 1, title: 'React JS Fundamentals', type: 'PDF', department: 'BCA', uploader: 'Prof. Grace Hopper', date: '2023-11-01' },
        { id: 2, title: 'Data Structures Visualizer', type: 'Video', department: 'Data Science', uploader: 'Dr. Alan Turing', date: '2023-10-15' }
    ]);

    const addStaff = (newStaff) => setStaff(prev => [...prev, { id: Date.now(), ...newStaff }]);
    const addStudent = (newStudent) => setStudents(prev => [...prev, { id: Date.now(), ...newStudent }]);
    const addPolicy = (newPolicy) => setPolicies(prev => [...prev, { id: Date.now(), date: new Date().toISOString().split('T')[0], ...newPolicy }]);
    const addAnnouncement = (newAnn) => setAnnouncements(prev => [{ id: Date.now(), time: 'Just now', ...newAnn }, ...prev]);
    const addMaterial = (newMat) => setMaterials(prev => [{ id: Date.now(), date: new Date().toISOString().split('T')[0], ...newMat }, ...prev]);

    return (
        <DataContext.Provider value={{
            staff, addStaff,
            students, addStudent,
            policies, addPolicy,
            announcements, addAnnouncement,
            materials, addMaterial
        }}>
            {children}
        </DataContext.Provider>
    );
};
