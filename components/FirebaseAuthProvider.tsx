"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthCtx {
    user: User | null;
    loading: boolean;
}

const Ctx = createContext<AuthCtx>({ user: null, loading: true });

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            setLoading(false);

            if (u) {
                // Set a cookie so middleware can check auth on the server
                const token = await u.getIdToken();
                document.cookie = `fb_token=${token}; path=/; max-age=3600; SameSite=Lax`;
            } else {
                // Clear cookie on sign-out
                document.cookie = "fb_token=; path=/; max-age=0";
            }
        });
        return () => unsub();
    }, []);

    return <Ctx.Provider value={{ user, loading }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);