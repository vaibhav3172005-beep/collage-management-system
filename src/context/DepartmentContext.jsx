import React, { createContext, useContext, useState } from 'react';

const DepartmentContext = createContext();

export const useDepartment = () => useContext(DepartmentContext);

export const DepartmentProvider = ({ children }) => {
    const [currentDepartment, setCurrentDepartment] = useState('BCA');

    const departments = [
        'BCA',
        'BBA',
        'B.Sc',
        'B.Com',
        'Data Science',
        'AI-ML'
    ];

    return (
        <DepartmentContext.Provider value={{ currentDepartment, setCurrentDepartment, departments }}>
            {children}
        </DepartmentContext.Provider>
    );
};
