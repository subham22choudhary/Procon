'use client'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function BookingForm({ professionalId }: { professionalId: string }) {
    const [date, setDate] = useState('')
    const supabase = createClient()

    async function handleBook() {
        const { error } = await supabase.from('bookings').insert({
            professional_id: professionalId,
            scheduled_date: date,
            time_slot: '10:00',
            status: 'pending',
        })
        if (!error) alert('Booked!')
    }

    return (
        <div>
            <input type="date" onChange={e => setDate(e.target.value)} />
            <button onClick={handleBook}>Book Now</button>
        </div>
    )
}