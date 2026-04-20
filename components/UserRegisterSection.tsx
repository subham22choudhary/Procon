"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Icons ─────────────────────────────────────────────────────────────────────
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </svg>
);

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
        <path d="m21.854 2.147-10.94 10.939" />
    </svg>
);

// ── Indian States ──────────────────────────────────────────────────────────────
const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

// ── Types ──────────────────────────────────────────────────────────────────────
interface FormState {
    fullName: string;
    phone: string;
    email: string;
    state: string;
    pinCode: string;
    address: string;
}

const EMPTY: FormState = {
    fullName: "",
    phone: "",
    email: "",
    state: "",
    pinCode: "",
    address: "",
};

// ── Component ──────────────────────────────────────────────────────────────────
export default function UserRegisterSection() {
    const [form, setForm] = useState<FormState>(EMPTY);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        // pin code — numbers only, max 6
        if (name === "pinCode") {
            if (!/^\d*$/.test(value) || value.length > 6) return;
        }

        setForm((p) => ({ ...p, [name]: value }));
    };

    const validate = (): string | null => {
        if (!form.fullName.trim()) return "Full name is required.";
        if (!form.phone.trim()) return "Phone number is required.";
        if (form.phone.replace(/\D/g, "").length < 10)
            return "Enter a valid 10-digit phone number.";
        if (form.email && !/\S+@\S+\.\S+/.test(form.email))
            return "Enter a valid email address.";
        if (form.pinCode && form.pinCode.length !== 6)
            return "PIN code must be exactly 6 digits.";
        return null;
    };

    const handleSubmit = async () => {
        const err = validate();
        if (err) { setErrorMsg(err); setStatus("error"); return; }

        setStatus("loading");
        setErrorMsg("");

        const { error } = await supabase.from("users").insert([{
            full_name: form.fullName.trim(),
            phone: form.phone.trim(),
            email: form.email.trim() || null,
            state: form.state || null,
            pin_code: form.pinCode || null,
            address: form.address.trim() || null,
        }]);

        if (error) {
            setStatus("error");
            setErrorMsg(error.message || "Something went wrong. Please try again.");
        } else {
            setStatus("success");
            setForm(EMPTY);
        }
    };

    const handleClear = () => {
        setForm(EMPTY);
        setStatus("idle");
        setErrorMsg("");
    };

    return (
        <>
            <style>{`

        .ur-section * { box-sizing: border-box; margin: 0; padding: 0; }

        .ur-section {
          background-color: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 72px 24px 64px;
        }

        /* ── Eyebrow ── */
        .ur-eyebrow {
          display: flex; align-items: center; gap: 8px; margin-bottom: 20px;
        }
        .ur-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: oklch(0.63 0.22 142.49);
          box-shadow: 0 0 8px oklch(0.63 0.22 142.49);
        }
        .ur-eyebrow-text {
          font-size: 11px; font-weight: 500; letter-spacing: 0.18em;
          color: oklch(0.63 0.22 142.49); text-transform: uppercase;
        }

        /* ── Heading ── */
        .ur-heading {
          font-size: clamp(2.2rem, 5.5vw, 3.6rem);
          font-weight: 800; line-height: 1.1;
          text-align: center; margin-bottom: 16px; color: #fff;
          letter-spacing: -0.02em;
        }
        .ur-heading .green  { color: oklch(0.63 0.22 142.49); }
        .ur-heading .yellow { color: oklch(0.91 0.18 100); }

        .ur-subtitle {
          font-size: 1rem; color: #888; text-align: center;
          max-width: 440px; line-height: 1.7;
          margin-bottom: 52px; font-weight: 300;
        }

        /* ── Body ── */
        .ur-body {
          display: flex; gap: 40px; width: 100%;
          max-width: 960px; align-items: flex-start;
        }

        /* ── Info sidebar ── */
        .ur-info-list {
          display: flex; flex-direction: column; gap: 2px;
          min-width: 240px; flex-shrink: 0;
        }
        .ur-info-item {
          display: flex; align-items: center; gap: 16px;
          padding: 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.2s; border-radius: 4px;
        }
        .ur-info-item:hover { background: rgba(255,255,255,0.03); }
        .ur-icon-wrap {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ur-info-label {
          font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
          color: #555; text-transform: uppercase; margin-bottom: 4px;
        }
        .ur-info-value { font-size: 0.9rem; color: #ddd; font-weight: 400; }

        /* ── Form card ── */
        .ur-form-card {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid oklch(0.63 0.22 142.49 / 0.4);
          border-radius: 20px;
          padding: 36px;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 50px oklch(0.63 0.22 142.49 / 0.05);
        }

        /* ── Section label inside form ── */
        .ur-form-section {
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: oklch(0.63 0.22 142.49);
          margin: 24px 0 14px; padding-bottom: 8px;
          border-bottom: 1px solid oklch(0.63 0.22 142.49 / 0.2);
        }
        .ur-form-section:first-of-type { margin-top: 0; }

        .ur-row { display: flex; gap: 16px; margin-bottom: 16px; }

        .ur-field {
          display: flex; flex-direction: column;
          flex: 1; margin-bottom: 16px;
        }

        .ur-label {
          font-size: 13px; font-weight: 500; color: #ccc;
          margin-bottom: 8px;
          display: flex; align-items: center; gap: 6px;
        }
        .ur-required {
          color: oklch(0.63 0.22 142.49);
          font-size: 15px; line-height: 1;
        }
        .ur-optional {
          font-size: 11px; color: #444; font-weight: 400; margin-left: auto;
        }

        .ur-input, .ur-select, .ur-textarea {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 13px 16px;
          color: #fff;
          font-size: 14px;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          outline: none;
          width: 100%;
        }
        .ur-input::placeholder, .ur-textarea::placeholder { color: #444; }
        .ur-input:focus, .ur-select:focus, .ur-textarea:focus {
          border-color: oklch(0.63 0.22 142.49);
          background: rgba(17,177,14,0.04);
          box-shadow: 0 0 0 3px oklch(0.63 0.22 142.49 / 0.1);
        }
        .ur-select option { background: #111; color: #fff; }
        .ur-textarea { resize: vertical; min-height: 90px; }

        /* ── Actions ── */
        .ur-actions { display: flex; gap: 14px; margin-top: 28px; }

        .ur-btn-submit {
          flex: 1; display: flex; align-items: center;
          justify-content: center; gap: 8px; padding: 14px 24px;
          background: oklch(0.63 0.22 142.49); color: #000;
          border: none; border-radius: 50px;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .ur-btn-submit:hover:not(:disabled) {
          opacity: 0.88; transform: translateY(-1px);
          box-shadow: 0 8px 24px oklch(0.63 0.22 142.49 / 0.35);
        }
        .ur-btn-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .ur-btn-clear {
          flex: 1; display: flex; align-items: center;
          justify-content: center; padding: 14px 24px;
          background: oklch(0.91 0.18 100); color: #000;
          border: none; border-radius: 50px;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s;
        }
        .ur-btn-clear:hover { opacity: 0.88; transform: translateY(-1px); }

        /* spinner */
        .ur-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(0,0,0,0.25); border-top-color: #000;
          border-radius: 50%; animation: ur-spin 0.65s linear infinite;
        }
        @keyframes ur-spin { to { transform: rotate(360deg); } }

        /* ── Toasts ── */
        .ur-toast {
          margin-top: 16px; padding: 13px 16px;
          border-radius: 12px; font-size: 14px;
          display: flex; align-items: flex-start; gap: 10px;
        }
        .ur-toast.success {
          background: oklch(0.63 0.22 142.49 / 0.1);
          border: 1px solid oklch(0.63 0.22 142.49 / 0.3);
          color: oklch(0.63 0.22 142.49);
        }
        .ur-toast.error {
          background: rgba(220,50,50,0.08);
          border: 1px solid rgba(220,50,50,0.28);
          color: #f87171;
        }

        /* ── Footer ── */
        .ur-footer { margin-top: 56px; text-align: center; }
        .ur-footer-note { font-size: 14px; color: #555; font-weight: 300; }
        .ur-footer-note span { color: oklch(0.63 0.22 142.49); font-weight: 500; }

        /* ── Responsive ── */
        @media (max-width: 740px) {
          .ur-body        { flex-direction: column; }
          .ur-info-list   { width: 100%; }
          .ur-row         { flex-direction: column; }
          .ur-actions     { flex-direction: column; }
          .ur-form-card   { padding: 24px; }
        }
      `}</style>

            <section className="ur-section">

                {/* Eyebrow */}
                <div className="ur-eyebrow">
                    <div className="ur-dot" />
                    <span className="ur-eyebrow-text">Create Your Account</span>
                    <div className="ur-dot" />
                </div>

                {/* Heading */}
                <h2 className="ur-heading">
                    Join <span className="green">Inteliglo</span>{" "}
                    <span className="yellow">today</span>
                </h2>

                <p className="ur-subtitle">
                    Register to connect with verified professionals across India.
                    Only your name and phone are required to get started.
                </p>

                {/* Body */}
                <div className="ur-body">

                    {/* Info sidebar */}
                    <div className="ur-info-list">
                        {[
                            {
                                icon: <UserIcon />,
                                label: "Who can register",
                                value: "Anyone in India",
                                bg: "rgba(17,177,14,0.12)",
                                color: "oklch(0.63 0.22 142.49)",
                            },
                            {
                                icon: <PhoneIcon />,
                                label: "Required fields",
                                value: "Name & Phone only",
                                bg: "rgba(161,122,0,0.15)",
                                color: "oklch(0.91 0.18 100)",
                            },
                            {
                                icon: <MapPinIcon />,
                                label: "Coverage",
                                value: "All states & UTs",
                                bg: "rgba(17,177,14,0.12)",
                                color: "oklch(0.63 0.22 142.49)",
                            },
                        ].map((item) => (
                            <div className="ur-info-item" key={item.label}>
                                <div className="ur-icon-wrap"
                                    style={{ background: item.bg, color: item.color }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="ur-info-label">{item.label}</div>
                                    <div className="ur-info-value">{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form card */}
                    <div className="ur-form-card">

                        {/* ── Basic info ── */}
                        <div className="ur-form-section">Basic Information</div>

                        <div className="ur-row">
                            <div className="ur-field" style={{ marginBottom: 0 }}>
                                <label className="ur-label" htmlFor="fullName">
                                    Full Name
                                    <span className="ur-required">*</span>
                                </label>
                                <input className="ur-input" id="fullName" name="fullName"
                                    type="text" placeholder="Rahul Sharma"
                                    value={form.fullName} onChange={handleChange} />
                            </div>
                            <div className="ur-field" style={{ marginBottom: 0 }}>
                                <label className="ur-label" htmlFor="phone">
                                    Phone Number
                                    <span className="ur-required">*</span>
                                </label>
                                <input className="ur-input" id="phone" name="phone"
                                    type="tel" placeholder="+91 9876543210"
                                    value={form.phone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="ur-field" style={{ marginTop: 16 }}>
                            <label className="ur-label" htmlFor="email">
                                Email Address
                                <span className="ur-optional">Optional</span>
                            </label>
                            <input className="ur-input" id="email" name="email"
                                type="email" placeholder="rahul@example.com"
                                value={form.email} onChange={handleChange} />
                        </div>

                        {/* ── Address ── */}
                        <div className="ur-form-section">Address Details</div>

                        <div className="ur-row">
                            <div className="ur-field" style={{ marginBottom: 0 }}>
                                <label className="ur-label" htmlFor="state">
                                    State
                                    <span className="ur-optional">Optional</span>
                                </label>
                                <select className="ur-select" id="state" name="state"
                                    value={form.state} onChange={handleChange}>
                                    <option value="">Select state</option>
                                    {INDIAN_STATES.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="ur-field" style={{ marginBottom: 0 }}>
                                <label className="ur-label" htmlFor="pinCode">
                                    PIN Code
                                    <span className="ur-optional">Optional</span>
                                </label>
                                <input className="ur-input" id="pinCode" name="pinCode"
                                    type="text" placeholder="110001"
                                    inputMode="numeric" maxLength={6}
                                    value={form.pinCode} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="ur-field" style={{ marginTop: 16, marginBottom: 0 }}>
                            <label className="ur-label" htmlFor="address">
                                Full Address
                                <span className="ur-optional">Optional</span>
                            </label>
                            <textarea className="ur-textarea" id="address" name="address"
                                placeholder="House no., Street, Area, City…"
                                value={form.address} onChange={handleChange} />
                        </div>

                        {/* ── Actions ── */}
                        <div className="ur-actions">
                            <button className="ur-btn-submit"
                                onClick={handleSubmit} disabled={status === "loading"}>
                                {status === "loading"
                                    ? <><div className="ur-spinner" /> Registering…</>
                                    : <>Create Account <SendIcon /></>}
                            </button>
                            <button className="ur-btn-clear" onClick={handleClear}>
                                Clear Form
                            </button>
                        </div>

                        {/* Feedback */}
                        {status === "success" && (
                            <div className="ur-toast success">
                                ✓ Account created successfully! Welcome to Inteliglo.
                            </div>
                        )}
                        {status === "error" && errorMsg && (
                            <div className="ur-toast error">⚠ {errorMsg}</div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="ur-footer">
                    <p className="ur-footer-note">
                        Only <span>Name & Phone</span> are required — everything else is optional.
                    </p>
                </footer>
            </section>
        </>
    );
}