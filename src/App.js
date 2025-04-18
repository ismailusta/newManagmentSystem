import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import './utils/axiosConfig';
import AdminSidebar from './components/AdminSidebar';
import ManagerSidebar from './components/ManagerSidebar';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import ResidentDashboard from './components/ResidentDashboard';
import ApartmentList from './components/ApartmentList';
import FlatList from './components/FlatList';
import ManagerFlatList from './components/ManagerFlatList';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import DueList from './components/DueList';
import ManagerDues from './components/ManagerDues';
import ExpenseList from './components/ExpenseList';
import EmployeeList from './components/EmployeeList';
import UserList from './components/UserList';
import ManagerUserList from './components/ManagerUserList';
import { DuesProvider } from './context/DuesContext';
import ComplaintList from './components/ComplaintList';
import ProfileList from './components/ProfileList';
import AnnouncementList from './components/AnnouncementList';
import FeedbackList from './components/FeedbackList';
import ServiceList from './components/ServiceList';
import RuleList from './components/RuleList';
import MailForm from './components/MailForm';
import ManagerExpenses from './components/ManagerExpenses';
import { Toaster } from 'react-hot-toast';
import ManagerEmployeeList from './components/ManagerEmployeeList';
import ManagerAnnouncements from './components/ManagerAnnouncements';
import LogList from './components/LogList';

function App() {
    const [drawerOpen, setDrawerOpen] = useState(true);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    // Rol bazlı sidebar seçimi
    const SidebarRouter = () => {
        const userRole = localStorage.getItem('userRole');

        switch (userRole) {
            case 'admin':
                return <AdminSidebar open={drawerOpen} onDrawerToggle={handleDrawerToggle} />;
            case 'manager':
                return <ManagerSidebar open={drawerOpen} onDrawerToggle={handleDrawerToggle} />;
            case 'resident':
                return null; // ResidentSidebar'ı daha sonra ekleyeceğiz
            default:
                return null;
        }
    };

    // Rol bazlı dashboard yönlendirmesi
    const DashboardRouter = () => {
        const userRole = localStorage.getItem('userRole');

        switch (userRole) {
            case 'admin':
                return <AdminDashboard />;
            case 'manager':
                return <ManagerDashboard />;
            case 'resident':
                return <ResidentDashboard />;
            default:
                return <Navigate to="/login" />;
        }
    };

    // Rol bazlı flat list yönlendirmesi
    const FlatListRouter = () => {
        const userRole = localStorage.getItem('userRole');

        switch (userRole) {
            case 'admin':
                return <FlatList />;
            case 'manager':
                return <ManagerFlatList />;
            case 'resident':
                return null; // ResidentFlatList'i daha sonra ekleyeceğiz
            default:
                return <Navigate to="/login" />;
        }
    };

    // Rol bazlı user list yönlendirmesi
    const UserListRouter = () => {
        const userRole = localStorage.getItem('userRole');

        switch (userRole) {
            case 'admin':
                return <UserList />;
            case 'manager':
                return <ManagerUserList />;
            default:
                return <Navigate to="/login" />;
        }
    };

    // Rol bazlı dues list yönlendirmesi
    const DuesListRouter = () => {
        const userRole = localStorage.getItem('userRole');

        switch (userRole) {
            case 'admin':
                return <DueList />;
            case 'manager':
                return <ManagerDues />;
            default:
                return <Navigate to="/login" />;
        }
    };

    // Rol bazlı expense list yönlendirmesi
    const ExpenseListRouter = () => {
        const userRole = localStorage.getItem('userRole');

        switch (userRole) {
            case 'admin':
                return <ExpenseList />;
            case 'manager':
                return <ManagerExpenses />;
            default:
                return <Navigate to="/login" />;
        }
    };

    // Rol bazlı employee list yönlendirmesi
    const EmployeeListRouter = () => {
        const userRole = localStorage.getItem('userRole');

        switch (userRole) {
            case 'admin':
                return <EmployeeList />;
            case 'manager':
                return <ManagerEmployeeList />;
            default:
                return <Navigate to="/login" />;
        }
    };

    // Rol bazlı announcement list yönlendirmesi
    const AnnouncementListRouter = () => {
        const userRole = localStorage.getItem('userRole');

        switch (userRole) {
            case 'admin':
                return <AnnouncementList />;
            case 'manager':
                return <ManagerAnnouncements />;
            default:
                return <Navigate to="/login" />;
        }
    };

    return (
        <DuesProvider>
            <Toaster position="top-right" />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <DashboardRouter />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/apartments" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <ApartmentList />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/flats" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <FlatListRouter />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/users" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <UserListRouter />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/dues" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <DuesListRouter />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/expenses" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <ExpenseListRouter />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/employees" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <EmployeeListRouter />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/profiles" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <ProfileList />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/complaints" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <ComplaintList />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/announcements" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <AnnouncementListRouter />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/feedbacks" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <FeedbackList />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/services" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <ServiceList />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/rules" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <RuleList />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/mails" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <MailForm />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/logs" element={
                        <ProtectedRoute>
                            <>
                                <SidebarRouter />
                                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? '280px' : '0px'})` }, marginTop: '64px' }}>
                                    <LogList />
                                </Box>
                            </>
                        </ProtectedRoute>
                    } />
                </Routes>
            </Box>
        </DuesProvider>
    );
}

export default App;
