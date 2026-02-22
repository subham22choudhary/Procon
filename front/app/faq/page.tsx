'use client';

import { useState } from 'react';

const ChevronDown = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Is Inteligo a service provider?",
            answer: "No. Inteligo is a professional discovery & booking platform. Services are delivered by independent verified professionals."
        },
        {
            question: "Are professionals verified?",
            answer: "Yes. All professionals go through document verification and background checks."
        },
        {
            question: "Is my payment safe?",
            answer: "Absolutely. Payments are processed through secure, encrypted gateways."
        },
        {
            question: "Can I cancel a booking?",
            answer: "Yes. Cancellation policies vary by professional and will be shown before confirmation."
        },
        {
            question: "What if I face an issue?",
            answer: "Our support team actively monitors bookings and resolves disputes fairly."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-gray-600">
                        Everything you need to know about Inteligo
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="text-lg font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-indigo-600 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'transform rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-6 pb-5 pt-2">
                                    <p className="text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}