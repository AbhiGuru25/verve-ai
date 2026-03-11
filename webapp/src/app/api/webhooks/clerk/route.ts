import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
    try {
        const payload = await req.json()
        const { type, data } = payload

        if (type === 'user.created') {
            const email = data.email_addresses?.[0]?.email_address;
            const full_name = `${data.first_name || ''} ${data.last_name || ''}`.trim();

            const { error } = await supabase.from('profiles').insert({
                clerk_id: data.id,
                email: email,
                full_name: full_name,
                avatar_url: data.image_url,
            })

            if (error) {
                console.error('Error inserting profile:', error)
                return NextResponse.json({ error: error.message }, { status: 400 })
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
