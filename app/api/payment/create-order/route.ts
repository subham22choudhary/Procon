import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
    try {
        const { bookingId, amount } = await req.json()

        console.log('📦 bookingId:', bookingId)
        console.log('💰 amount:', amount)
        console.log('🔑 KEY_ID:', process.env.RAZORPAY_KEY_ID ? '✅ found' : '❌ MISSING')
        console.log('🔑 SECRET:', process.env.RAZORPAY_KEY_SECRET ? '✅ found' : '❌ MISSING')

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: 'Razorpay API keys missing from .env.local' },
                { status: 500 }
            )
        }

        // Use fetch directly — avoids any SDK import issues
        const keyId = process.env.RAZORPAY_KEY_ID
        const keySecret = process.env.RAZORPAY_KEY_SECRET
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

        const razorpayRes = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`,
            },
            body: JSON.stringify({
                amount: Math.round(amount * 100),  // paise, must be integer
                currency: 'INR',
                receipt: `rcpt_${bookingId}`.slice(0, 40),
            }),
        })

        const order = await razorpayRes.json()
        console.log('📬 Razorpay response:', JSON.stringify(order))

        if (!razorpayRes.ok || !order.id) {
            return NextResponse.json(
                { error: order?.error?.description || 'Razorpay order creation failed' },
                { status: 500 }
            )
        }

        // Save transaction ID to booking
        const supabase = await createClient()
        await supabase
            .from('bookings')
            .update({
                transaction_id: order.id,
                status: 'payment_pending',
            })
            .eq('id', bookingId)

        console.log('✅ Order created:', order.id)

        return NextResponse.json({ orderId: order.id, amount: order.amount })

    } catch (err: any) {
        console.error('❌ create-order crash:', err)
        return NextResponse.json(
            { error: err?.message || 'Internal server error' },
            { status: 500 }
        )
    }
}