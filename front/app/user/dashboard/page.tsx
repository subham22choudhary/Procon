import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function UserLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
