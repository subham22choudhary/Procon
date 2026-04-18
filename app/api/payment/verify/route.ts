import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expected = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(body)
        .digest('hex')

    if (expected !== razorpay_signature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const supabase = await createClient()
    await supabase
        .from('bookings')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('transaction_id', razorpay_order_id)

    return NextResponse.json({ success: true })
}