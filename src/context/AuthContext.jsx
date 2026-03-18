import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // We start with NO user so the login screen shows
    const [user, setUser] = useState(null);

    // In a real app, this would be an API call to register
    const register = (userData) => {
        // Simulated successful registration
        console.log("Registered:", userData);
        setUser({
            role: userData.role,
            name: userData.fullName,
            email: userData.email,
            department: userData.department
        });
    };

    const login = (email, password) => {
        // Simulated login logic
        if (email.includes('admin')) {
            setUser({ role: 'admin', name: 'System Admin', email });
        } else if (email.includes('staff')) {
            setUser({ role: 'staff', name: 'Prof. Faculty', email });
        } else {
            setUser({ role: 'student', name: 'Student User', email });
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
