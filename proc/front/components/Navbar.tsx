// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between px-6 py-3 bg-blue-600 text-white">
            <h1 className="font-bold text-lg">PROCON</h1>

            <div className="flex gap-4 text-sm">
                <Link href="/">Home</Link>
                <Link href="/auth/login">Login</Link>
                <Link href="/auth/register">Register</Link>
                <Link href="/user/dashboard">User</Link>
                <Link href="/pro/dashboard">Pro</Link>
                <Link href="/admin/dashboard">Admin</Link>
            </div>
        </nav>
    );
}
