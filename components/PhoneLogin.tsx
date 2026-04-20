"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

declare global { interface Window { recaptchaVerifier: RecaptchaVerifier } }

// ── Icons ─────────────────────────────────────────────────────────────────────
const UserIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

const BriefcaseIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
);

const ArrowLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
);

type Step = "role" | "phone" | "otp" | "setup" | "done";
type Role = "user" | "professional" | null;

export default function PhoneLogin() {
    const [step, setStep] = useState<Step>("role");
    const [role, setRole] = useState<Role>(null);
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [isNewUser, setIsNewUser] = useState(false);

    const confirmRef = useRef<ConfirmationResult | null>(null);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (countdown <= 0) return;
        const t = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    // ── reCAPTCHA ─────────────────────────────────────────────────────────────
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth, "recaptcha-container", { size: "invisible" }
            );
        }
    };

    // ── Step 1: Send OTP ──────────────────────────────────────────────────────
    const handleSendOtp = async () => {
        setError("");
        if (!phone || phone.replace(/\D/g, "").length < 10) {
            setError("Enter a valid phone number with country code.");
            return;
        }
        setLoading(true);
        try {
            setupRecaptcha();
            const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
            confirmRef.current = confirmation;
            setStep("otp");
            setCountdown(30);
        } catch (err: any) {
            setError(err.message || "Failed to send OTP. Try again.");
            window.recaptchaVerifier?.clear();
            // @ts-ignore
            window.recaptchaVerifier = null;
        } finally {
            setLoading(false);
        }
    };

    // ── OTP input handlers ────────────────────────────────────────────────────
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const next = [...otp];
        next[index] = value.slice(-1);
        setOtp(next);
        if (value && index < 5) inputsRef.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0)
            inputsRef.current[index - 1]?.focus();
    };

    // ── Step 2: Verify OTP ────────────────────────────────────────────────────
    const handleVerify = async () => {
        const code = otp.join("");
        if (code.length < 6) { setError("Enter the full 6-digit OTP."); return; }
        setError("");
        setLoading(true);
        try {
            const result = await confirmRef.current!.confirm(code);
            const uid = result.user.uid;

            // Check if profile already exists in Supabase
            const { data: existing } = await supabase
                .from("profiles")
                .select("*")
                .eq("firebase_uid", uid)
                .single();

            if (existing) {
                // Returning user — redirect based on their role
                redirectByRole(existing.role);
            } else {
                // New user — need name setup
                setIsNewUser(true);
                setStep("setup");
            }
        } catch {
            setError("Invalid OTP. Please try again.");
            setOtp(["", "", "", "", "", ""]);
            inputsRef.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    // ── Step 3: Save profile ──────────────────────────────────────────────────
    const handleSetup = async () => {
        if (!fullName.trim()) { setError("Please enter your full name."); return; }
        setError("");
        setLoading(true);

        try {
            const uid = auth.currentUser?.uid;
            if (!uid) throw new Error("No authenticated user");

            await supabase.from("profiles").insert([{
                firebase_uid: uid,
                phone: phone,
                role: role!,
                full_name: fullName.trim(),
                is_setup: true,
            }]);

            // If professional → also pre-fill their name in professionals table
            // (they still need full registration via /register)
            setStep("done");
            setTimeout(() => redirectByRole(role!), 1200);
        } catch (err: any) {
            setError(err.message || "Failed to save profile.");
        } finally {
            setLoading(false);
        }
    };

    const redirectByRole = (r: string) => {
        if (r === "professional") {
            router.push("/dashboard");
        } else {
            router.push("/professionals");
        }
    };

    const handleResend = async () => {
        setOtp(["", "", "", "", "", ""]);
        setError("");
        // @ts-ignore
        window.recaptchaVerifier = null;
        await handleSendOtp();
    };

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

                .pl-root {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    background:
                        radial-gradient(circle at top, rgba(120,255,180,0.08), transparent 45%),
                        radial-gradient(circle at bottom right, rgba(255,230,120,0.06), transparent 35%),
                        #050505;
                    font-family: 'Outfit', sans-serif;
                }

                .pl-card {
                    width: 100%;
                    max-width: 440px;
                    padding: 36px 32px;
                    border-radius: 24px;
                    background: rgba(10,10,10,0.75);
                    border: 1px solid rgba(255,255,255,0.07);
                    backdrop-filter: blur(20px) saturate(160%);
                    box-shadow:
                        0 8px 40px rgba(0,0,0,0.4),
                        0 0 0 1px rgba(255,255,255,0.04),
                        0 1px 0 0 oklch(0.63 0.22 142.49 / 0.12) inset;
                    color: #fff;
                    animation: pl-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
                    opacity: 0;
                    transform: translateY(18px);
                }
                @keyframes pl-up { to { opacity:1; transform:translateY(0); } }

                /* ── Logo ── */
                .pl-logo {
                    font-size: 1.2rem;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    color: #fff;
                    margin-bottom: 28px;
                }
                .pl-logo .g { color: oklch(0.63 0.22 142.49); }
                .pl-logo .y { color: oklch(0.91 0.18 100); }

                /* ── Back button ── */
                .pl-back {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: none;
                    border: none;
                    color: #555;
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px;
                    cursor: pointer;
                    padding: 0;
                    margin-bottom: 20px;
                    transition: color 0.2s;
                }
                .pl-back:hover { color: #aaa; }

                /* ── Headings ── */
                .pl-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 6px;
                    letter-spacing: -0.02em;
                }
                .pl-sub {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 28px;
                    line-height: 1.5;
                    font-weight: 300;
                }
                .pl-sub em { font-style: normal; color: oklch(0.63 0.22 142.49); }

                /* ── Role cards ── */
                .pl-roles {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: 4px;
                }

                .pl-role-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    padding: 24px 16px;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.08);
                    background: rgba(255,255,255,0.03);
                    cursor: pointer;
                    transition: border-color 0.2s, background 0.2s, transform 0.15s;
                    text-align: center;
                }
                .pl-role-card:hover {
                    border-color: oklch(0.63 0.22 142.49 / 0.5);
                    background: oklch(0.63 0.22 142.49 / 0.06);
                    transform: translateY(-2px);
                }
                .pl-role-card.selected {
                    border-color: oklch(0.63 0.22 142.49);
                    background: oklch(0.63 0.22 142.49 / 0.1);
                }
                .pl-role-card.pro.selected {
                    border-color: oklch(0.91 0.18 100);
                    background: oklch(0.91 0.18 100 / 0.08);
                }
                .pl-role-card.pro:hover {
                    border-color: oklch(0.91 0.18 100 / 0.5);
                    background: oklch(0.91 0.18 100 / 0.06);
                }

                .pl-role-icon {
                    width: 52px; height: 52px;
                    border-radius: 14px;
                    display: flex; align-items: center; justify-content: center;
                }
                .pl-role-card:not(.pro) .pl-role-icon {
                    background: oklch(0.63 0.22 142.49 / 0.12);
                    color: oklch(0.63 0.22 142.49);
                }
                .pl-role-card.pro .pl-role-icon {
                    background: oklch(0.91 0.18 100 / 0.1);
                    color: oklch(0.91 0.18 100);
                }

                .pl-role-label {
                    font-size: 15px;
                    font-weight: 700;
                    color: #fff;
                }
                .pl-role-desc {
                    font-size: 12px;
                    color: #555;
                    line-height: 1.4;
                }

                /* Continue button after role select */
                .pl-role-cta {
                    width: 100%;
                    margin-top: 16px;
                    padding: 14px;
                    background: oklch(0.63 0.22 142.49);
                    color: #000;
                    border: none;
                    border-radius: 50px;
                    font-family: 'Outfit', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
                }
                .pl-role-cta:hover:not(:disabled) {
                    opacity: 0.85;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px oklch(0.63 0.22 142.49 / 0.38);
                }
                .pl-role-cta:disabled { opacity: 0.35; cursor: not-allowed; }

                /* ── Input ── */
                .pl-label {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: oklch(0.91 0.18 100);
                    margin-bottom: 8px;
                    display: block;
                }

                .pl-input {
                    width: 100%;
                    padding: 14px 16px;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.09);
                    background: rgba(255,255,255,0.04);
                    color: #fff;
                    font-family: 'Outfit', sans-serif;
                    font-size: 15px;
                    margin-bottom: 16px;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .pl-input:focus {
                    border-color: oklch(0.63 0.22 142.49);
                    box-shadow: 0 0 0 3px oklch(0.63 0.22 142.49 / 0.15);
                }
                .pl-input::placeholder { color: #333; }

                /* ── OTP boxes ── */
                .pl-otp-row {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 20px;
                }
                .pl-otp-box {
                    flex: 1;
                    aspect-ratio: 1;
                    max-width: 58px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: 700;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.09);
                    background: rgba(255,255,255,0.04);
                    color: #fff;
                    font-family: 'Outfit', sans-serif;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    caret-color: oklch(0.63 0.22 142.49);
                }
                .pl-otp-box:focus {
                    border-color: oklch(0.63 0.22 142.49);
                    box-shadow: 0 0 0 3px oklch(0.63 0.22 142.49 / 0.15);
                }
                .pl-otp-box.filled {
                    border-color: oklch(0.63 0.22 142.49 / 0.5);
                    background: oklch(0.63 0.22 142.49 / 0.08);
                }

                /* ── Primary button ── */
                .pl-btn {
                    width: 100%;
                    padding: 14px;
                    border-radius: 50px;
                    border: none;
                    font-family: 'Outfit', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    background: linear-gradient(135deg, oklch(0.63 0.22 142.49), oklch(0.91 0.18 100));
                    color: #050505;
                    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .pl-btn:hover:not(:disabled) {
                    opacity: 0.85;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px oklch(0.63 0.22 142.49 / 0.3);
                }
                .pl-btn:disabled { opacity: 0.4; cursor: not-allowed; }

                /* ── Spinner ── */
                .pl-spinner {
                    width: 16px; height: 16px;
                    border: 2px solid rgba(0,0,0,0.25);
                    border-top-color: #000;
                    border-radius: 50%;
                    animation: pl-spin 0.65s linear infinite;
                }
                @keyframes pl-spin { to { transform: rotate(360deg); } }

                /* ── Error ── */
                .pl-error {
                    background: rgba(255,90,90,0.08);
                    border: 1px solid rgba(255,90,90,0.22);
                    padding: 11px 14px;
                    border-radius: 10px;
                    margin-bottom: 16px;
                    color: #ff8a8a;
                    font-size: 13px;
                }

                /* ── Resend ── */
                .pl-resend {
                    text-align: center;
                    margin-top: 16px;
                    font-size: 13px;
                    color: #444;
                }
                .pl-resend button {
                    background: none; border: none;
                    color: oklch(0.63 0.22 142.49);
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; font-weight: 500;
                    cursor: pointer; padding: 0;
                    transition: opacity 0.2s;
                }
                .pl-resend button:disabled { color: #444; cursor: default; }

                /* ── Role pill (shown above phone step) ── */
                .pl-role-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 12px;
                    border-radius: 50px;
                    font-size: 12px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    border: 1px solid;
                }
                .pl-role-pill.user {
                    background: oklch(0.63 0.22 142.49 / 0.1);
                    border-color: oklch(0.63 0.22 142.49 / 0.3);
                    color: oklch(0.63 0.22 142.49);
                }
                .pl-role-pill.pro {
                    background: oklch(0.91 0.18 100 / 0.08);
                    border-color: oklch(0.91 0.18 100 / 0.28);
                    color: oklch(0.91 0.18 100);
                }
                .pl-pill-dot {
                    width: 5px; height: 5px;
                    border-radius: 50%; background: currentColor;
                }

                /* ── Success ── */
                .pl-success {
                    text-align: center;
                    padding: 8px 0;
                }
                .pl-success-icon {
                    width: 56px; height: 56px;
                    border-radius: 50%;
                    background: oklch(0.63 0.22 142.49 / 0.12);
                    border: 1.5px solid oklch(0.63 0.22 142.49 / 0.4);
                    display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 16px;
                    color: oklch(0.63 0.22 142.49);
                    font-size: 24px;
                }
                .pl-success-title {
                    font-size: 1.3rem; font-weight: 700; margin-bottom: 6px;
                }
                .pl-success-sub {
                    font-size: 14px; color: #555; font-weight: 300;
                }

                /* ── Divider ── */
                .pl-divider {
                    display: flex; align-items: center; gap: 12px;
                    margin: 20px 0; color: #333; font-size: 12px;
                }
                .pl-divider::before, .pl-divider::after {
                    content: ''; flex: 1;
                    height: 1px; background: rgba(255,255,255,0.06);
                }

                /* ── Signup link ── */
                .pl-signup-link {
                    text-align: center;
                    font-size: 13px;
                    color: #444;
                    margin-top: 16px;
                }
                .pl-signup-link a {
                    color: oklch(0.63 0.22 142.49);
                    text-decoration: none;
                    font-weight: 500;
                }
                .pl-signup-link a:hover { text-decoration: underline; }
            `}</style>

            <div className="pl-root">
                <div className="pl-card">

                    {/* Logo */}
                    <div className="pl-logo">
                        Inteli<span className="g">g</span><span className="y">l</span>o
                    </div>

                    {/* ── STEP: Role selection ── */}
                    {step === "role" && (
                        <>
                            <h1 className="pl-title">Welcome back</h1>
                            <p className="pl-sub">Who are you signing in as?</p>

                            <div className="pl-roles">
                                <div
                                    className={`pl-role-card${role === "user" ? " selected" : ""}`}
                                    onClick={() => setRole("user")}
                                >
                                    <div className="pl-role-icon"><UserIcon /></div>
                                    <div>
                                        <div className="pl-role-label">User</div>
                                        <div className="pl-role-desc">Book professionals</div>
                                    </div>
                                </div>
                                <div
                                    className={`pl-role-card pro${role === "professional" ? " selected" : ""}`}
                                    onClick={() => setRole("professional")}
                                >
                                    <div className="pl-role-icon"><BriefcaseIcon /></div>
                                    <div>
                                        <div className="pl-role-label">Professional</div>
                                        <div className="pl-role-desc">Offer your services</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="pl-role-cta"
                                disabled={!role}
                                onClick={() => setStep("phone")}
                            >
                                Continue →
                            </button>

                            <div className="pl-signup-link" style={{ marginTop: 20 }}>
                                New here?{" "}
                                <a href={role === "professional" ? "/register" : "/users"}>
                                    Create an account
                                </a>
                            </div>
                        </>
                    )}

                    {/* ── STEP: Phone number ── */}
                    {step === "phone" && (
                        <>
                            <button className="pl-back" onClick={() => { setStep("role"); setError(""); }}>
                                <ArrowLeft /> Back
                            </button>

                            {/* Role pill */}
                            <div className={`pl-role-pill ${role === "professional" ? "pro" : "user"}`}>
                                <span className="pl-pill-dot" />
                                {role === "professional" ? "Professional" : "User"}
                            </div>

                            <h1 className="pl-title">Enter your number</h1>
                            <p className="pl-sub">We'll send a <em>one-time code</em> to verify.</p>

                            {error && <div className="pl-error">{error}</div>}

                            <label className="pl-label">Phone number</label>
                            <input
                                className="pl-input"
                                type="tel"
                                placeholder="+91 9876543210"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSendOtp()}
                            />

                            <button className="pl-btn" onClick={handleSendOtp} disabled={loading}>
                                {loading ? <><div className="pl-spinner" /> Sending…</> : "Send OTP →"}
                            </button>
                        </>
                    )}

                    {/* ── STEP: OTP verification ── */}
                    {step === "otp" && (
                        <>
                            <button className="pl-back" onClick={() => { setStep("phone"); setError(""); setOtp(["", "", "", "", "", ""]); }}>
                                <ArrowLeft /> Back
                            </button>

                            <div className={`pl-role-pill ${role === "professional" ? "pro" : "user"}`}>
                                <span className="pl-pill-dot" />
                                {role === "professional" ? "Professional" : "User"}
                            </div>

                            <h1 className="pl-title">Check your phone</h1>
                            <p className="pl-sub">Code sent to <em>{phone}</em></p>

                            {error && <div className="pl-error">{error}</div>}

                            <div className="pl-otp-row">
                                {otp.map((d, i) => (
                                    <input
                                        key={i}
                                        ref={el => { inputsRef.current[i] = el; }}
                                        className={`pl-otp-box${d ? " filled" : ""}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={d}
                                        onChange={e => handleOtpChange(i, e.target.value)}
                                        onKeyDown={e => handleOtpKeyDown(i, e)}
                                    />
                                ))}
                            </div>

                            <button className="pl-btn" onClick={handleVerify}
                                disabled={loading || otp.join("").length < 6}>
                                {loading ? <><div className="pl-spinner" /> Verifying…</> : "Verify & Sign in"}
                            </button>

                            <div className="pl-resend">
                                {countdown > 0
                                    ? `Resend in ${countdown}s`
                                    : <><span>Didn't get it? </span>
                                        <button onClick={handleResend}>Resend OTP</button></>}
                            </div>
                        </>
                    )}

                    {/* ── STEP: Name setup (first time only) ── */}
                    {step === "setup" && (
                        <>
                            <div className={`pl-role-pill ${role === "professional" ? "pro" : "user"}`}>
                                <span className="pl-pill-dot" />
                                {role === "professional" ? "Professional" : "User"}
                            </div>

                            <h1 className="pl-title">One last step</h1>
                            <p className="pl-sub">Tell us your name to complete setup.</p>

                            {error && <div className="pl-error">{error}</div>}

                            <label className="pl-label">Full Name</label>
                            <input
                                className="pl-input"
                                type="text"
                                placeholder="Rahul Sharma"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSetup()}
                                autoFocus
                            />

                            <button className="pl-btn" onClick={handleSetup} disabled={loading}>
                                {loading ? <><div className="pl-spinner" /> Saving…</> : "Complete Setup →"}
                            </button>
                        </>
                    )}

                    {/* ── STEP: Success ── */}
                    {step === "done" && (
                        <div className="pl-success">
                            <div className="pl-success-icon">✓</div>
                            <div className="pl-success-title">You're in!</div>
                            <p className="pl-success-sub">Redirecting you now…</p>
                        </div>
                    )}

                </div>
            </div>

            <div id="recaptcha-container" />
        </>
    );
}