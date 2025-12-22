'use client';

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1 - Brand & Trust */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="text-4xl">🧠</span>
                            <div className="text-3xl font-bold">Inteligo</div>
                        </Link>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Your Personal & Professional Support System
                        </p>
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="text-green-400">✓</span>
                                <span>Verified professionals only</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="text-green-400">✓</span>
                                <span>Privacy-first platform</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="text-green-400">✓</span>
                                <span>Secure payments & data encryption</span>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <a href="mailto:support@inteligo.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                                <span>📧</span>
                                <span>support@inteligo.com</span>
                            </a>
                            <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                                <span>📞</span>
                                <span>+91-XXXXXXXXXX</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Platform Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Platform</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact-us" className="text-gray-300 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 - User Access */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Access</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/auth/login" className="text-gray-300 hover:text-white transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/register" className="text-gray-300 hover:text-white transition-colors">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link href="/user/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                    User Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/pro/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                    Pro Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                    Admin Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 - Legal */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-and-conditions" className="text-gray-300 hover:text-white transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social & Trust Section */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        {/* Social Links */}
                        <div>
                            <h4 className="text-sm font-semibold mb-3 text-gray-400">Follow Us</h4>
                            <div className="flex gap-4">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                                    <span className="text-xl">💼</span>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                                    <span className="text-xl">🐦</span>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                                    <span className="text-xl">📸</span>
                                </a>
                            </div>
                        </div>

                        {/* Security Badges */}
                        <div>
                            <h4 className="text-sm font-semibold mb-3 text-gray-400 text-center sm:text-right">Security & Trust</h4>
                            <div className="flex gap-4 justify-center sm:justify-end">
                                <div className="bg-gray-800 px-4 py-2 rounded-lg text-xs flex items-center gap-2">
                                    <span className="text-green-400">🔒</span>
                                    <span>SSL Secured</span>
                                </div>
                                <div className="bg-gray-800 px-4 py-2 rounded-lg text-xs flex items-center gap-2">
                                    <span className="text-blue-400">🛡️</span>
                                    <span>Data Encrypted</span>
                                </div>
                                <div className="bg-gray-800 px-4 py-2 rounded-lg text-xs flex items-center gap-2">
                                    <span className="text-purple-400">✓</span>
                                    <span>PCI-DSS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Strip */}
            <div className="bg-black bg-opacity-30 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <div className="text-center sm:text-left">
                            © {currentYear} Inteligo Technologies Pvt. Ltd. All rights reserved.
                        </div>
                        <div className="flex gap-6">
                            <Link href="/sitemap" className="hover:text-white transition-colors">
                                Sitemap
                            </Link>
                            <span>|</span>
                            <Link href="/cookies-policy" className="hover:text-white transition-colors">
                                Cookies Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}