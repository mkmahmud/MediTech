import { Outlet, Link, NavLink } from 'react-router'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-deep text-white flex flex-col">
        <div className="p-6 border-b border-primary">
          <h1 className="text-2xl font-bold">MediTech</h1>
          <p className="text-sm text-gray-300">Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg mb-2 transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-primary/50'
              }`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/dashboard/patients"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg mb-2 transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-primary/50'
              }`
            }
          >
            Patients
          </NavLink>
          <NavLink
            to="/dashboard/appointments"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg mb-2 transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-primary/50'
              }`
            }
          >
            Appointments
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg mb-2 transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-primary/50'
              }`
            }
          >
            Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-primary">
          <Link
            to="/"
            className="block px-4 py-3 text-gray-300 hover:bg-primary/50 rounded-lg transition"
          >
            ← Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h2>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange/90 transition">
                Notifications
              </button>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
