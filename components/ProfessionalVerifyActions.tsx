'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ProfessionalVerifyActions({
    professionalId,
    isVerified,
}: {
    professionalId: string
    isVerified: boolean | null
}) {
    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState<boolean | null>(isVerified)
    const router = useRouter()

    async function updateVerification(value: boolean | null) {
        setLoading(true)
        const supabase = createClient()

        const { error } = await supabase
            .from('professionals')
            .update({ is_verified: value })
            .eq('id', professionalId)

        if (!error) {
            setCurrent(value)
            router.refresh()
        }

        setLoading(false)
    }

    // null = pending, true = verified, false = rejected
    const isActive = (val: boolean | null) => current === val

    return (
        <>
            <style>{`
                .pva-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                    min-width: 120px;
                }

                .pva-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 7px 14px;
                    border-radius: 8px;
                    border: 1px solid transparent;
                    font-family: 'Outfit', sans-serif;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: opacity 0.18s, transform 0.15s, box-shadow 0.18s;
                    white-space: nowrap;
                    width: 100%;
                }

                .pva-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                }
                .pva-btn:active:not(:disabled) {
                    transform: translateY(0);
                }
                .pva-btn:disabled {
                    cursor: not-allowed;
                    opacity: 0.45;
                }

                /* ── Verify ── */
                .pva-verify {
                    background: oklch(0.63 0.22 142.49 / 0.12);
                    border-color: oklch(0.63 0.22 142.49 / 0.35);
                    color: oklch(0.63 0.22 142.49);
                }
                .pva-verify:hover:not(:disabled) {
                    background: oklch(0.63 0.22 142.49 / 0.2);
                    box-shadow: 0 4px 14px oklch(0.63 0.22 142.49 / 0.25);
                }
                .pva-verify.active {
                    background: oklch(0.63 0.22 142.49);
                    color: #000;
                    border-color: transparent;
                    opacity: 1 !important;
                    cursor: default;
                    transform: none !important;
                }

                /* ── Pending ── */
                .pva-pending {
                    background: oklch(0.91 0.18 100 / 0.08);
                    border-color: oklch(0.91 0.18 100 / 0.28);
                    color: oklch(0.91 0.18 100);
                }
                .pva-pending:hover:not(:disabled) {
                    background: oklch(0.91 0.18 100 / 0.16);
                    box-shadow: 0 4px 14px oklch(0.91 0.18 100 / 0.2);
                }
                .pva-pending.active {
                    background: oklch(0.91 0.18 100);
                    color: #000;
                    border-color: transparent;
                    opacity: 1 !important;
                    cursor: default;
                    transform: none !important;
                }

                /* ── Reject ── */
                .pva-reject {
                    background: rgba(220, 50, 50, 0.08);
                    border-color: rgba(220, 50, 50, 0.28);
                    color: #f87171;
                }
                .pva-reject:hover:not(:disabled) {
                    background: rgba(220, 50, 50, 0.16);
                    box-shadow: 0 4px 14px rgba(220, 50, 50, 0.2);
                }
                .pva-reject.active {
                    background: #dc2626;
                    color: #fff;
                    border-color: transparent;
                    opacity: 1 !important;
                    cursor: default;
                    transform: none !important;
                }

                /* spinner */
                .pva-spinner {
                    width: 11px; height: 11px;
                    border: 1.5px solid currentColor;
                    border-top-color: transparent;
                    border-radius: 50%;
                    animation: pva-spin 0.6s linear infinite;
                    flex-shrink: 0;
                }
                @keyframes pva-spin { to { transform: rotate(360deg); } }
            `}</style>

            <div className="pva-wrap">
                {/* Verify */}
                <button
                    className={`pva-btn pva-verify${isActive(true) ? ' active' : ''}`}
                    onClick={() => updateVerification(true)}
                    disabled={loading || isActive(true)}
                    title="Approve and make visible to users"
                >
                    {loading && !isActive(true)
                        ? <span className="pva-spinner" />
                        : <span>✓</span>}
                    {isActive(true) ? 'Verified' : 'Verify'}
                </button>

                {/* Pending */}
                <button
                    className={`pva-btn pva-pending${isActive(null) ? ' active' : ''}`}
                    onClick={() => updateVerification(null)}
                    disabled={loading || isActive(null)}
                    title="Reset to pending review"
                >
                    {loading && !isActive(null)
                        ? <span className="pva-spinner" />
                        : <span>⏳</span>}
                    {isActive(null) ? 'Pending' : 'Set Pending'}
                </button>

                {/* Reject */}
                <button
                    className={`pva-btn pva-reject${isActive(false) ? ' active' : ''}`}
                    onClick={() => updateVerification(false)}
                    disabled={loading || isActive(false)}
                    title="Reject this application"
                >
                    {loading && !isActive(false)
                        ? <span className="pva-spinner" />
                        : <span>✕</span>}
                    {isActive(false) ? 'Rejected' : 'Reject'}
                </button>
            </div>
        </>
    )
}