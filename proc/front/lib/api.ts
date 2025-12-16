const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

console.log("API_BASE_URL =>", API_BASE_URL); // DEBUG

export async function loginApi(email: string, password: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            throw new Error(data.message || "Login failed");
        }

        return data;
    } catch (err: any) {
        console.error("LOGIN FETCH ERROR:", err);
        throw new Error(err.message || "Failed to fetch");
    }
}
