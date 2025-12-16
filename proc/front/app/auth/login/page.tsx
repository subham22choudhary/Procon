"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("123456");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginApi(email, password);

            // Example response expected from backend:
            // { success: true, user: { id, name, role } }
            const role = data?.user?.role ?? "user";

            // Save basic session info (demo)
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect by role
            if (role === "admin") router.push("/admin/dashboard");
            else if (role === "pro") router.push("/pro/dashboard");
            else router.push("/user/dashboard");
        } catch (err: any) {
            setError(err?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Login to PROCON</h1>

                {error ? (
                    <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Don&apos;t have an account?{" "}
                    <a href="/auth/register" className="text-blue-600 font-medium">
                        Register
                    </a>
                </p>

                <p className="text-center text-xs text-gray-500 mt-4">
                    Demo creds: <span className="font-mono">test@test.com</span> /{" "}
                    <span className="font-mono">123456</span>
                </p>
            </div>
        </div>
    );
}
