"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";  // ← add this
import { auth } from "@/lib/firebase";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    ConfirmationResult,
} from "firebase/auth";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
    }
}

export default function PhoneLogin() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(0);

    const confirmRef = useRef<ConfirmationResult | null>(null);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (countdown <= 0) return;
        const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                { size: "invisible" }
            );
        }
    };

    const handleSendOtp = async () => {
        setError("");
        if (!phone || phone.length < 10) {
            setError("Please enter a valid phone number with country code.");
            return;
        }

        setLoading(true);

        try {
            setupRecaptcha();

            const confirmation = await signInWithPhoneNumber(
                auth,
                phone,
                window.recaptchaVerifier
            );

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

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const next = [...otp];
        next[index] = value.slice(-1);
        setOtp(next);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const router = useRouter();  // ← add inside component, top-level

    const handleVerify = async () => {
        const code = otp.join("");

        if (code.length < 6) {
            setError("Enter the full 6-digit OTP.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await confirmRef.current!.confirm(code);
            router.push("/");               // ← success → homepage
        } catch {
            setError("Invalid OTP. Please try again.");
            setOtp(["", "", "", "", "", ""]);
            inputsRef.current[0]?.focus();
            window.location.href = "https://www.login.com";  // ← failure → login.com
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setOtp(["", "", "", "", "", ""]);
        setError("");
        // @ts-ignore
        window.recaptchaVerifier = null;
        await handleSendOtp();
    };

    return (
        <>
            <style>{`
        .wrap {
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

        .card {
          width: 100%;
          max-width: 420px;
          padding: 32px 26px;
          border-radius: 22px;
          background: rgba(10,10,10,0.6);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(18px) saturate(160%);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.35),
            0 0 0 1px rgba(255,255,255,0.04),
            0 1px 0 0 oklch(0.63 0.22 142.49 / 0.10) inset;
          color: #fff;
          animation: fadeUp .5s ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        p {
          font-size: 14px;
          color: #b8b8b8;
          margin-bottom: 20px;
        }

        label {
          font-size: 12px;
          text-transform: uppercase;
          color: oklch(0.91 0.18 100);
          margin-bottom: 6px;
          display: block;
        }

        input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #fff;
          margin-bottom: 16px;
          outline: none;
        }

        input:focus {
          border-color: oklch(0.63 0.22 142.49);
          box-shadow: 0 0 0 3px oklch(0.63 0.22 142.49 / 0.15);
        }

        .otp-row {
          display: flex;
          gap: 10px;
          margin-bottom: 18px;
        }

        .otp-row input {
          flex: 1;
          aspect-ratio: 1;
          text-align: center;
          font-size: 18px;
          border-radius: 12px;
        }

        button {
          width: 100%;
          padding: 14px;
          border-radius: 999px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(
            135deg,
            oklch(0.63 0.22 142.49),
            oklch(0.91 0.18 100)
          );
          color: #050505;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .error {
          background: rgba(255,90,90,0.1);
          border: 1px solid rgba(255,90,90,0.2);
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 14px;
          color: #ff8a8a;
        }

        .success {
          background: oklch(0.63 0.22 142.49 / 0.12);
          border: 1px solid oklch(0.63 0.22 142.49 / 0.2);
          padding: 12px;
          border-radius: 10px;
          text-align: center;
        }
      `}</style>

            <div className="wrap">
                <div className="card">
                    {step === "phone" && (
                        <>
                            <h1>Phone Login</h1>
                            <p>Enter your number with country code</p>

                            {error && <div className="error">{error}</div>}

                            <label>Phone</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+91 9876543210"
                            />

                            <button onClick={handleSendOtp} disabled={loading}>
                                {loading ? "Sending..." : "Send OTP"}
                            </button>
                        </>
                    )}

                    {step === "otp" && (
                        <>
                            <h1>Enter OTP</h1>
                            <p>Sent to {phone}</p>

                            {error && <div className="error">{error}</div>}

                            <div className="otp-row">
                                {otp.map((d, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => { inputsRef.current[i] = el; }}
                                        value={d}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                    />
                                ))}
                            </div>

                            <button onClick={handleVerify} disabled={loading}>
                                Verify OTP
                            </button>
                        </>
                    )}

                    {step === "success" && (
                        <div className="success">Login successful</div>
                    )}

                    <div id="recaptcha-container"></div>
                </div>
            </div>
        </>
    );
}