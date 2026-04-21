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

interface Profile { full_name: string; phone: string; role: string; created_at: string; }
interface ProfData { id: string; name: string; category: string; experience: string; bio: string; price: number; is_verified: boolean; }
interface Booking {
    id: string;
    scheduled_date: string;
    time_slot: string;
    status: string;
    amount: number;
    created_at: string;
    paid_at: string | null;
    user_firebase_uid: string | null;
    user_name?: string;
}

const STATUS_COLOR: Record<string, string> = {
    paid:            "oklch(0.63 0.22 142.49)",
    confirmed:       "oklch(0.63 0.22 142.49)",
    pending:         "oklch(0.91 0.18 100)",
    payment_pending: "oklch(0.91 0.18 100)",
    cancelled:       "#f87171",
    rejected:        "#f87171",
    payment_failed:  "#f87171",
};
const STATUS_BG: Record<string, string> = {
    paid:            "oklch(0.63 0.22 142.49 / 0.12)",
    confirmed:       "oklch(0.63 0.22 142.49 / 0.12)",
    pending:         "oklch(0.91 0.18 100 / 0.10)",
    payment_pending: "oklch(0.91 0.18 100 / 0.10)",
    cancelled:       "rgba(248,113,113,0.1)",
    rejected:        "rgba(248,113,113,0.1)",
    payment_failed:  "rgba(248,113,113,0.1)",
};

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function fmtTime(t: string) {
    const [h] = t.split(":");
    const hr = parseInt(h);
    return `${hr > 12 ? hr - 12 : hr}:${t.split(":")[1]} ${hr >= 12 ? "PM" : "AM"}`;
}
function fmtDateTime(d: string) {
    return new Date(d).toLocaleString("en-IN", {
        day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
}

export default function ProfessionalProfilePage() {
    const [profile,  setProfile]  = useState<Profile | null>(null);
    const [profData, setProfData] = useState<ProfData | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading,  setLoading]  = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) { router.push("/login"); return; }

            // 1. Get profile
            const { data: prof } = await supabase
                .from("profiles")
                .select("full_name, phone, role, created_at")
                .eq("firebase_uid", user.uid)
                .single();

            if (prof?.role !== "professional") {
                router.push("/my-profile");
                return;
            }
            setProfile(prof);

            // 2. Get professional record (matched by phone)
            const { data: pd } = await supabase
                .from("professionals")
                .select("id, name, category, experience, bio, price, is_verified")
                .eq("phone", prof.phone)
                .single();

            setProfData(pd);

            if (pd) {
                // 3. Get all bookings for this professional
                const { data: bks } = await supabase
                    .from("bookings")
                    .select("id, scheduled_date, time_slot, status, amount, created_at, paid_at, user_firebase_uid")
                    .eq("professional_id", pd.id)
                    .order("created_at", { ascending: false });

                if (bks && bks.length > 0) {
                    // 4. Enrich with user names from profiles table
                    const uids = bks
                        .map(b => b.user_firebase_uid)
                        .filter(Boolean) as string[];

                    let nameMap: Record<string, string> = {};
                    if (uids.length > 0) {
                        const { data: userProfiles } = await supabase
                            .from("profiles")
                            .select("firebase_uid, full_name")
                            .in("firebase_uid", uids);

                        userProfiles?.forEach(p => { nameMap[p.firebase_uid] = p.full_name; });
                    }

                    const enriched = bks.map(b => ({
                        ...b,
                        user_name: b.user_firebase_uid
                            ? (nameMap[b.user_firebase_uid] || "User")
                            : "User",
                    }));
                    setBookings(enriched);
                } else {
                    setBookings([]);
                }
            }

            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    const totalEarned = bookings
        .filter(b => b.status === "paid" || b.status === "confirmed")
        .reduce((sum, b) => sum + (b.amount || 0), 0);

    if (loading) {
        return (
            <div style={{
                minHeight: "100vh", background: "#080808", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontFamily: "Outfit, sans-serif", color: "#555", fontSize: 14,
            }}>
                Loading your dashboard…
            </div>
        );
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .pp-root {
                    min-height: 100vh;
                    background: radial-gradient(circle at top right, rgba(255,230,120,0.05), transparent 40%), #080808;
                    font-family: 'Outfit', sans-serif;
                    color: #e0e0e0;
                    padding: 48px 24px 80px;
                }
                .pp-inner { max-width: 900px; margin: 0 auto; }

                /* Eyebrow */
                .pp-eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
                .pp-dot { width: 7px; height: 7px; border-radius: 50%; background: oklch(0.91 0.18 100); box-shadow: 0 0 8px oklch(0.91 0.18 100); }
                .pp-eyebrow-text { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; color: oklch(0.91 0.18 100); text-transform: uppercase; }

                /* Hero */
                .pp-hero {
                    display: flex; align-items: center; gap: 20px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid oklch(0.91 0.18 100 / 0.2);
                    border-radius: 20px; padding: 28px;
                    margin-bottom: 20px;
                    box-shadow: 0 0 40px oklch(0.91 0.18 100 / 0.04);
                }
                .pp-avatar {
                    width: 64px; height: 64px; border-radius: 50%;
                    background: oklch(0.91 0.18 100);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 22px; font-weight: 800; color: #000; flex-shrink: 0;
                    box-shadow: 0 0 20px oklch(0.91 0.18 100 / 0.25);
                }
                .pp-name { font-size: 1.5rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; margin-bottom: 3px; }
                .pp-meta { font-size: 13px; color: #555; font-weight: 300; }
                .pp-role-badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 700;
                    background: oklch(0.91 0.18 100 / 0.1);
                    border: 1px solid oklch(0.91 0.18 100 / 0.3);
                    color: oklch(0.91 0.18 100); margin-top: 8px;
                }
                .pp-verified {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 3px 10px; border-radius: 50px; font-size: 11px; font-weight: 700;
                    background: oklch(0.63 0.22 142.49 / 0.1);
                    border: 1px solid oklch(0.63 0.22 142.49 / 0.25);
                    color: oklch(0.63 0.22 142.49); margin-left: 8px;
                }

                /* Pro info card */
                .pp-info-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px; padding: 20px 22px;
                    margin-bottom: 20px; display: grid;
                    grid-template-columns: repeat(3, 1fr); gap: 16px;
                }
                .pp-info-item { display: flex; flex-direction: column; gap: 4px; }
                .pp-info-label { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; color: #444; text-transform: uppercase; }
                .pp-info-val { font-size: 14px; color: #ccc; font-weight: 500; }
                .pp-info-val.price { color: oklch(0.91 0.18 100); font-weight: 700; font-size: 16px; }
                .pp-bio { grid-column: 1 / -1; font-size: 13px; color: #666; font-style: italic; line-height: 1.5; }

                /* Stats */
                .pp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 32px; }
                .pp-stat {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px; padding: 18px 20px; text-align: center;
                }
                .pp-stat-num { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; }
                .pp-stat-num.green { color: oklch(0.63 0.22 142.49); }
                .pp-stat-num.yellow { color: oklch(0.91 0.18 100); }
                .pp-stat-num.white { color: #fff; }
                .pp-stat-label { font-size: 12px; color: #555; }

                /* Section head */
                .pp-section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
                .pp-section-title { font-size: 1.1rem; font-weight: 700; color: #fff; }
                .pp-section-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
                .pp-section-count {
                    font-size: 12px; font-weight: 600; padding: 3px 10px;
                    border-radius: 50px; background: rgba(255,255,255,0.05);
                    color: #555; border: 1px solid rgba(255,255,255,0.07);
                }

                /* Timeline */
                .pp-timeline { position: relative; padding-left: 28px; }
                .pp-timeline::before {
                    content: ''; position: absolute; left: 7px; top: 0; bottom: 0;
                    width: 1px; background: rgba(255,255,255,0.07);
                }

                .pp-tl-item {
                    position: relative; margin-bottom: 20px;
                    opacity: 0; transform: translateX(-10px);
                    animation: pp-slide 0.4s ease forwards;
                }
                @keyframes pp-slide { to { opacity: 1; transform: translateX(0); } }

                .pp-tl-dot {
                    position: absolute; left: -25px; top: 20px;
                    width: 14px; height: 14px; border-radius: 50%;
                    border: 2px solid; background: #080808;
                }

                .pp-tl-card {
                    background: rgba(10,10,10,0.7);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px; padding: 20px 22px;
                    transition: border-color 0.2s;
                }
                .pp-tl-card:hover { border-color: rgba(255,255,255,0.13); }

                .pp-tl-header {
                    display: flex; align-items: flex-start;
                    justify-content: space-between; gap: 12px; margin-bottom: 14px;
                }

                .pp-user-badge {
                    display: inline-flex; align-items: center; gap: 6px;
                }
                .pp-user-avatar {
                    width: 32px; height: 32px; border-radius: 50%;
                    background: oklch(0.63 0.22 142.49 / 0.15);
                    border: 1px solid oklch(0.63 0.22 142.49 / 0.3);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 12px; font-weight: 700; color: oklch(0.63 0.22 142.49);
                    flex-shrink: 0;
                }
                .pp-user-name { font-size: 15px; font-weight: 700; color: #fff; }
                .pp-user-label { font-size: 11px; color: #555; }

                .pp-tl-status {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 4px 10px; border-radius: 50px;
                    font-size: 11px; font-weight: 700; white-space: nowrap; flex-shrink: 0;
                    border: 1px solid rgba(255,255,255,0.06);
                }

                .pp-tl-details {
                    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 12px;
                }
                .pp-tl-dl { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; color: #444; text-transform: uppercase; margin-bottom: 3px; }
                .pp-tl-dv { font-size: 14px; color: #ccc; font-weight: 500; }
                .pp-tl-dv.earned { color: oklch(0.91 0.18 100); font-weight: 700; }

                .pp-tl-footer {
                    display: flex; align-items: center; justify-content: space-between;
                    padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.05);
                    font-size: 12px; color: #444;
                }

                .pp-empty {
                    text-align: center; padding: 48px 24px;
                    background: rgba(255,255,255,0.02);
                    border: 1px dashed rgba(255,255,255,0.07);
                    border-radius: 16px; color: #444; font-size: 14px;
                }

                @media (max-width: 600px) {
                    .pp-stats { grid-template-columns: 1fr 1fr; }
                    .pp-tl-details { grid-template-columns: 1fr 1fr; }
                    .pp-info-card { grid-template-columns: 1fr 1fr; }
                    .pp-hero { flex-direction: column; text-align: center; }
                }
            `}</style>

            <div className="pp-root">
                <div className="pp-inner">

                    {/* Eyebrow */}
                    <div className="pp-eyebrow">
                        <div className="pp-dot" />
                        <span className="pp-eyebrow-text">Professional Dashboard</span>
                    </div>

                    {/* Hero */}
                    <div className="pp-hero">
                        <div className="pp-avatar">
                            {profile?.full_name?.charAt(0)?.toUpperCase() || "P"}
                        </div>
                        <div>
                            <div className="pp-name">{profile?.full_name || "—"}</div>
                            <div className="pp-meta">{profile?.phone}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
                                <div className="pp-role-badge">
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                                    Professional · P
                                </div>
                                {profData?.is_verified && (
                                    <div className="pp-verified">✓ Verified</div>
                                )}
                            </div>
                            <div style={{ fontSize: 12, color: "#444", marginTop: 4 }}>
                                Member since {profile?.created_at ? fmtDate(profile.created_at) : "—"}
                            </div>
                        </div>
                    </div>

                    {/* Professional details card */}
                    {profData && (
                        <div className="pp-info-card">
                            <div className="pp-info-item">
                                <span className="pp-info-label">Category</span>
                                <span className="pp-info-val">{profData.category}</span>
                            </div>
                            <div className="pp-info-item">
                                <span className="pp-info-label">Experience</span>
                                <span className="pp-info-val">{profData.experience}</span>
                            </div>
                            <div className="pp-info-item">
                                <span className="pp-info-label">Rate / hr</span>
                                <span className="pp-info-val price">₹{profData.price?.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="pp-info-item pp-bio">
                                "{profData.bio}"
                            </div>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="pp-stats">
                        <div className="pp-stat">
                            <div className="pp-stat-num white">{bookings.length}</div>
                            <div className="pp-stat-label">Total Bookings</div>
                        </div>
                        <div className="pp-stat">
                            <div className="pp-stat-num green">
                                {bookings.filter(b => b.status === "paid" || b.status === "confirmed").length}
                            </div>
                            <div className="pp-stat-label">Completed</div>
                        </div>
                        <div className="pp-stat">
                            <div className="pp-stat-num yellow">₹{totalEarned.toLocaleString("en-IN")}</div>
                            <div className="pp-stat-label">Total Earned</div>
                        </div>
                    </div>

                    {/* Booking timeline */}
                    <div className="pp-section-head">
                        <span className="pp-section-title">Incoming Bookings</span>
                        <div className="pp-section-line" />
                        <span className="pp-section-count">{bookings.length}</span>
                    </div>

                    {bookings.length === 0 ? (
                        <div className="pp-empty">No bookings received yet.</div>
                    ) : (
                        <div className="pp-timeline">
                            {bookings.map((b, i) => {
                                const dotColor = STATUS_COLOR[b.status] || "#555";
                                const initials = b.user_name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "U";
                                return (
                                    <div className="pp-tl-item" key={b.id}
                                        style={{ animationDelay: `${i * 0.07}s` }}>
                                        <div className="pp-tl-dot" style={{ borderColor: dotColor }} />
                                        <div className="pp-tl-card">
                                            <div className="pp-tl-header">
                                                <div className="pp-user-badge">
                                                    <div className="pp-user-avatar">{initials}</div>
                                                    <div>
                                                        <div className="pp-user-name">{b.user_name}</div>
                                                        <div className="pp-user-label">User</div>
                                                    </div>
                                                </div>
                                                <div className="pp-tl-status"
                                                    style={{
                                                        background: STATUS_BG[b.status] || "rgba(255,255,255,0.05)",
                                                        color: dotColor,
                                                        borderColor: `${dotColor}33`,
                                                    }}>
                                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                                                    {b.status.replace(/_/g, " ")}
                                                </div>
                                            </div>

                                            <div className="pp-tl-details">
                                                <div>
                                                    <div className="pp-tl-dl">Date</div>
                                                    <div className="pp-tl-dv">{b.scheduled_date ? fmtDate(b.scheduled_date) : "—"}</div>
                                                </div>
                                                <div>
                                                    <div className="pp-tl-dl">Time</div>
                                                    <div className="pp-tl-dv">{b.time_slot ? fmtTime(b.time_slot) : "—"}</div>
                                                </div>
                                                <div>
                                                    <div className="pp-tl-dl">Earned</div>
                                                    <div className="pp-tl-dv earned">₹{b.amount?.toLocaleString("en-IN") || "—"}</div>
                                                </div>
                                            </div>

                                            <div className="pp-tl-footer">
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