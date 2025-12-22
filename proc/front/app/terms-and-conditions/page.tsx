'use client';

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
                    <p className="text-lg text-gray-600">Last updated: Version 1.0</p>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4"></div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            By using Procon, you agree to comply with our terms:
                        </p>

                        <div className="space-y-6">
                            <div className="border-l-4 border-indigo-500 pl-6 py-2">
                                <p className="text-gray-800 leading-relaxed">
                                    <span className="font-semibold text-gray-900">Platform Role:</span> Procon acts as a facilitation platform, not a service provider
                                </p>
                            </div>

                            <div className="border-l-4 border-purple-500 pl-6 py-2">
                                <p className="text-gray-800 leading-relaxed">
                                    <span className="font-semibold text-gray-900">Professional Independence:</span> Professionals are independent entities
                                </p>
                            </div>

                            <div className="border-l-4 border-blue-500 pl-6 py-2">
                                <p className="text-gray-800 leading-relaxed">
                                    <span className="font-semibold text-gray-900">Accurate Information:</span> Users must provide accurate information during bookings
                                </p>
                            </div>

                            <div className="border-l-4 border-cyan-500 pl-6 py-2">
                                <p className="text-gray-800 leading-relaxed">
                                    <span className="font-semibold text-gray-900">Policies:</span> Payments, cancellations, and refunds are governed by platform and professional policies
                                </p>
                            </div>

                            <div className="border-l-4 border-red-500 pl-6 py-2">
                                <p className="text-gray-800 leading-relaxed">
                                    <span className="font-semibold text-gray-900">Account Suspension:</span> Misuse, fraud, or abuse may result in account suspension
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 bg-indigo-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Important Notice</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Full legal terms are available within the platform and may be updated periodically. By continuing to use Procon, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                            </p>
                        </div>

                        <div className="mt-8 flex justify-center gap-4">
                            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                                Accept & Continue
                            </button>
                            <button className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200">
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}