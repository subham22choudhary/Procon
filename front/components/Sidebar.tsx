import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-56 h-screen bg-white shadow-md p-4 space-y-3">
            <h2 className="font-semibold mb-2">Menu</h2>
            <nav className="flex flex-col gap-2 text-sm">
                <Link href="/user/dashboard">User Dashboard</Link>
                <Link href="/pro/dashboard">Pro Dashboard</Link>
                <Link href="/admin/dashboard">Admin Dashboard</Link>
            </nav>
        </aside>
    );
}
