
import { Route, Routes } from 'react-router'
import './App.css'
import { ThemeInitializer } from './components/ThemeInitializer'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import DashboardOverview from './pages/Dashboard/Overview'
import Patients from './pages/Dashboard/Patients'
import Appointments from './pages/Dashboard/Appointments'
import Settings from './pages/Dashboard/Settings'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

function App() {
  return (
    <>
      <ThemeInitializer />
      <Routes>

        {/* Auth Layout */}
        <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Public routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Dashboard routes with DashboardLayout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
