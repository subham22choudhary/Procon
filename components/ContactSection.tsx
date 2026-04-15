"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase client ──────────────────────────────────────────────────────────
// Replace with your actual env vars (already set up in your project)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── SVG Icons ────────────────────────────────────────────────────────────────
const MailIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
);

const PhoneIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </svg>
);

const MapPinIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const SendIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
        <path d="m21.854 2.147-10.94 10.939" />
    </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────
interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface ContactInfo {
    icon: React.ReactNode;
    label: string;
    value: string;
    iconBg: string;
    iconColor: string;
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function ContactSection() {
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const contactInfo: ContactInfo[] = [
        {
            icon: <MailIcon />,
            label: "EMAIL",
            value: "hello@company.com",
            iconBg: "rgba(161,122,0,0.15)",
            iconColor: "lab(91.3413% 4.51836 106.171)",
        },
        {
            icon: <PhoneIcon />,
            label: "PHONE",
            value: "+1 (234) 567-890",
            iconBg: "rgba(17,177,14,0.12)",
            iconColor: "lab(63.0386% -59.1384 59.9589)",
        },
        {
            icon: <MapPinIcon />,
            label: "LOCATION",
            value: "San Francisco, CA",
            iconBg: "rgba(17,177,14,0.12)",
            iconColor: "lab(63.0386% -59.1384 59.9589)",
        },
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClear = () => {
        setForm({ name: "", email: "", subject: "", message: "" });
        setStatus("idle");
        setErrorMsg("");
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.subject || !form.message) {
            setErrorMsg("Please fill in all fields.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        const { error } = await supabase.from("contact_messages").insert([
            {
                name: form.name,
                email: form.email,
                subject: form.subject,
                message: form.message,
            },
        ]);

        if (error) {
            setStatus("error");
            setErrorMsg(error.message || "Something went wrong. Please try again.");
        } else {
            setStatus("success");
            setForm({ name: "", email: "", subject: "", message: "" });
        }
    };

    return (
        <>
            {/* ── Google Font ── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .contact-section * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .contact-section {
          font-family: 'DM Sans', sans-serif;
          background-color: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 72px 24px 48px;
        }

        /* ── Header ── */
        .contact-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .contact-eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: lab(63.0386% -59.1384 59.9589);
        }

        .contact-eyebrow-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: lab(63.0386% -59.1384 59.9589);
          text-transform: uppercase;
        }

        .contact-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 6vw, 3.8rem);
          font-weight: 800;
          line-height: 1.1;
          text-align: center;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .contact-heading .green {
          color: lab(63.0386% -59.1384 59.9589);
        }

        .contact-heading .yellow {
          color: lab(91.3413% 4.51836 106.171);
        }

        .contact-subtitle {
          font-size: 1rem;
          color: #888;
          text-align: center;
          max-width: 440px;
          line-height: 1.7;
          margin-bottom: 56px;
          font-weight: 300;
        }

        /* ── Layout ── */
        .contact-body {
          display: flex;
          gap: 40px;
          width: 100%;
          max-width: 960px;
          align-items: flex-start;
        }

        /* ── Contact Info ── */
        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 240px;
          flex-shrink: 0;
        }

        .contact-info-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.2s;
          border-radius: 4px;
        }

        .contact-info-item:hover {
          background: rgba(255,255,255,0.03);
        }

        .contact-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-info-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #555;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .contact-info-value {
          font-size: 0.95rem;
          color: #ddd;
          font-weight: 400;
        }

        /* ── Form Card ── */
        .contact-form-card {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 36px;
          backdrop-filter: blur(10px);
        }

        .contact-row {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .contact-label {
          font-size: 13px;
          font-weight: 500;
          color: #ccc;
          margin-bottom: 8px;
        }

        .contact-input,
        .contact-textarea {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 13px 16px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
          width: 100%;
        }

        .contact-input::placeholder,
        .contact-textarea::placeholder {
          color: #444;
        }

        .contact-input:focus,
        .contact-textarea:focus {
          border-color: lab(63.0386% -59.1384 59.9589);
          background: rgba(17,177,14,0.04);
        }

        .contact-textarea {
          resize: vertical;
          min-height: 110px;
        }

        .contact-actions {
          display: flex;
          gap: 14px;
          margin-top: 24px;
        }

        .btn-send {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
          background-color: lab(63.0386% -59.1384 59.9589);
          color: #000;
          border: none;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }

        .btn-send:hover:not(:disabled) {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .btn-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-clear {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px 24px;
          background-color: lab(91.3413% 4.51836 106.171);
          color: #000;
          border: none;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }

        .btn-clear:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* ── Feedback messages ── */
        .contact-success {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(17,177,14,0.1);
          border: 1px solid rgba(17,177,14,0.3);
          border-radius: 10px;
          font-size: 14px;
          color: lab(63.0386% -59.1384 59.9589);
        }

        .contact-error {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(220,50,50,0.1);
          border: 1px solid rgba(220,50,50,0.3);
          border-radius: 10px;
          font-size: 14px;
          color: #ff6b6b;
        }

        /* ── Footer ── */
        .contact-footer {
          margin-top: 56px;
          text-align: center;
        }

        .contact-response-time {
          font-size: 14px;
          color: #555;
          margin-bottom: 20px;
        }

        .contact-response-time span {
          color: lab(63.0386% -59.1384 59.9589);
          font-weight: 500;
        }

        .contact-footer-links {
          display: flex;
          gap: 32px;
          justify-content: center;
        }

        .contact-footer-links a {
          font-size: 13px;
          color: #444;
          text-decoration: none;
          transition: color 0.2s;
        }

        .contact-footer-links a:hover {
          color: #aaa;
        }

        /* ── Responsive ── */
        @media (max-width: 720px) {
          .contact-body {
            flex-direction: column;
          }

          .contact-info-list {
            width: 100%;
          }

          .contact-row {
            flex-direction: column;
          }
        }
      `}</style>

            <section className="contact-section">
                {/* Eyebrow */}
                <div className="contact-eyebrow">
                    <div className="contact-eyebrow-dot" />
                    <span className="contact-eyebrow-text">Get in touch</span>
                    <div className="contact-eyebrow-dot" />
                </div>

                {/* Heading */}
                <h2 className="contact-heading">
                    Let&apos;s <span className="green">connect</span>{" "}
                    <span className="yellow">today</span>
                </h2>

                {/* Subtitle */}
                <p className="contact-subtitle">
                    We&apos;d love to hear from you. Whether you have a question or just
                    want to say hello, feel free to reach out.
                </p>

                {/* Body: info + form */}
                <div className="contact-body">
                    {/* Contact info list */}
                    <div className="contact-info-list">
                        {contactInfo.map((info) => (
                            <div className="contact-info-item" key={info.label}>
                                <div
                                    className="contact-icon-wrap"
                                    style={{
                                        background: info.iconBg,
                                        color: info.iconColor,
                                    }}
                                >
                                    {info.icon}
                                </div>
                                <div>
                                    <div className="contact-info-label">{info.label}</div>
                                    <div className="contact-info-value">{info.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form card */}
                    <div className="contact-form-card">
                        {/* Row: Name + Email */}
                        <div className="contact-row">
                            <div className="contact-field">
                                <label className="contact-label" htmlFor="name">
                                    Your Name
                                </label>
                                <input
                                    className="contact-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="contact-field">
                                <label className="contact-label" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    className="contact-input"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="contact-field" style={{ marginBottom: "16px" }}>
                            <label className="contact-label" htmlFor="subject">
                                Subject
                            </label>
                            <input
                                className="contact-input"
                                id="subject"
                                name="subject"
                                type="text"
                                placeholder="How can we help?"
                                value={form.subject}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Message */}
                        <div className="contact-field">
                            <label className="contact-label" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="contact-textarea"
                                id="message"
                                name="message"
                                placeholder="Tell us more about your inquiry…"
                                value={form.message}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Actions */}
                        <div className="contact-actions">
                            <button
                                className="btn-send"
                                onClick={handleSubmit}
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? "Sending…" : "Send Message"}
                                {status !== "loading" && <SendIcon />}
                            </button>
                            <button className="btn-clear" onClick={handleClear}>
                                Clear Form
                            </button>
                        </div>

                        {/* Feedback */}
                        {status === "success" && (
                            <div className="contact-success">
                                ✓ Message sent! We&apos;ll get back to you within 2–4 hours.
                            </div>
                        )}
                        {status === "error" && errorMsg && (
                            <div className="contact-error">⚠ {errorMsg}</div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="contact-footer">
                    <p className="contact-response-time">
                        Average response time: <span>2–4 hours</span> during business hours.
                    </p>
                    <nav className="contact-footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Follow Us</a>
                    </nav>
                </footer>
            </section>
        </>
    );
}