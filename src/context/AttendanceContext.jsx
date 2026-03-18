import React, { createContext, useContext, useState } from 'react';

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
    // Mock State: Array of daily attendance records
    // Format: { date: '2023-10-25', dept: 'BCA', presentCount: 45, totalCount: 50 }
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    // Student specific mock data
    const [studentMonthlyPercentage, setStudentMonthlyPercentage] = useState(85);

    const markAttendance = (date, dept, presentCount, totalCount) => {
        const newRecord = { id: Date.now(), date, dept, presentCount, totalCount };
        setAttendanceRecords(prev => [...prev, newRecord]);

        // Simulate API delay, UI can show Toast Notifications
        return new Promise(resolve => setTimeout(() => resolve(newRecord), 1000));
    };

    const getAttendanceForDept = (dept) => {
        return attendanceRecords.filter(record => record.dept === dept);
    };

    return (
        <AttendanceContext.Provider value={{
            attendanceRecords,
            markAttendance,
            getAttendanceForDept,
            studentMonthlyPercentage
        }}>
            {children}
        </AttendanceContext.Provider>
    );
};
