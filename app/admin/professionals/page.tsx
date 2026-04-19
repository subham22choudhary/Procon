import { createClient } from '@/lib/supabase/server'
import ProfessionalVerifyActions from '@/components/ProfessionalVerifyActions'

export default async function AdminProfessionalsPage() {
    const supabase = await createClient()

    const { data: professionals, error } = await supabase
        .from('professionals')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return (
            <div style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: '#080808',
                color: '#f87171', fontFamily: 'Outfit, sans-serif', fontSize: '14px',
            }}>
                Error loading professionals: {error.message}
            </div>
        )
    }

    const total = professionals.length
    const verified = professionals.filter(p => p.is_verified === true).length
    const pending = professionals.filter(p => p.is_verified === false || p.is_verified === null).length

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .adm-root {
                    min-height: 100vh;
                    background: #080808;
                    font-family: 'Outfit', sans-serif;
                    color: #e0e0e0;
                    padding: 48px 24px 80px;
                }

                /* ── Header ── */
                .adm-header {
                    max-width: 1100px;
                    margin: 40px auto 40px;
                }

                .adm-eyebrow {
                    display: flex; align-items: center; gap: 8px; margin-bottom: 14px;
                }
                .adm-dot {
                    width: 7px; height: 7px; border-radius: 50%;
                    background: oklch(0.63 0.22 142.49);
                    box-shadow: 0 0 8px oklch(0.63 0.22 142.49);
                }
                .adm-eyebrow-text {
                    font-size: 11px; font-weight: 600; letter-spacing: 0.2em;
                    color: oklch(0.63 0.22 142.49); text-transform: uppercase;
                }

                .adm-title {
                    font-size: clamp(1.8rem, 4vw, 2.8rem);
                    font-weight: 800; letter-spacing: -0.025em;
                    color: #fff; margin-bottom: 10px;
                }
                .adm-title .yellow { color: oklch(0.91 0.18 100); }

                .adm-subtitle {
                    font-size: 14px; color: #555; font-weight: 300;
                }

                /* ── Stat pills ── */
                .adm-stats {
                    display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap;
                }
                .adm-stat {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 18px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 50px;
                    font-size: 13px; font-weight: 500;
                }
                .adm-stat-num {
                    font-size: 17px; font-weight: 700;
                }
                .adm-stat.all  .adm-stat-num { color: #fff; }
                .adm-stat.live .adm-stat-num { color: oklch(0.63 0.22 142.49); }
                .adm-stat.pend .adm-stat-num { color: oklch(0.91 0.18 100); }

                /* ── Table card ── */
                .adm-card {
                    max-width: 1100px;
                    margin: 0 auto;
                    background: rgba(12,12,12,0.8);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px;
                    overflow: hidden;
                    backdrop-filter: blur(12px);
                }

                /* ── Table ── */
                .adm-table {
                    width: 100%; border-collapse: collapse;
                }

                .adm-table thead tr {
                    background: rgba(255,255,255,0.03);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                }

                .adm-table th {
                    padding: 14px 20px;
                    font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
                    text-transform: uppercase; color: #444;
                    text-align: left; white-space: nowrap;
                }

                .adm-table td {
                    padding: 18px 20px;
                    font-size: 13px; color: #c0c0c0;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    vertical-align: top;
                }

                .adm-table tbody tr:last-child td { border-bottom: none; }

                .adm-table tbody tr {
                    transition: background 0.2s;
                }
                .adm-table tbody tr:hover {
                    background: rgba(255,255,255,0.02);
                }

                /* name cell */
                .adm-name { font-weight: 600; color: #fff; font-size: 14px; }
                .adm-email { font-size: 12px; color: #555; margin-top: 2px; }

                /* category badge */
                .adm-badge {
                    display: inline-block;
                    padding: 3px 10px; border-radius: 50px;
                    font-size: 11px; font-weight: 600;
                    background: oklch(0.63 0.22 142.49 / 0.12);
                    color: oklch(0.63 0.22 142.49);
                    border: 1px solid oklch(0.63 0.22 142.49 / 0.25);
                    white-space: nowrap;
                }

                /* price */
                .adm-price {
                    color: oklch(0.91 0.18 100); font-weight: 600;
                }

                /* bio */
                .adm-bio {
                    font-size: 12px; color: #666;
                    max-width: 220px; line-height: 1.5;
                }

                /* status badge */
                .adm-status {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 4px 10px; border-radius: 50px;
                    font-size: 11px; font-weight: 600; white-space: nowrap;
                }
                .adm-status.verified {
                    background: oklch(0.63 0.22 142.49 / 0.1);
                    border: 1px solid oklch(0.63 0.22 142.49 / 0.3);
                    color: oklch(0.63 0.22 142.49);
                }
                .adm-status.pending {
                    background: oklch(0.91 0.18 100 / 0.08);
                    border: 1px solid oklch(0.91 0.18 100 / 0.25);
                    color: oklch(0.91 0.18 100);
                }
                .adm-status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

                /* empty state */
                .adm-empty {
                    text-align: center; padding: 64px 24px;
                    color: #333; font-size: 14px;
                }

                /* responsive scroll */
                .adm-table-wrap { overflow-x: auto; }

                @media (max-width: 700px) {
                    .adm-table th, .adm-table td { padding: 12px 14px; }
                    .adm-bio { max-width: 140px; }
                }
            `}</style>

            <div className="adm-root">

                {/* Header */}
                <div className="adm-header">
                    <div className="adm-eyebrow">
                        <div className="adm-dot" />
                        <span className="adm-eyebrow-text">Admin Panel</span>
                    </div>
                    <h1 className="adm-title">
                        Professional <span className="yellow">Verification</span>
                    </h1>
                    <p className="adm-subtitle">
                        Review and manage all professional applications submitted to Inteliglo.
                    </p>

                    {/* Stats */}
                    <div className="adm-stats">
                        <div className="adm-stat all">
                            <span className="adm-stat-num">{total}</span>
                            <span style={{ color: '#555' }}>Total</span>
                        </div>
                        <div className="adm-stat live">
                            <span className="adm-stat-num">{verified}</span>
                            <span style={{ color: '#555' }}>Verified</span>
                        </div>
                        <div className="adm-stat pend">
                            <span className="adm-stat-num">{pending}</span>
                            <span style={{ color: '#555' }}>Pending</span>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="adm-card">
                    {professionals.length === 0 ? (
                        <div className="adm-empty">No professionals found.</div>
                    ) : (
                        <div className="adm-table-wrap">
                            <table className="adm-table">
                                <thead>
                                    <tr>
                                        <th>Professional</th>
                                        <th>Category</th>

                                        <th>PAN</th>
                                        <th>Price / hr</th>
                                        <th>Exp.</th>
                                        <th>Bio</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professionals.map((p) => (
                                        <tr key={p.id}>
                                            <td>
                                                <div className="adm-name">{p.name}</div>
                                                <div className="adm-email">{p.email || '—'}</div>
                                                <div className="adm-phone">{p.phone || '—'}</div>
                                            </td>
                                            <td>
                                                <span className="adm-badge">{p.category}</span>
                                            </td>




                                            <td style={{ fontFamily: 'monospace', fontSize: '12px', color: '#888', letterSpacing: '0.05em' }}>
                                                {p.pan_card || '—'}
                                            </td>
                                            <td>
                                                <span className="adm-price">₹{p.price}</span>
                                            </td>
                                            <td>{p.experience}</td>
                                            <td>
                                                <div className="adm-bio">{p.bio}</div>
                                            </td>
                                            <td>
                                                <span className={`adm-status ${p.is_verified ? 'verified' : 'pending'}`}>
                                                    <span className="adm-status-dot" />
                                                    {p.is_verified ? 'Verified' : 'Pending'}
                                                </span>
                                            </td>
                                            <td>
                                                <ProfessionalVerifyActions
                                                    professionalId={p.id}
                                                    isVerified={p.is_verified}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}