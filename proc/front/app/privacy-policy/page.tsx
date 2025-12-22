'use client';

export default function PrivacyPolicy() {
    const privacyPoints = [
        {
            icon: "🔒",
            title: "Data Collection",
            description: "We collect only necessary information for service delivery",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: "🚫",
            title: "No Third-Party Sales",
            description: "Personal data is never sold to third parties",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: "💳",
            title: "Secure Payments",
            description: "Payment data is processed through secure, compliant gateways",
            color: "from-indigo-500 to-purple-500"
        },
        {
            icon: "👁️",
            title: "Access Control",
            description: "Access to data is role-based and audited",
            color: "from-green-500 to-teal-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-xl text-gray-600">Your privacy matters to us</p>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4"></div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-12">
                    {privacyPoints.map((point, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className={`w-16 h-16 bg-gradient-to-br ${point.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-md`}>
                                {point.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{point.description}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Data Rights</h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                ✓
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">View Your Data</h4>
                                <p className="text-gray-700">Access all your personal information from your dashboard at any time</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                ⬇
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Download Your Data</h4>
                                <p className="text-gray-700">Request a complete export of your personal data in a portable format</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
                            <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                                🗑
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Delete Your Data</h4>
                                <p className="text-gray-700">Request deletion of your data, subject to legal requirements</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-3">Questions About Privacy?</h3>
                    <p className="text-lg text-indigo-100 mb-6">Our team is here to help you understand how we protect your information</p>
                    <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200 shadow-lg">
                        Contact Privacy Team
                    </button>
                </div>

                <p className="text-center text-gray-600 mt-8">Last updated: Version 1.0</p>
            </div>
        </div>
    );
}