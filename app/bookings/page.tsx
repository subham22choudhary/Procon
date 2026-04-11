import { createClient } from '@/lib/supabase/server'
import BookingActions from '@/components/BookingActions'

export default async function BookingsPage() {
    const supabase = await createClient()

    const { data: bookings, error } = await supabase
        .from('bookings')
        .select(`*, professionals(name, category, price)`)
        .order('created_at', { ascending: false })

    if (error) return <div>Error: {error.message}</div>

    return (
        <div style={{ padding: '24px' }}>
            <h1>All Bookings</h1>

            {bookings.length === 0 && <p>No bookings yet.</p>}

            {bookings.map(b => (
                <div key={b.id} style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    margin: '16px 0',
                    padding: '16px',
                }}>
                    <p><strong>Professional:</strong> {b.professionals?.name}</p>
                    <p><strong>Category:</strong> {b.professionals?.category}</p>
                    <p><strong>Price:</strong> ${b.professionals?.price}</p>
                    <p><strong>Date:</strong> {b.scheduled_date}</p>
                    <p><strong>Time:</strong> {b.time_slot}</p>
                    <p><strong>Status:</strong>{' '}
                        <span style={{
                            color:
                                b.status === 'confirmed' ? 'green' :
                                    b.status === 'rejected' ? 'red' : 'orange',
                            fontWeight: 'bold'
                        }}>
                            {b.status}
                        </span>
                    </p>
                    <p style={{ fontSize: '12px', color: '#888' }}>
                        Booked at: {new Date(b.created_at).toLocaleString()}
                    </p>

                    {/* Action buttons */}
                    <BookingActions bookingId={b.id} currentStatus={b.status} />
                </div>
            ))}
        </div>
    )
}