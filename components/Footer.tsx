'use client';

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white">

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