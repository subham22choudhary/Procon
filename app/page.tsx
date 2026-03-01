'use client';

import { useState } from 'react';

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const categories = [
    { icon: "📊", title: "Chartered Accountants", color: "from-blue-500 to-cyan-500" },
    { icon: "⚖️", title: "Lawyers", color: "from-purple-500 to-pink-500" },
    { icon: "🩺", title: "Doctors", subtitle: "(Online / Visit)", color: "from-red-500 to-orange-500" },
    { icon: "📈", title: "Investment Advisors", color: "from-green-500 to-teal-500" },
    { icon: "🛡️", title: "Security Advisors", color: "from-indigo-500 to-blue-500" },
    { icon: "🚨", title: "Emergency Response", color: "from-red-600 to-pink-600" }
  ];

  const professionals = [
    { name: "Dr. Priya Sharma", profession: "Cardiologist", rating: 4.9, experience: 12, price: "₹800", image: "👩‍⚕️" },
    { name: "Adv. Rajesh Kumar", profession: "Corporate Lawyer", rating: 4.8, experience: 15, price: "₹1500", image: "👨‍💼" },
    { name: "CA Meera Patel", profession: "Tax Consultant", rating: 4.9, experience: 10, price: "₹1200", image: "👩‍💼" },
    { name: "Mr. Anil Verma", profession: "Financial Advisor", rating: 4.7, experience: 18, price: "₹1000", image: "👨‍💻" }
  ];

  const testimonials = [
    { text: "Inteligo helped me connect with a verified CA within minutes. Super smooth experience.", author: "Rahul M.", role: "Startup Founder" },
    { text: "High quality clients and timely payouts. Inteligo is built for serious professionals.", author: "Anjali S.", role: "Lawyer" },
    { text: "The emergency support saved us during a critical situation. Highly recommend!", author: "Priya K.", role: "Business Owner" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              One Platform. Every Trusted Professional You'll Ever Need.
            </h1>
            <p className="text-xl sm:text-2xl mb-10 text-indigo-100 leading-relaxed">
              Chartered Accountants, Lawyers, Doctors, Financial Advisors, Security Experts & Emergency Support — <span className="font-semibold text-white">verified, on-demand, and confidential.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all duration-200 shadow-2xl hover:shadow-xl hover:scale-105">
                Find a Professional
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-200 shadow-xl hover:scale-105">
                Join as a Professional
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {['Verified Experts', 'Secure Payments', 'Confidential', '24×7 Support'].map((item, i) => (
                <div key={i} className="bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
                  <div className="text-3xl mb-2">✔</div>
                  <div className="text-sm font-semibold">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Discovery */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Find the Right Expert — Fast & Reliable</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Search and book professionals using powerful filters like <span className="font-semibold text-indigo-600">experience, ratings, availability, pricing, and location</span>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer hover:scale-105 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{cat.title}</h3>
                {cat.subtitle && <p className="text-sm text-gray-500">{cat.subtitle}</p>}
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Explore Professionals
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">How Inteligo Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Choose Your Professional</h3>
              <p className="text-gray-700">Select by profession, specialization, reviews, pricing, and availability.</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Book & Pay Securely</h3>
              <p className="text-gray-700">Transparent pricing. Secure escrow-based payments.</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Expert Help</h3>
              <p className="text-gray-700">Consult online, on call, or in person — backed by Inteligo support.</p>
            </div>
          </div>

          <div className="text-center">
            <button className="text-indigo-600 font-bold text-lg hover:text-indigo-700 transition-colors duration-200">
              See How It Works →
            </button>
          </div>
        </div>
      </section>

      {/* Why Inteligo */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Built for People Who Value Time, Privacy & Trust</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "✅", title: "Verified Credentials", desc: "All professionals are manually verified." },
              { icon: "🔐", title: "Privacy First", desc: "Encrypted communication and data protection." },
              { icon: "🤝", title: "Dedicated Support Executive", desc: "One point of contact for every premium user." },
              { icon: "⚡", title: "Fast Emergency Access", desc: "Immediate response when it matters most." },
              { icon: "💳", title: "Escrow Payments", desc: "Pay only when the service is delivered." },
              { icon: "🎯", title: "Quality Guarantee", desc: "Backed by our satisfaction promise." }
            ].map((item, i) => (
              <div key={i} className="  bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-indigo-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Top Rated Experts on Inteligo</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {professionals.map((pro, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 hover:scale-105">
                <div className="text-6xl mb-4 text-center">{pro.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{pro.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{pro.profession}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold text-gray-900">{pro.rating}</span>
                  <span className="text-gray-500 text-sm">({pro.experience} years exp)</span>
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-4">{pro.price}</div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Professionals */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">Are You a Professional? Grow With Inteligo</h2>
              <p className="text-xl text-purple-100 mb-8">
                Join a premium network of trusted professionals and get <span className="font-semibold text-white">high-intent clients, secure payments, and zero marketing hassle</span>.
              </p>
              <div className="space-y-4 mb-8">
                {['Verified profile badge', 'Flexible availability', 'Guaranteed payouts', 'Client management dashboard'].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold flex-shrink-0">✔</div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              <button className="bg-white text-purple-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors duration-200 shadow-xl">
                Register as a Professional
              </button>
            </div>
            <div className="  bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-3xl p-12 text-center">
              <div className="text-8xl mb-6">👨‍💼</div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-xl text-purple-100">Verified Professionals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-7xl mb-6">🚨</div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Emergency? Help Is One Click Away.</h2>
          <p className="text-xl text-red-100 mb-8">
            Instant access to <span className="font-semibold text-white">medical, legal, and security response teams</span> during critical situations.
          </p>
          <button className="bg-white text-red-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors duration-200 shadow-2xl hover:scale-105">
            Get Emergency Help
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Trusted by Professionals & Clients Alike</h2>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 shadow-xl">
            <div className="text-6xl text-indigo-600 mb-4">"</div>
            <p className="text-2xl text-gray-800 mb-6 leading-relaxed italic">
              {testimonials[activeTestimonial].text}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900 text-lg">{testimonials[activeTestimonial].author}</div>
                <div className="text-gray-600">{testimonials[activeTestimonial].role}</div>
              </div>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-indigo-600 w-8' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Verified Professionals" },
              { number: "50,000+", label: "Successful Consultations" },
              { number: "4.8⭐", label: "Average Rating" },
              { number: "99.9%", label: "Secure Transactions" }
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-bold mb-8">One Platform for Life's Most Important Decisions</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all duration-200 shadow-2xl hover:scale-105">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-200 shadow-xl hover:scale-105">
              Talk to Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}