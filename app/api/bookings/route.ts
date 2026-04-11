import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()   // ← add await here

    const { data, error } = await supabase
        .from('bookings')
        .select('*')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
}

export async function PATCH(request: Request) {
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase
        .from('bookings')
        .update({ status: body.status })
        .eq('id', body.id)
        .select()
        .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
}