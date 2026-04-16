import { createClient } from '@/lib/supabase/server'
import BookingActions from '@/components/BookingActions'

export default async function BookingsPage() {
    const supabase = await createClient()

    const { data: bookings, error } = await supabase
        .from('bookings')
        .select(`*, professionals(name, category, price)`)
        .order('created_at', { ascending: false })

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-400">
                Error: {error.message}
            </div>
        )
    }

    return (
        <>
            <style>{`
                .page-wrap {
                    min-height: 100vh;
                    padding: 40px 20px 80px;
                    background: radial-gradient(circle at top, rgba(120,255,180,0.08), transparent 60%), #050505;
                    color: white;
                    font-family: 'Outfit', sans-serif;
                }

                .page-title {
                    font-size: 32px;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 40px;
                    letter-spacing: -0.02em;
                }

                .page-title span {
                    color: oklch(0.63 0.22 142.49);
                }

                .empty {
                    text-align: center;
                    color: #b8b8b8;
                    margin-top: 40px;
                }

                .list {
                    max-width: 900px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .card {
                    padding: 20px;
                    border-radius: 18px;
                    background: rgba(10,10,10,0.6);
                    border: 1px solid rgba(255,255,255,0.07);
                    backdrop-filter: blur(18px) saturate(160%);
                    -webkit-backdrop-filter: blur(18px) saturate(160%);
                    box-shadow:
                        0 8px 32px rgba(0,0,0,0.35),
                        0 0 0 1px rgba(255,255,255,0.04),
                        0 1px 0 0 oklch(0.63 0.22 142.49 / 0.10) inset;

                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeUp 0.5s ease forwards;
                }

                .card:hover {
                    border-color: oklch(0.63 0.22 142.49 / 0.5);
                    transform: translateY(-4px);
                    transition: all 0.25s ease;
                }

                @keyframes fadeUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .row {
                    font-size: 14px;
                    margin-bottom: 6px;
                    color: #d0d0d0;
                }

                .label {
                    color: #9aa0a6;
                }

                .accent {
                    color: oklch(0.63 0.22 142.49);
                    font-weight: 600;
                }

                .price {
                    color: oklch(0.91 0.18 100);
                    font-weight: 600;
                }

                .status {
                    font-weight: 600;
                    text-transform: capitalize;
                    padding: 2px 8px;
                    border-radius: 8px;
                }

                .status.confirmed {
                    color: oklch(0.63 0.22 142.49);
                    background: oklch(0.63 0.22 142.49 / 0.12);
                }

                .status.rejected {
                    color: #ff5a5a;
                    background: rgba(255, 90, 90, 0.12);
                }

                .status.pending {
                    color: oklch(0.91 0.18 100);
                    background: oklch(0.91 0.18 100 / 0.12);
                }

                .time {
                    font-size: 12px;
                    color: #888;
                    margin-top: 6px;
                }

                .actions {
                    margin-top: 14px;
                    padding-top: 10px;
                    border-top: 1px solid rgba(255,255,255,0.06);
                }
            `}</style>

            <div className="page-wrap">
                <h1 className="page-title">
                    All <span>Bookings</span>
                </h1>

                {bookings.length === 0 && (
                    <p className="empty">No bookings yet.</p>
                )}

                <div className="list">
                    {bookings.map((b, i) => (
                        <div
                            key={b.id}
                            className="card"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <p className="row">
                                <span className="label">Professional:</span>{' '}
                                <span className="accent">{b.professionals?.name}</span>
                            </p>

                            <p className="row">
                                <span className="label">Category:</span>{' '}
                                {b.professionals?.category}
                            </p>

                            <p className="row">
                                <span className="label">Price:</span>{' '}
                                <span className="price">${b.professionals?.price}</span>
                            </p>

                            <p className="row">
                                <span className="label">Date:</span> {b.scheduled_date}
                            </p>

                            <p className="row">
                                <span className="label">Time:</span> {b.time_slot}
                            </p>

                            <p className="row">
                                <span className="label">Status:</span>{' '}
                                <span className={`status ${b.status}`}>
                                    {b.status}
                                </span>
                            </p>

                            <p className="time">
                                Booked at: {new Date(b.created_at).toLocaleString()}
                            </p>

                            <div className="actions">
                                <BookingActions
                                    bookingId={b.id}
                                    currentStatus={b.status}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}