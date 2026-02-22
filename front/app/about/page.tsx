'use client';

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">About Us</h1>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-8">
                    <section>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Procon is a unified professional access platform built to simplify how individuals and families connect with trusted experts in critical areas of life. From financial planning and legal support to healthcare consultations and emergency assistance, Procon brings verified professionals under one secure digital ecosystem.
                        </p>
                    </section>

                    <section className="bg-indigo-50 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our mission is simple: save time, reduce stress, and increase trust. Instead of searching multiple platforms, calling unknown contacts, or relying on unverified recommendations, users can access experienced professionals transparently—based on reviews, credentials, availability, and pricing.
                        </p>
                    </section>

                    <section>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We believe that access to the right professional at the right time can change outcomes. Procon is designed for working professionals, families, and businesses who value reliability, accountability, and peace of mind.
                        </p>
                    </section>

                    <div className="grid sm:grid-cols-3 gap-6 mt-12">
                        <div className="text-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
                            <div className="text-4xl font-bold mb-2">10K+</div>
                            <div className="text-sm">Verified Professionals</div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white">
                            <div className="text-4xl font-bold mb-2">50K+</div>
                            <div className="text-sm">Successful Bookings</div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
                            <div className="text-4xl font-bold mb-2">4.8★</div>
                            <div className="text-sm">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}