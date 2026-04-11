import { createClient } from '@/lib/supabase/server'

export default async function ProfessionalsPage() {
    const supabase = await createClient()   // ← add await here

    const { data: professionals, error } = await supabase
        .from('professionals')
        .select('*')
        .eq('is_verified', true)

    if (error) return <div>Error: {error.message}</div>

    return (
        <ul>
            {professionals.map(p => (
                <li key={p.id}>{p.name} — {p.category} — ${p.price}</li>
            ))}
        </ul>
    )
}