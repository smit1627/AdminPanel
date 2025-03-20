import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Users from './pages/Users/Users'
import AdminLayout from './layouts/AdminLayout'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Reports from './pages/Reports/Reports'
import Utility from './pages/Utility/Utility'
import Centers from './pages/Centers/Centers'
import Programs from './pages/Programs/Programs'


const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
            <Route path="utility" element={<Utility />} />
            <Route path="centers" element={<Centers />} />
            <Route path="programs" element={<Programs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
