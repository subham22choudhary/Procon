import { createClient } from '@/lib/supabase/server'
import BookingForm from '@/components/BookingForm'

export default async function ProfessionalsPage() {
    const supabase = await createClient()

    const { data: professionals, error } = await supabase
        .from('professionals')
        .select('*')
        .eq('is_verified', true)

    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            <h1>Available Professionals</h1>
            {professionals.map(p => (
                <div key={p.id} style={{ border: '1px solid #ccc', margin: '16px', padding: '16px' }}>
                    <h2>{p.name}</h2>
                    <p>Category: {p.category}</p>
                    <p>Price: ${p.price}</p>
                    <p>Experience: {p.experience}</p>
                    <p>{p.bio}</p>

                    {/* Booking form for each professional */}
                    <BookingForm professionalId={p.id} />
                </div>
            ))}
        </div>
    )
}