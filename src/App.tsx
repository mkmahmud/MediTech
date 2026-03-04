import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { ThemeInitializer } from './components/ThemeInitializer';
import { LoadingScreen } from './components/LoadingScreen';

import { Toaster } from 'sonner';
import { useAuth } from './hooks/auth/useAuth';
import { useAuthStore } from './stores/auth/useAuthStore';
import { ProtectedRoute, PublicRoute } from './components/auth/AuthGuards';

// --- Layouts ---
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));

// --- Pages ---
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Doctors = lazy(() => import('./pages/Doctors/Doctors'));
const Services = lazy(() => import('./pages/Services/Services'));
const AppointmentBooking = lazy(() => import('./pages/Appointment/Appointment'));
const BookAppointment = lazy(() => import('./pages/Appointment/BookAppointment/BookAppointment'));

// Dashboard Pages
const DashboardOverview = lazy(() => import('./pages/Dashboard/Overview'));
const Patients = lazy(() => import('./pages/Dashboard/Patients'));
const Settings = lazy(() => import('./pages/Dashboard/Settings'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const NotFound = lazy(() => import('./pages/NOtfound'));

// Dashboard ~ Appointments Pages
const Appointments = lazy(() => import('./pages/Dashboard/Appointments/Appointments'));
const AppointmentDetails = lazy(() => import('./pages/Dashboard/Appointments/Details/Details'));


// Dashboard Admin Pages
const AddUser = lazy(() => import('./pages/Dashboard/Admin/Add-user/Add-user'));

// Dashboard Doctor Page
const ManageAvailability = lazy(() => import('./pages/Dashboard/Doctor/Manage-availability/ManageAvailability'));

// Common Dashboard Pages
const Profile = lazy(() => import('./pages/Dashboard/profile/Profile'));




function App() {
  const { refresh, setupTokenExpirationListener } = useAuth();
  const setInitialized = useAuthStore((s) => s.setInitialized);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  // Auto Logout on token expiration
  useEffect(() => {
    const bootstrap = async () => {
      const rt = localStorage.getItem('medi_rt_key');

      if (rt) {
        try {
          await refresh();

          // Setup token expiration listener for restored session
          const { accessToken } = useAuthStore.getState();
          if (accessToken) {
            setupTokenExpirationListener(accessToken);
          }
        } catch (e) {
          console.error("Session restoration failed", e);
        }
      }

      setInitialized(true);
    };

    bootstrap();
  }, [refresh, setupTokenExpirationListener, setInitialized]);


  if (!isInitialized) return <LoadingScreen />;


  return (
    <>
      <ThemeInitializer />
      <Toaster richColors position="top-center" />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Auth Layout */}
          <Route element={<PublicRoute />}>
            <Route path="/auth/*" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Route>

          {/* Public routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/appointment" element={<AppointmentBooking />} />
            <Route path="/appointment/:id" element={<BookAppointment />} />
          </Route>

          {/* Dashboard routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="patients" element={<Patients />} />
              <Route path="settings" element={<Settings />} />

              {/* Appointments */}
              <Route path="appointments" element={<Appointments />} />
              <Route path="appointments/:id" element={<AppointmentDetails />} />


              {/* Admin Pages */}
              <Route path="add-users" element={<AddUser />} />

              {/* Doctor Pages */}
              <Route path="manage-availability" element={<ManageAvailability />} />


              {/* Common Dashboard Pages */}
              <Route path='profile' element={<Profile />} />
            </Route>
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;