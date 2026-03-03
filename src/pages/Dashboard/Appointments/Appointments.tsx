
import { useAuthStore } from "@/stores/auth/useAuthStore";
import Patient from "./components/patient/Patient";
import Doctor from "./components/doctor/Doctor";
import Admin from "./components/admin/Admin";

export default function Appointments() {
  const { user } = useAuthStore();
  const userRole = user?.role;

  // Get role-specific header
  const getHeader = () => {
    switch (userRole) {
      case "PATIENT":
        return {
          title: "Appointments",
          desc: "View and manage your doctor appointments",
        };
      case "DOCTOR":
        return {
          title: "My Schedule",
          desc: "Manage your scheduled consultations",
        };
      case "ADMIN":
      case "SUPER_ADMIN":
        return {
          title: "All Appointments",
          desc: "Manage and oversight of all system appointments",
        };
      default:
        return {
          title: "Appointments",
          desc: "View appointments",
        };
    }
  };

  const header = getHeader();

  return (
    <div className="dark:text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">{header.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          {header.desc}
        </p>
      </div>

      {/* Role-specific content */}
      {userRole === "PATIENT" && (<Patient />)}
      {userRole === "DOCTOR" && (<Doctor />)}
      {(userRole === "ADMIN" || userRole === "SUPER_ADMIN") && (<Admin />)}
    </div>
  );
}
