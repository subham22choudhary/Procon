'use client';

export default function HowItWorks() {
    const steps = [
        {
            number: "1",
            title: "Sign Up / Login",
            description: "Create your account using email or secure authentication.",
            icon: "👤"
        },
        {
            number: "2",
            title: "Choose a Profession",
            description: "Select the category you need—CA, Lawyer, Doctor, Financial Advisor, Security Expert, or Emergency Services.",
            icon: "🔍"
        },
        {
            number: "3",
            title: "Filter & Compare",
            description: "Shortlist professionals based on experience, ratings, pricing, availability, and specialization.",
            icon: "⚖️"
        },
        {
            number: "4",
            title: "Book & Pay Securely",
            description: "Choose a time slot, confirm details, and complete payment through a secure checkout.",
            icon: "💳"
        },
        {
            number: "5",
            title: "Consult / Service Delivery",
            description: "Connect via call, video, chat, or in-person visit depending on the service.",
            icon: "💬"
        },
        {
            number: "6",
            title: "Review & Track",
            description: "Rate the professional, access booking history, invoices, and follow-ups from your dashboard.",
            icon: "⭐"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h1>
                    <p className="text-xl text-gray-600">Simple steps to connect with verified professionals</p>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4"></div>
                </div>

                <div className="space-y-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
                        >
                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                        {step.number}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-4xl">{step.icon}</span>
                                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-700 text-lg leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    );
}