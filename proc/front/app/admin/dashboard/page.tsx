export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 shadow rounded-lg border">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-2xl font-bold mt-1">1,254</p>
        </div>

        <div className="bg-white p-5 shadow rounded-lg border">
          <h2 className="text-gray-500 text-sm">Professionals</h2>
          <p className="text-2xl font-bold mt-1">312</p>
        </div>

        <div className="bg-white p-5 shadow rounded-lg border">
          <h2 className="text-gray-500 text-sm">Bookings</h2>
          <p className="text-2xl font-bold mt-1">548</p>
        </div>

        <div className="bg-white p-5 shadow rounded-lg border">
          <h2 className="text-gray-500 text-sm">Revenue</h2>
          <p className="text-2xl font-bold mt-1">₹84,200</p>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white shadow rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        <ul className="space-y-3 text-gray-700">
          <li>• New user registered</li>
          <li>• Payment processed</li>
          <li>• Professional verified</li>
          <li>• Booking completed</li>
        </ul>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white shadow rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">Users Overview</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-3 border">Rahul Sharma</td>
                <td className="p-3 border">rahul@example.com</td>
                <td className="p-3 border">User</td>
                <td className="p-3 border text-green-600 font-medium">
                  Active
                </td>
              </tr>

              <tr>
                <td className="p-3 border">Priya Verma</td>
                <td className="p-3 border">priya@example.com</td>
                <td className="p-3 border">Professional</td>
                <td className="p-3 border text-yellow-600 font-medium">
                  Pending
                </td>
              </tr>

              <tr>
                <td className="p-3 border">John Doe</td>
                <td className="p-3 border">john@example.com</td>
                <td className="p-3 border">Admin</td>
                <td className="p-3 border text-green-600 font-medium">
                  Active
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
