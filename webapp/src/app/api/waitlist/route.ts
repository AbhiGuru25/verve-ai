import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        const { error } = await supabase
            .from('waitlist')
            .insert({ email })

        if (error) {
            return NextResponse.json({ error: 'Already on list or server error' }, { status: 400 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
