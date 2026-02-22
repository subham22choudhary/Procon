'use client';

export default function Pricing() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Pricing / Fees</h1>
                    <p className="text-xl text-gray-600">Transparent pricing with no hidden charges</p>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                            <h2 className="text-3xl font-bold text-white mb-2">For Users</h2>
                            <p className="text-indigo-100">Simple and transparent pricing</p>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Account creation: Free</h3>
                                    <p className="text-gray-600 text-sm">No charges to sign up and create your profile</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Browsing professionals: Free</h3>
                                    <p className="text-gray-600 text-sm">Search and compare without any cost</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold">$</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Service fees</h3>
                                    <p className="text-gray-600 text-sm">Based on professional's listed price</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold">%</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Platform convenience fee</h3>
                                    <p className="text-gray-600 text-sm">Clearly shown during checkout</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
                            <h2 className="text-3xl font-bold text-white mb-2">For Professionals</h2>
                            <p className="text-purple-100">Flexible earning opportunities</p>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Registration & profile creation: Free</h3>
                                    <p className="text-gray-600 text-sm">Get started at no upfront cost</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 font-bold">%</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Commission per successful booking</h3>
                                    <p className="text-gray-600 text-sm">OR subscription plans (configurable)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <span className="text-yellow-600 font-bold">⭐</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Optional featured listings</h3>
                                    <p className="text-gray-600 text-sm">Priority visibility (paid upgrade available)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-3">Transparent Pricing Promise</h3>
                    <p className="text-lg text-indigo-100">All charges are transparent. No hidden fees.</p>
                </div>
            </div>
        </div>
    );
}