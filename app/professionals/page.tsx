import { createClient } from '@/lib/supabase/server'
import BookingForm from '@/components/BookingForm'

export default async function ProfessionalsPage() {
    const supabase = await createClient()

    const { data: professionals, error } = await supabase
        .from('professionals')
        .select('*')
        .eq('is_verified', true)

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

                .grid {
                    max-width: 1100px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 24px;
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

                .name {
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }

                .meta {
                    font-size: 14px;
                    color: #b8b8b8;
                    margin-bottom: 6px;
                }

                .accent {
                    color: oklch(0.63 0.22 142.49);
                    font-weight: 600;
                }

                .price {
                    color: oklch(0.91 0.18 100);
                    font-weight: 600;
                }

                .bio {
                    margin: 12px 0 16px;
                    font-size: 14px;
                    color: #d0d0d0;
                    line-height: 1.5;
                }

                .booking-wrap {
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px solid rgba(255,255,255,0.06);
                }

                /* Date & Time Dropdown Styling */
                .booking-wrap input[type="date"],
                .booking-wrap input[type="time"],
                .booking-wrap select {
                    width: 100%;
                    padding: 10px 12px;
                    margin-top: 8px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #ffffff;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.2s ease;
                    backdrop-filter: blur(10px);
                }

                .booking-wrap input[type="date"]:focus,
                .booking-wrap input[type="time"]:focus,
                .booking-wrap select:focus {
                    border-color: oklch(0.63 0.22 142.49);
                    box-shadow: 0 0 0 1px oklch(0.63 0.22 142.49 / 0.4);
                }

                /* Calendar & time icon tweak (for better visibility) */
                .booking-wrap input[type="date"]::-webkit-calendar-picker-indicator,
                .booking-wrap input[type="time"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    opacity: 0.8;
                    cursor: pointer;
                }

                /* Dropdown options (limited styling support) */
                .booking-wrap select option {
                    background: #0a0a0a;
                    color: white;
                }


                /* Book Now CTA Button */
                .booking-wrap .cta-book {
                    width: 100%;
                    margin-top: 16px;
                    padding: 12px 16px;
                    border-radius: 12px;
                    border: none;
                    cursor: pointer;

                    /* Yellow → Green gradient */
                    background: linear-gradient(135deg, #facc15, oklch(0.63 0.22 142.49));
                    
                    color: #0a0a0a;
                    font-weight: 600;
                    font-size: 15px;
                    letter-spacing: 0.3px;

                    transition: all 0.25s ease;
                }

                /* Hover effect */
                .booking-wrap .cta-book:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 18px rgba(250, 204, 21, 0.25);
                    filter: brightness(1.05);
                }

                /* Active (click) */
                .booking-wrap .cta-book:active {
                    transform: scale(0.98);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                }

                /* Disabled state */
                .booking-wrap .cta-book:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    box-shadow: none;
                }
            `}</style>

            <div className="page-wrap">
                <h1 className="page-title">
                    Available <span>Professionals</span>
                </h1>

                <div className="grid">
                    {professionals.map((p, i) => (
                        <div
                            key={p.id}
                            className="card"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <h2 className="name">{p.name}</h2>

                            <p className="meta">
                                Category: <span className="accent">{p.category}</span>
                            </p>

                            <p className="meta">
                                Price: <span className="price">${p.price}</span>
                            </p>

                            <p className="meta">
                                Experience: {p.experience}
                            </p>

                            <p className="bio">{p.bio}</p>

                            <div className="booking-wrap">
                                <BookingForm
                                    professionalId={p.id}
                                    price={p.price}
                                    professionalName={p.name}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}