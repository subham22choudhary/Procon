"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Icons ────────────────────────────────────────────────────────────────────
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
        <path d="m21.854 2.147-10.94 10.939" />
    </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormState {
    fullName: string;
    email: string;
    phone: string;
    panCard: string;
    professionName: string;
    professionDescription: string;
    charge: string;
    experience: string;
}

const EMPTY: FormState = {
    fullName: "",
    email: "",
    phone: "",
    panCard: "",
    professionName: "",
    professionDescription: "",
    charge: "",
    experience: "",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProfessionalRegisterSection() {
    const [form, setForm] = useState<FormState>(EMPTY);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;


        // PAN card — auto uppercase
        if (name === "panCard") {
            setForm((p) => ({ ...p, panCard: value.toUpperCase() }));
            return;
        }

        setForm((p) => ({ ...p, [name]: value }));
    };

    const validate = (): string | null => {
        if (!form.fullName.trim()) return "Full name is required.";
        if (!form.email.trim()) return "Email is required.";
        if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email address.";
        if (!form.phone.trim()) return "Phone number is required.";
        if (form.phone.replace(/\D/g, "").length < 10) return "Enter a valid 10-digit phone number.";
        if (!form.panCard.trim()) return "PAN card number is required.";
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panCard)) return "Enter a valid PAN card (e.g. ABCDE1234F).";
        if (!form.professionName.trim()) return "Profession name is required.";
        if (!form.professionDescription.trim()) return "Profession description is required.";
        if (form.professionDescription.length > 95) return "Bio must be 95 characters or less.";
        if (!form.charge || Number(form.charge) <= 0) return "Enter a valid hourly charge.";
        if (!form.experience || Number(form.experience) < 0) return "Enter valid years of experience.";
        return null;
    };

    const handleSubmit = async () => {
        const err = validate();
        if (err) { setErrorMsg(err); setStatus("error"); return; }

        setStatus("loading");
        setErrorMsg("");

        const { error } = await supabase.from("professionals").insert([{
            name: form.fullName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            pan_card: form.panCard.trim(),
            category: form.professionName.trim(),
            bio: form.professionDescription.trim(),
            price: Number(form.charge),
            experience: `${form.experience} years`,
            is_verified: false,   // admin reviews before going live
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

        .pr-section * { box-sizing: border-box; margin: 0; padding: 0; }

        .pr-section {
          background-color: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 72px 24px 64px;
        }

        /* ── Eyebrow ── */
        .pr-eyebrow {
          display: flex; align-items: center; gap: 8px; margin-bottom: 20px;
        }
        .pr-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: oklch(0.63 0.22 142.49);
          box-shadow: 0 0 8px oklch(0.63 0.22 142.49);
        }
        .pr-eyebrow-text {
          font-size: 11px; font-weight: 500; letter-spacing: 0.18em;
          color: oklch(0.63 0.22 142.49); text-transform: uppercase;
        }

        /* ── Heading ── */
        .pr-heading {
          font-size: clamp(2.2rem, 5.5vw, 3.6rem);
          font-weight: 800; line-height: 1.1;
          text-align: center; margin-bottom: 16px; color: #fff;
        }
        .pr-heading .green { color: oklch(0.63 0.22 142.49); }
        .pr-heading .yellow { color: oklch(0.91 0.18 100); }

        .pr-subtitle {
          font-size: 1rem; color: #888; text-align: center;
          max-width: 460px; line-height: 1.7; margin-bottom: 52px; font-weight: 300;
        }

        /* ── Body ── */
        .pr-body {
          display: flex; gap: 40px; width: 100%; max-width: 980px; align-items: flex-start;
        }

        /* ── Info sidebar ── */
        .pr-info-list {
          display: flex; flex-direction: column; gap: 2px;
          min-width: 240px; flex-shrink: 0;
        }
        .pr-info-item {
          display: flex; align-items: center; gap: 16px;
          padding: 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.2s; border-radius: 4px;
        }
        .pr-info-item:hover { background: rgba(255,255,255,0.03); }
        .pr-icon-wrap {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .pr-info-label {
          font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
          color: #555; text-transform: uppercase; margin-bottom: 4px;
        }
        .pr-info-value { font-size: 0.9rem; color: #ddd; font-weight: 400; }

        /* ── Form card ── */
        .pr-form-card {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid oklch(0.63 0.22 142.49 / 0.4);
          border-radius: 20px;
          padding: 36px;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 50px oklch(0.63 0.22 142.49 / 0.05);
        }

        /* ── Section divider inside form ── */
        .pr-form-section {
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: oklch(0.63 0.22 142.49);
          margin: 24px 0 14px; padding-bottom: 8px;
          border-bottom: 1px solid oklch(0.63 0.22 142.49 / 0.2);
        }
        .pr-form-section:first-of-type { margin-top: 0; }

        .pr-row { display: flex; gap: 16px; margin-bottom: 16px; }

        .pr-field { display: flex; flex-direction: column; flex: 1; margin-bottom: 16px; }
        .pr-field:last-child { margin-bottom: 0; }

        .pr-label {
          font-size: 13px; font-weight: 500; color: #ccc; margin-bottom: 8px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .pr-label-hint { font-size: 11px; color: #555; font-weight: 400; }

        .pr-input, .pr-textarea, .pr-select {
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
        .pr-input::placeholder, .pr-textarea::placeholder { color: #444; }
        .pr-input:focus, .pr-textarea:focus, .pr-select:focus {
          border-color: oklch(0.63 0.22 142.49);
          background: rgba(17,177,14,0.04);
          box-shadow: 0 0 0 3px oklch(0.63 0.22 142.49 / 0.1);
        }
        .pr-select option { background: #111; color: #fff; }
        .pr-textarea { resize: vertical; min-height: 90px; }

        /* word count bar */
        .pr-word-bar-wrap {
          margin-top: 6px; height: 3px;
          background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden;
        }
        .pr-word-bar {
          height: 100%; border-radius: 99px;
          transition: width 0.2s, background 0.2s;
        }
        .pr-word-count {
          font-size: 11px; color: #555; margin-top: 5px; text-align: right;
        }
        .pr-word-count.warn { color: #f87171; }

        /* ── Actions ── */
        .pr-actions { display: flex; gap: 14px; margin-top: 28px; }

        .pr-btn-submit {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 14px 24px;
          background: oklch(0.63 0.22 142.49); color: #000;
          border: none; border-radius: 50px;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .pr-btn-submit:hover:not(:disabled) {
          opacity: 0.88; transform: translateY(-1px);
          box-shadow: 0 8px 24px oklch(0.63 0.22 142.49 / 0.35);
        }
        .pr-btn-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .pr-btn-clear {
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding: 14px 24px;
          background: oklch(0.91 0.18 100); color: #000;
          border: none; border-radius: 50px;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s;
        }
        .pr-btn-clear:hover { opacity: 0.88; transform: translateY(-1px); }

        /* spinner */
        .pr-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(0,0,0,0.25); border-top-color: #000;
          border-radius: 50%; animation: pr-spin 0.65s linear infinite;
        }
        @keyframes pr-spin { to { transform: rotate(360deg); } }

        /* ── Toasts ── */
        .pr-toast {
          margin-top: 16px; padding: 13px 16px;
          border-radius: 12px; font-size: 14px;
          display: flex; align-items: flex-start; gap: 10px;
        }
        .pr-toast.success {
          background: oklch(0.63 0.22 142.49 / 0.1);
          border: 1px solid oklch(0.63 0.22 142.49 / 0.3);
          color: oklch(0.63 0.22 142.49);
        }
        .pr-toast.error {
          background: rgba(220,50,50,0.08);
          border: 1px solid rgba(220,50,50,0.28);
          color: #f87171;
        }

        /* ── Footer ── */
        .pr-footer { margin-top: 56px; text-align: center; }
        .pr-footer-note { font-size: 14px; color: #555; }
        .pr-footer-note span { color: oklch(0.63 0.22 142.49); font-weight: 500; }

        /* ── Responsive ── */
        @media (max-width: 760px) {
          .pr-body { flex-direction: column; }
          .pr-info-list { width: 100%; }
          .pr-row { flex-direction: column; }
          .pr-actions { flex-direction: column; }
          .pr-form-card { padding: 24px; }
        }
      `}</style>

            <section className="pr-section">

                {/* Eyebrow */}
                <div className="pr-eyebrow">
                    <div className="pr-dot" />
                    <span className="pr-eyebrow-text">Join as a Professional</span>
                    <div className="pr-dot" />
                </div>

                {/* Heading */}
                <h2 className="pr-heading">
                    Scale <span className="green">Your</span>{" "}
                    <span className="yellow">Impact</span>
                </h2>

                <p className="pr-subtitle">
                    Register as a verified professional on Inteliglo. Our team reviews
                    your application and activates your profile within 24 hours.
                </p>

                {/* Body */}
                <div className="pr-body">

                    {/* Info sidebar */}
                    <div className="pr-info-list">
                        {[
                            {
                                icon: <UserIcon />,
                                label: "Who can apply",
                                value: "Any verified professional",
                                bg: "rgba(17,177,14,0.12)",
                                color: "oklch(0.63 0.22 142.49)",
                            },
                            {
                                icon: <ShieldIcon />,
                                label: "Verification",
                                value: "PAN + manual review",
                                bg: "rgba(161,122,0,0.15)",
                                color: "oklch(0.91 0.18 100)",
                            },
                            {
                                icon: <BriefcaseIcon />,
                                label: "Goes live in",
                                value: "Within 24 hours",
                                bg: "rgba(17,177,14,0.12)",
                                color: "oklch(0.63 0.22 142.49)",
                            },
                        ].map((item) => (
                            <div className="pr-info-item" key={item.label}>
                                <div className="pr-icon-wrap" style={{ background: item.bg, color: item.color }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="pr-info-label">{item.label}</div>
                                    <div className="pr-info-value">{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form card */}
                    <div className="pr-form-card">

                        {/* ── Personal info ── */}
                        <div className="pr-form-section">Personal Information</div>

                        <div className="pr-row">
                            <div className="pr-field" style={{ marginBottom: 0 }}>
                                <label className="pr-label" htmlFor="fullName">Full Name</label>
                                <input className="pr-input" id="fullName" name="fullName" type="text"
                                    placeholder="Rahul Sharma" value={form.fullName} onChange={handleChange} />
                            </div>
                            <div className="pr-field" style={{ marginBottom: 0 }}>
                                <label className="pr-label" htmlFor="email">Email Address</label>
                                <input className="pr-input" id="email" name="email" type="email"
                                    placeholder="rahul@example.com" value={form.email} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="pr-row" style={{ marginTop: 16 }}>
                            <div className="pr-field" style={{ marginBottom: 0 }}>
                                <label className="pr-label" htmlFor="phone">Phone Number</label>
                                <input className="pr-input" id="phone" name="phone" type="tel"
                                    placeholder="+91 9876543210" value={form.phone} onChange={handleChange} />
                            </div>
                            <div className="pr-field" style={{ marginBottom: 0 }}>
                                <label className="pr-label" htmlFor="panCard">
                                    PAN Card Number
                                    <span className="pr-label-hint">e.g. ABCDE1234F</span>
                                </label>
                                <input className="pr-input" id="panCard" name="panCard" type="text"
                                    placeholder="ABCDE1234F" maxLength={10}
                                    value={form.panCard} onChange={handleChange} />
                            </div>
                        </div>

                        {/* ── Professional info ── */}
                        <div className="pr-form-section">Professional Details</div>

                        <div className="pr-row">
                            <div className="pr-field" style={{ marginBottom: 0 }}>
                                <label className="pr-label" htmlFor="professionName">Profession / Category</label>
                                <input className="pr-input" id="professionName" name="professionName" type="text"
                                    placeholder="e.g. Lawyer, Doctor, CA" value={form.professionName} onChange={handleChange} />
                            </div>
                            <div className="pr-field" style={{ marginBottom: 0 }}>
                                <label className="pr-label" htmlFor="experience">Experience (years)</label>
                                <input className="pr-input" id="experience" name="experience" type="number"
                                    placeholder="5" min="0" max="60"
                                    value={form.experience} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="pr-field" style={{ marginTop: 16 }}>
                            <label className="pr-label" htmlFor="professionDescription">
                                Short Bio
                                <span className="pr-label-hint">Max 95 characters</span>
                            </label>
                            <textarea className="pr-textarea" id="professionDescription" name="professionDescription"
                                placeholder="e.g. Tax and GST expert helping businesses save money."
                                maxLength={95}
                                value={form.professionDescription} onChange={handleChange} />
                            <div className="pr-word-bar-wrap">
                                <div className="pr-word-bar" style={{
                                    width: `${Math.min((form.professionDescription.length / 95) * 100, 100)}%`,
                                    background: form.professionDescription.length > 200
                                        ? "#f87171"
                                        : form.professionDescription.length > 160
                                            ? "oklch(0.91 0.18 100)"
                                            : "oklch(0.63 0.22 142.49)",
                                }} />
                            </div>
                            <div className={`pr-word-count${form.professionDescription.length > 200 ? " warn" : ""}`}>
                                {form.professionDescription.length} / 95 characters
                            </div>
                        </div>

                        {/* ── Pricing ── */}
                        <div className="pr-form-section">Pricing</div>

                        <div className="pr-field">
                            <label className="pr-label" htmlFor="charge">
                                Hourly Charge (₹)
                                <span className="pr-label-hint">Amount in INR</span>
                            </label>
                            <input className="pr-input" id="charge" name="charge" type="number"
                                placeholder="e.g. 1500" min="0"
                                value={form.charge} onChange={handleChange} />
                        </div>

                        {/* ── Actions ── */}
                        <div className="pr-actions">
                            <button className="pr-btn-submit" onClick={handleSubmit} disabled={status === "loading"}>
                                {status === "loading"
                                    ? <><div className="pr-spinner" /> Submitting…</>
                                    : <>Submit Application <SendIcon /></>}
                            </button>
                            <button className="pr-btn-clear" onClick={handleClear}>
                                Clear Form
                            </button>
                        </div>

                        {/* Feedback */}
                        {status === "success" && (
                            <div className="pr-toast success">
                                ✓ Application submitted! Our team will review and activate your profile within 24 hours.
                            </div>
                        )}
                        {status === "error" && errorMsg && (
                            <div className="pr-toast error">⚠ {errorMsg}</div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="pr-footer">
                    <p className="pr-footer-note">
                        Profile goes live within <span>24 hours</span> after manual verification.
                    </p>
                </footer>
            </section>
        </>
    );
}