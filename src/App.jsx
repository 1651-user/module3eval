import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import UpdateRestaurant from './pages/UpdateRestaurant';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <RestaurantProvider>
                <Router>
                    <Routes>
                        {/* Public Route */}
                        <Route path="/" element={<Login />} />

                        {/* Admin Routes - Protected */}
                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute allowedRole="admin">
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/restaurants/update/:id"
                            element={
                                <ProtectedRoute allowedRole="admin">
                                    <UpdateRestaurant />
                                </ProtectedRoute>
                            }
                        />

                        {/* Customer Routes - Protected */}
                        <Route
                            path="/customers/dashboard"
                            element={
                                <ProtectedRoute allowedRole="customer">
                                    <CustomerDashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* Fallback Route */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Router>
            </RestaurantProvider>
        </AuthProvider>
    );
}

export default App;
