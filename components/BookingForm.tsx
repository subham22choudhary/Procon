'use client'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { auth } from "@/lib/firebase";


declare global {
    interface Window { Razorpay: any }
}

export default function BookingForm({
    professionalId,
    price,
    professionalName,
}: {
    professionalId: string
    price: number
    professionalName: string
}) {
    const [date, setDate] = useState('')
    const [timeSlot, setTimeSlot] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const loadRazorpayScript = () =>
        new Promise<boolean>((resolve) => {
            if (document.getElementById('razorpay-script')) return resolve(true)
            const script = document.createElement('script')
            script.id = 'razorpay-script'
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })

    async function handleBook() {
        if (!date || !timeSlot) {
            setMessage('Please select a date and time.')
            return
        }

        setLoading(true)
        setMessage('')
        const supabase = createClient()

        // 1. Create booking row
        const { data: booking, error } = await supabase
            .from('bookings')
            .insert({
                professional_id: professionalId,
                scheduled_date: date,
                time_slot: timeSlot,
                status: 'pending',
                amount: price,
                user_firebase_uid: auth.currentUser?.uid ?? null,  // ← add this
            })
            .select()
            .single()

        if (error || !booking) {
            setMessage('Booking failed: ' + error?.message)
            setLoading(false)
            return
        }

        // 2. Create Razorpay order via API
        // 2. Create Razorpay order via API
        const res = await fetch('/api/payment/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId: booking.id, amount: price }),
        })

        const orderData = await res.json()
        console.log('Order API response:', orderData)  // 👈 add this

        if (!orderData.orderId) {
            setMessage(orderData.error || 'Could not create payment order. Try again.')
            setLoading(false)
            return
        }

        const orderId = orderData.orderId

        // 3. Load Razorpay SDK and open checkout popup
        await loadRazorpayScript()

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: price * 100,
            currency: 'INR',
            name: 'Inteliglo',
            description: `Booking with ${professionalName}`,
            order_id: orderId,
            prefill: { name: '', email: '', contact: '' },
            theme: { color: '#11b10e' },

            handler: async (response: any) => {
                // 4. Verify payment on server
                const verify = await fetch('/api/payment/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(response),
                })
                const result = await verify.json()

                if (result.success) {
                    setMessage('success')
                    setDate('')
                    setTimeSlot('')
                } else {
                    setMessage('verify_failed')
                }
                setLoading(false)
            },

            modal: {
                ondismiss: () => {
                    setMessage('cancelled')
                    setLoading(false)
                },
            },
        }

        new window.Razorpay(options).open()
    }

    return (
        <>
            <style>{`
                .bf-wrap {
                    margin-top: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .bf-input,
                .bf-select {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.10);
                    border-radius: 10px;
                    padding: 10px 14px;
                    color: #e8e8e8;
                    font-family: 'Outfit', sans-serif;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    appearance: none;
                    -webkit-appearance: none;
                }

                .bf-input:focus,
                .bf-select:focus {
                    border-color: oklch(0.63 0.22 142.49);
                    box-shadow: 0 0 0 3px oklch(0.63 0.22 142.49 / 0.15);
                }

                /* Style the date picker icon color */
                .bf-input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(0.6);
                    cursor: pointer;
                }

                .bf-select option {
                    background: #111;
                    color: #e8e8e8;
                }

                .bf-btn {
                    width: 100%;
                    padding: 12px;
                    background: oklch(0.63 0.22 142.49);
                    color: #000;
                    border: none;
                    border-radius: 50px;
                    font-family: 'Outfit', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    margin-top: 2px;
                }

                .bf-btn:hover:not(:disabled) {
                    opacity: 0.85;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px oklch(0.63 0.22 142.49 / 0.38);
                }

                .bf-btn:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
                    transform: none;
                }

                .bf-spinner {
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(0, 0, 0, 0.25);
                    border-top-color: #000;
                    border-radius: 50%;
                    animation: bf-spin 0.65s linear infinite;
                }
                @keyframes bf-spin { to { transform: rotate(360deg); } }

                .bf-msg {
                    font-size: 13px;
                    border-radius: 8px;
                    padding: 9px 12px;
                    font-family: 'Outfit', sans-serif;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .bf-msg.success {
                    background: oklch(0.63 0.22 142.49 / 0.10);
                    border: 1px solid oklch(0.63 0.22 142.49 / 0.30);
                    color: oklch(0.63 0.22 142.49);
                }
                .bf-msg.error {
                    background: rgba(220, 50, 50, 0.08);
                    border: 1px solid rgba(220, 50, 50, 0.25);
                    color: #f87171;
                }
                .bf-msg.warning {
                    background: oklch(0.91 0.18 100 / 0.08);
                    border: 1px solid oklch(0.91 0.18 100 / 0.25);
                    color: oklch(0.91 0.18 100);
                }
            `}</style>

            <div className="bf-wrap">
                {/* Date picker */}
                <input
                    className="bf-input"
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}  // no past dates
                    onChange={e => setDate(e.target.value)}
                />

                {/* Time slot selector */}
                <select
                    className="bf-select"
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                >
                    <option value="">Select time slot</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                </select>

                {/* Pay button */}
                <button
                    className="bf-btn"
                    onClick={handleBook}
                    disabled={loading}
                >
                    {loading ? (
                        <><div className="bf-spinner" /> Processing…</>
                    ) : (
                        <>Pay ₹{price} &amp; Book</>
                    )}
                </button>

                {/* Feedback messages */}
                {message === 'success' && (
                    <div className="bf-msg success">
                        ✓ Payment successful! Booking confirmed.
                    </div>
                )}
                {message === 'verify_failed' && (
                    <div className="bf-msg error">
                        ⚠ Payment verification failed. Contact support.
                    </div>
                )}
                {message === 'cancelled' && (
                    <div className="bf-msg warning">
                        Payment cancelled.
                    </div>
                )}
                {message && !['success', 'verify_failed', 'cancelled'].includes(message) && (
                    <div className="bf-msg error">{message}</div>
                )}
            </div>
        </>
    )
}