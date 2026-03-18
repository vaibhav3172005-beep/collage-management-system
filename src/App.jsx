import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DepartmentProvider } from './context/DepartmentContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';

import Sidebar from './components/common/Sidebar';
import Topbar from './components/common/Topbar';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ManageStaff from './pages/admin/ManageStaff';
import StaffDashboard from './pages/StaffDashboard';
import StudentDashboard from './pages/StudentDashboard';

import DocumentRequests from './pages/student/DocumentRequests';
import LMSMaterials from './pages/student/LMSMaterials';
import FeesAdmissions from './pages/student/FeesAdmissions';

const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

const RoleBasedRouter = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/home" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/admin" element={user.role === 'admin' ? <AdminDashboard /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/admin/staff" element={user.role === 'admin' ? <ManageStaff /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/admin/*" element={<Navigate to="/admin" />} />

        <Route path="/staff/*" element={user.role === 'staff' ? <StaffDashboard /> : <Navigate to={`/${user.role}`} />} />

        <Route path="/student" element={user.role === 'student' ? <StudentDashboard /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/student/documents" element={user.role === 'student' ? <DocumentRequests /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/student/lms" element={user.role === 'student' ? <LMSMaterials /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/student/fees" element={user.role === 'student' ? <FeesAdmissions /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/student/*" element={<Navigate to="/student" />} />

        <Route path="*" element={<Navigate to={`/${user.role}`} />} />
      </Routes>
    </AppLayout>
  );
};

function App() {
  return (
    <ToastProvider>
      <DataProvider>
        <AuthProvider>
          <DepartmentProvider>
            <Router>
              <RoleBasedRouter />
            </Router>
          </DepartmentProvider>
        </AuthProvider>
      </DataProvider>
    </ToastProvider>
  );
}

export default App;
