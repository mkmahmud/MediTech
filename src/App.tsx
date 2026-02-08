import   { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { ThemeInitializer } from './components/ThemeInitializer';
import { LoadingScreen } from './components/LoadingScreen';
 
// --- Layouts ---
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));

// --- Pages ---
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const DashboardOverview = lazy(() => import('./pages/Dashboard/Overview'));
const Patients = lazy(() => import('./pages/Dashboard/Patients'));
const Appointments = lazy(() => import('./pages/Dashboard/Appointments'));
const Settings = lazy(() => import('./pages/Dashboard/Settings'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const NotFound = lazy(() => import('./pages/NOtfound'));

function App() {
  return (
    <>
      <ThemeInitializer />
      {/* The fallback is what shows while the lazy components are downloading */}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Auth Layout */}
          <Route path="/auth/*" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Public routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="patients" element={<Patients />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;