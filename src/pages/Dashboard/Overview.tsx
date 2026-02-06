export default function DashboardOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Dashboard Overview
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Patients
          </h3>
          <p className="text-3xl font-bold text-primary mt-2">1,284</p>
          <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Appointments Today
          </h3>
          <p className="text-3xl font-bold text-orange mt-2">24</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">3 pending</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Available Staff
          </h3>
          <p className="text-3xl font-bold text-soft mt-2">18</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Out of 20</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
            <span className="text-gray-700 dark:text-gray-300">New patient registered</span>
            <span className="text-sm text-gray-500">5 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
            <span className="text-gray-700 dark:text-gray-300">Appointment completed</span>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-700 dark:text-gray-300">Lab results uploaded</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
