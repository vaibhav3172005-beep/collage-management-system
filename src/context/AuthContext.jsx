import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    // Check active sessions and sets the user
    useEffect(() => {
        const getSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (session) {
                // Fetch extra user details from staff/students tables
                fetchUserDetails(session.user);
            } else {
                setLoading(false);
            }
        };

        getSession();

        // Listen for changes on auth state (sign in, sign out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session) {
                    fetchUserDetails(session.user);
                } else {
                    setUser(null);
                    setLoading(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserDetails = async (authUser) => {
        try {
            // Priority check for Admin Bypass!
            const authRole = authUser.user_metadata?.role;
            const institutionalId = authUser.user_metadata?.institutional_id;

            if (authRole === 'admin' || (institutionalId && institutionalId.toUpperCase().startsWith('ADM'))) {
                setUser({ ...authUser, role: 'admin', name: authUser.user_metadata?.full_name || 'System Administrator', department: 'All' });
                return;
            }

            // Check student table first
            let { data: studentData, error: studentError } = await supabase
                .from('students')
                .select('*')
                .eq('name', authUser.user_metadata?.full_name || '')
                .maybeSingle();

            if (studentData) {
                setUser({ ...authUser, role: 'student', ...studentData });
                return;
            }

            // Check staff table next
            let { data: staffData, error: staffError } = await supabase
                .from('staff')
                .select('*')
                .eq('name', authUser.user_metadata?.full_name || '')
                .maybeSingle();

            if (staffData) {
                // Determine if admin or regular staff based on role
                const isSystemAdmin = staffData.role.toLowerCase().includes('admin');
                setUser({ ...authUser, ...staffData, role: isSystemAdmin ? 'admin' : 'staff' });
                return;
            }

            // Fallback if not found in custom tables but exists in auth
            setUser({ ...authUser, role: authRole || 'student', name: authUser.user_metadata?.full_name || authUser.email, department: authUser.user_metadata?.department || 'N/A' });
        } catch (error) {
            console.error("Error fetching user details (Schema/RLS):", error);
            // DO NOT fail the login just because tables are locked! Use the auth metadata provided during signup instead.
            const backupRole = authUser.user_metadata?.role || 'student';
            const backupName = authUser.user_metadata?.full_name || authUser.email;
            setUser({ ...authUser, role: backupRole, name: backupName, department: authUser.user_metadata?.department || 'N/A' });
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: userData.email, // This is the generated pseudo-email
                password: userData.password,
                options: {
                    data: {
                        full_name: userData.fullName,
                        role: userData.role,
                        department: userData.department,
                        institutional_id: userData.institutionalId
                    }
                }
            });

            if (error) throw error;

            // Also insert them into our custom tables
            if (userData.role === 'student') {
                await supabase.from('students').insert([
                    {
                        name: userData.fullName,
                        year: 'Year 1',
                        department: userData.department,
                        status: 'Active',
                        // Note: If you add an institutional_id column to the students table later, map it here.
                    }
                ]);
            } else {
                await supabase.from('staff').insert([
                    {
                        name: userData.fullName,
                        role: userData.role === 'admin' ? 'System Administrator' : 'Faculty',
                        department: userData.department,
                        // Note: If you add an institutional_id column to the staff table later, map it here.
                    }
                ]);
            }

            showToast("Registration successful!", "success");
            return { success: true };
        } catch (error) {
            showToast(error.message, "error");
            return { success: false, error };
        }
    };

    const login = async (email, password) => {
        try {
            console.log("Attempting to login with", email);
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            showToast("Successfully logged in", "success");
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            showToast(error.message, "error");
            return { success: false, error };
        }
    };

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
            showToast("Logged out successfully", "success");
        } catch (error) {
            console.error("Logout error:", error);
            showToast(error.message, "error");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
