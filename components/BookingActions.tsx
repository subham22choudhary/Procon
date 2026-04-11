'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingActions({ bookingId, currentStatus }: {
    bookingId: string
    currentStatus: string
}) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function updateStatus(status: string) {
        setLoading(true)
        await fetch('/api/bookings', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: bookingId, status }),
        })
        setLoading(false)
        router.refresh()  // re-fetch page data
    }

    return (
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button
                onClick={() => updateStatus('confirmed')}
                disabled={loading || currentStatus === 'confirmed'}
                style={{
                    padding: '6px 14px',
                    background: currentStatus === 'confirmed' ? '#888' : 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: currentStatus === 'confirmed' ? 'not-allowed' : 'pointer',
                }}
            >
                Confirm
            </button>

            <button
                onClick={() => updateStatus('pending')}
                disabled={loading || currentStatus === 'pending'}
                style={{
                    padding: '6px 14px',
                    background: currentStatus === 'pending' ? '#888' : 'orange',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: currentStatus === 'pending' ? 'not-allowed' : 'pointer',
                }}
            >
                Pending
            </button>

            <button
                onClick={() => updateStatus('rejected')}
                disabled={loading || currentStatus === 'rejected'}
                style={{
                    padding: '6px 14px',
                    background: currentStatus === 'rejected' ? '#888' : 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: currentStatus === 'rejected' ? 'not-allowed' : 'pointer',
                }}
            >
                Reject
            </button>

            {loading && <span style={{ color: '#888' }}>Updating...</span>}
        </div>
    )
}