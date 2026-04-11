'use client'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function BookingForm({ professionalId }: { professionalId: string }) {
    const [date, setDate] = useState('')
    const [timeSlot, setTimeSlot] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleBook() {
        if (!date || !timeSlot) {
            setMessage('Please select a date and time.')
            return
        }

        setLoading(true)
        const supabase = createClient()

        const { error } = await supabase.from('bookings').insert({
            professional_id: professionalId,
            scheduled_date: date,
            time_slot: timeSlot,
            status: 'pending',
        })

        setLoading(false)

        if (error) {
            setMessage('Booking failed: ' + error.message)
        } else {
            setMessage('Booking successful!')
            setDate('')
            setTimeSlot('')
        }
    }

    return (
        <div style={{ marginTop: '12px' }}>
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{ marginRight: '8px' }}
            />
            <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                style={{ marginRight: '8px' }}
            >
                <option value="">Select time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
            </select>
            <button onClick={handleBook} disabled={loading}>
                {loading ? 'Booking...' : 'Book Now'}
            </button>
            {message && <p style={{ marginTop: '8px', color: 'green' }}>{message}</p>}
        </div>
    )
}