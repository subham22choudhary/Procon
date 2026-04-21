"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface Profile {
    full_name: string;
    phone: string;
    role: string;
    created_at: string;
}

interface Booking {
    id: string;
    scheduled_date: string;
    time_slot: string;
    status: string;
    amount: number;
    created_at: string;
    transaction_id: string | null;
    paid_at: string | null;
    professionals: {
        name: string;
        category: string;
        experience: string;
    } | null;
}

// ── Status helpers ─────────────────────────────────────────────────────────────
const STATUS_COLOR: Record<string, string> = {
    paid: "oklch(0.63 0.22 142.49)",
    confirmed: "oklch(0.63 0.22 142.49)",
    pending: "oklch(0.91 0.18 100)",
    payment_pending: "oklch(0.91 0.18 100)",
    cancelled: "#f87171",
    rejected: "#f87171",
    payment_failed: "#f87171",
};
const STATUS_BG: Record<string, string> = {
    paid: "oklch(0.63 0.22 142.49 / 0.12)",
    confirmed: "oklch(0.63 0.22 142.49 / 0.12)",
    pending: "oklch(0.91 0.18 100 / 0.10)",
    payment_pending: "oklch(0.91 0.18 100 / 0.10)",
    cancelled: "rgba(248,113,113,0.1)",
    rejected: "rgba(248,113,113,0.1)",
    payment_failed: "rgba(248,113,113,0.1)",
};

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function fmtTime(t: string) {
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? "PM" : "AM"}`;
}
function fmtDateTime(d: string) {
    return new Date(d).toLocaleString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function UserProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [uid, setUid] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) { router.push("/login"); return; }
            setUid(user.uid);

            // Fetch profile
            const { data: prof } = await supabase
                .from("profiles")
                .select("full_name, phone, role, created_at")
                .eq("firebase_uid", user.uid)
                .single();
            setProfile(prof);

            // Fetch bookings linked to this firebase_uid via user_firebase_uid column
            // Falls back to all bookings if user_firebase_uid column doesn't exist yet
            const { data: bks } = await supabase
                .from("bookings")
                .select(`
                    id, scheduled_date, time_slot, status, amount,
                    created_at, transaction_id, paid_at,
                    professionals(name, category, experience)
                `)
                .eq("user_firebase_uid", user.uid)
                .order("created_at", { ascending: false });

            setBookings(bks || []);
            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    const totalSpent = bookings
        .filter(b => b.status === "paid" || b.status === "confirmed")
        .reduce((sum, b) => sum + (b.amount || 0), 0);

    if (loading) {
        return (
            <div style={{
                minHeight: "100vh", background: "#080808", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontFamily: "Outfit, sans-serif", color: "#555", fontSize: 14,
            }}>
                Loading your profile…
            </div>
        );
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .up-root {
                    min-height: 100vh;
                    background: radial-gradient(circle at top left, rgba(120,255,180,0.06), transparent 40%), #080808;
                    font-family: 'Outfit', sans-serif;
                    color: #e0e0e0;
                    padding: 48px 24px 80px;
                }

                .up-inner { max-width: 900px; margin: 0 auto; }

                /* ── Eyebrow ── */
                .up-eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
                .up-dot { width: 7px; height: 7px; border-radius: 50%; background: oklch(0.63 0.22 142.49); box-shadow: 0 0 8px oklch(0.63 0.22 142.49); }
                .up-eyebrow-text { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; color: oklch(0.63 0.22 142.49); text-transform: uppercase; }

                /* ── Profile card ── */
                .up-hero {
                    display: flex; align-items: center; gap: 20px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px; padding: 28px 28px;
                    margin-bottom: 20px;
                    box-shadow: 0 0 40px oklch(0.63 0.22 142.49 / 0.05);
                }
                .up-avatar {
                    width: 64px; height: 64px; border-radius: 50%;
                    background: oklch(0.63 0.22 142.49);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 22px; font-weight: 800; color: #000; flex-shrink: 0;
                    box-shadow: 0 0 20px oklch(0.63 0.22 142.49 / 0.3);
                }
                .up-hero-info { flex: 1; }
                .up-name { font-size: 1.5rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; margin-bottom: 4px; }
                .up-phone { font-size: 14px; color: #555; font-weight: 300; }
                .up-role-badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 700;
                    background: oklch(0.63 0.22 142.49 / 0.12);
                    border: 1px solid oklch(0.63 0.22 142.49 / 0.3);
                    color: oklch(0.63 0.22 142.49); margin-top: 8px;
                }
                .up-joined { font-size: 12px; color: #444; margin-top: 4px; }

                /* ── Stats row ── */
                .up-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 32px; }
                .up-stat {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px; padding: 18px 20px;
                    text-align: center;
                }
                .up-stat-num { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; }
                .up-stat-num.green { color: oklch(0.63 0.22 142.49); }
                .up-stat-num.yellow { color: oklch(0.91 0.18 100); }
                .up-stat-num.white { color: #fff; }
                .up-stat-label { font-size: 12px; color: #555; font-weight: 400; }

                /* ── Section heading ── */
                .up-section-head {
                    display: flex; align-items: center; gap: 10px;
                    margin-bottom: 20px;
                }
                .up-section-title { font-size: 1.1rem; font-weight: 700; color: #fff; }
                .up-section-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
                .up-section-count {
                    font-size: 12px; font-weight: 600; padding: 3px 10px;
                    border-radius: 50px; background: rgba(255,255,255,0.05);
                    color: #555; border: 1px solid rgba(255,255,255,0.07);
                }

                /* ── Timeline ── */
                .up-timeline { position: relative; padding-left: 28px; }
                .up-timeline::before {
                    content: ''; position: absolute; left: 7px; top: 0; bottom: 0;
                    width: 1px; background: rgba(255,255,255,0.07);
                }

                .up-tl-item {
                    position: relative; margin-bottom: 20px;
                    opacity: 0; transform: translateX(-10px);
                    animation: up-slide 0.4s ease forwards;
                }
                @keyframes up-slide { to { opacity: 1; transform: translateX(0); } }

                .up-tl-dot {
                    position: absolute; left: -25px; top: 20px;
                    width: 14px; height: 14px; border-radius: 50%;
                    border: 2px solid; background: #080808;
                    display: flex; align-items: center; justify-content: center;
                }

                .up-tl-card {
                    background: rgba(10,10,10,0.7);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px; padding: 20px 22px;
                    transition: border-color 0.2s;
                }
                .up-tl-card:hover { border-color: rgba(255,255,255,0.13); }

                .up-tl-header {
                    display: flex; align-items: flex-start;
                    justify-content: space-between; gap: 12px; margin-bottom: 14px;
                }
                .up-tl-pro-name { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 2px; }
                .up-tl-category {
                    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
                    padding: 2px 8px; border-radius: 50px; text-transform: uppercase;
                    background: oklch(0.63 0.22 142.49 / 0.1);
                    color: oklch(0.63 0.22 142.49);
                    border: 1px solid oklch(0.63 0.22 142.49 / 0.2);
                    display: inline-block; margin-top: 2px;
                }

                .up-tl-status {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 4px 10px; border-radius: 50px;
                    font-size: 11px; font-weight: 700; white-space: nowrap; flex-shrink: 0;
                    border: 1px solid rgba(255,255,255,0.06);
                }

                .up-tl-details {
                    display: grid; grid-template-columns: 1fr 1fr 1fr;
                    gap: 12px; margin-bottom: 12px;
                }
                .up-tl-detail-item { display: flex; flex-direction: column; gap: 3px; }
                .up-tl-detail-label { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; color: #444; text-transform: uppercase; }
                .up-tl-detail-val { font-size: 14px; color: #ccc; font-weight: 500; }
                .up-tl-detail-val.amount { color: oklch(0.91 0.18 100); font-weight: 700; }

                .up-tl-footer {
                    display: flex; align-items: center; justify-content: space-between;
                    padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.05);
                    font-size: 12px; color: #444;
                }

                /* Empty state */
                .up-empty {
                    text-align: center; padding: 48px 24px;
                    background: rgba(255,255,255,0.02);
                    border: 1px dashed rgba(255,255,255,0.07);
                    border-radius: 16px; color: #444; font-size: 14px;
                }

                @media (max-width: 600px) {
                    .up-stats { grid-template-columns: 1fr 1fr; }
                    .up-tl-details { grid-template-columns: 1fr 1fr; }
                    .up-hero { flex-direction: column; text-align: center; }
                }
            `}</style>

            <div className="up-root">
                <div className="up-inner">

                    {/* Eyebrow */}
                    <div className="up-eyebrow" style={{ marginBottom: 24 }}>
                        <div className="up-dot" />
                        <span className="up-eyebrow-text">My Profile</span>
                    </div>

                    {/* Hero card */}
                    <div className="up-hero">
                        <div className="up-avatar">
                            {profile?.full_name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="up-hero-info">
                            <div className="up-name">{profile?.full_name || "—"}</div>
                            <div className="up-phone">{profile?.phone || "—"}</div>
                            <div className="up-role-badge">
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                                User · U
                            </div>
                            <div className="up-joined">
                                Member since {profile?.created_at ? fmtDate(profile.created_at) : "—"}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="up-stats">
                        <div className="up-stat">
                            <div className="up-stat-num white">{bookings.length}</div>
                            <div className="up-stat-label">Total Bookings</div>
                        </div>
                        <div className="up-stat">
                            <div className="up-stat-num green">
                                {bookings.filter(b => b.status === "paid" || b.status === "confirmed").length}
                            </div>
                            <div className="up-stat-label">Confirmed</div>
                        </div>
                        <div className="up-stat">
                            <div className="up-stat-num yellow">₹{totalSpent.toLocaleString("en-IN")}</div>
                            <div className="up-stat-label">Total Spent</div>
                        </div>
                    </div>

                    {/* Booking timeline */}
                    <div className="up-section-head">
                        <span className="up-section-title">Booking History</span>
                        <div className="up-section-line" />
                        <span className="up-section-count">{bookings.length}</span>
                    </div>

                    {bookings.length === 0 ? (
                        <div className="up-empty">
                            No bookings yet. <a href="/professionals" style={{ color: "oklch(0.63 0.22 142.49)", textDecoration: "none" }}>Browse professionals →</a>
                        </div>
                    ) : (
                        <div className="up-timeline">
                            {bookings.map((b, i) => {
                                const dotColor = STATUS_COLOR[b.status] || "#555";
                                return (
                                    <div
                                        className="up-tl-item"
                                        key={b.id}
                                        style={{ animationDelay: `${i * 0.07}s` }}
                                    >
                                        {/* Timeline dot */}
                                        <div className="up-tl-dot" style={{ borderColor: dotColor }} />

                                        <div className="up-tl-card">
                                            <div className="up-tl-header">
                                                <div>
                                                    <div className="up-tl-pro-name">
                                                        {b.professionals?.name || "Professional"}
                                                    </div>
                                                    <span className="up-tl-category">
                                                        {b.professionals?.category || "—"}
                                                    </span>
                                                </div>
                                                <div
                                                    className="up-tl-status"
                                                    style={{
                                                        background: STATUS_BG[b.status] || "rgba(255,255,255,0.05)",
                                                        color: dotColor,
                                                        borderColor: `${dotColor}33`,
                                                    }}
                                                >
                                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                                                    {b.status.replace(/_/g, " ")}
                                                </div>
                                            </div>

                                            <div className="up-tl-details">
                                                <div className="up-tl-detail-item">
                                                    <span className="up-tl-detail-label">Date</span>
                                                    <span className="up-tl-detail-val">
                                                        {b.scheduled_date ? fmtDate(b.scheduled_date) : "—"}
                                                    </span>
                                                </div>
                                                <div className="up-tl-detail-item">
                                                    <span className="up-tl-detail-label">Time</span>
                                                    <span className="up-tl-detail-val">
                                                        {b.time_slot ? fmtTime(b.time_slot) : "—"}
                                                    </span>
                                                </div>
                                                <div className="up-tl-detail-item">
                                                    <span className="up-tl-detail-label">Amount</span>
                                                    <span className="up-tl-detail-val amount">
                                                        ₹{b.amount?.toLocaleString("en-IN") || "—"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="up-tl-footer">
                                                <span>Booked on {fmtDateTime(b.created_at)}</span>
                                                {b.paid_at && (
                                                    <span style={{ color: "oklch(0.63 0.22 142.49)" }}>
                                                        ✓ Paid {fmtDateTime(b.paid_at)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}