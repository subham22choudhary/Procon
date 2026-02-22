export default function ProDashboard() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Pro Dashboard</h1>

            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Welcome, Professional!</h2>
                <p className="text-gray-600 mb-4">
                    Here you can manage your services, view bookings, and update your profile.
                </p>

                <div className="flex gap-4">
                    <a className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer">
                        View Profile
                    </a>
                    <a className="px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer">
                        Manage Services
                    </a>
                </div>
            </div>
        </div>
    );
}
