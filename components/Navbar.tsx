'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle for demo
    const [userType, setUserType] = useState('user'); // 'user', 'pro', or 'admin'

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            {/* Top Trust Bar */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center sm:justify-between items-center text-xs sm:text-sm gap-2">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">🔒 Secure</span>
                            <span className="flex items-center gap-1">✅ Verified Experts</span>
                            <span className="hidden sm:flex items-center gap-1">💳 Escrow Payments</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="hidden md:inline">📧 support@inteligo.com</span>
                            <span className="hidden md:inline">|</span>
                            <span>📞 +91-XXXXXXXXXX</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="text-3xl sm:text-4xl">🧠</div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Inteligo
                            </div>
                            <div className="text-xs text-gray-600 hidden sm:block">Trusted Professionals. One Platform.</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link href="/" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors">
                            Home
                        </Link>
                        <Link href="/legal" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors">
                            Legal
                        </Link>
                        <Link href="/comdet" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors">
                            Company Details
                        </Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Auth Actions */}
                        {!isLoggedIn ? (
                            <div className="hidden lg:flex items-center gap-3">
                                <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors px-4 py-2">
                                    Login
                                </Link>
                                <Link href="/auth/register" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors px-4 py-2">
                                    Register
                                </Link>
                                <Link href="/auth/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold transition-colors shadow-md">
                                    Get Started
                                </Link>
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center gap-4">
                                <button className="text-gray-700 hover:text-indigo-600 transition-colors relative">
                                    <span className="text-2xl">🔔</span>
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
                                </button>

                                {/* User Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setUserDropdown(!userDropdown)}
                                        className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {userType === 'admin' ? 'A' : userType === 'pro' ? 'P' : 'U'}
                                        </div>
                                        <svg className={`w-4 h-4 transition-transform ${userDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {userDropdown && (
                                        <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
                                            {userType === 'user' && (
                                                <Link href="/user/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-semibold">
                                                    User Dashboard
                                                </Link>
                                            )}
                                            {userType === 'pro' && (
                                                <Link href="/pro/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-semibold">
                                                    Pro Dashboard
                                                </Link>
                                            )}
                                            {userType === 'admin' && (
                                                <Link href="/admin/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-semibold">
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <Link href="/settings" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                                Settings
                                            </Link>
                                            <hr className="my-2" />
                                            <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-semibold">
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-700 hover:text-indigo-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
                        <Link href="/" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors">
                            Home
                        </Link>
                        <Link href="/legal" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors">
                            Legal
                        </Link>
                        <Link href="/comdet" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors">
                            Company Details
                        </Link>

                        {!isLoggedIn ? (
                            <div className="space-y-2 pt-4 border-t border-gray-200">
                                <Link href="/auth/login" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-semibold">
                                    Login
                                </Link>
                                <Link href="/auth/register" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-semibold">
                                    Register
                                </Link>
                                <Link href="/auth/register" className="block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition-colors font-bold text-center">
                                    Get Started
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2 pt-4 border-t border-gray-200">
                                {userType === 'user' && (
                                    <Link href="/user/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-semibold">
                                        User Dashboard
                                    </Link>
                                )}
                                {userType === 'pro' && (
                                    <Link href="/pro/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-semibold">
                                        Pro Dashboard
                                    </Link>
                                )}
                                {userType === 'admin' && (
                                    <Link href="/admin/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-semibold">
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}