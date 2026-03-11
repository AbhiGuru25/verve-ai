import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { message, specialist } = await req.json()

        // Route to correct model based on specialist
        const systemPrompts: Record<string, string> = {
            legal: "You are an expert legal AI...",
            finance: "You are an expert financial AI...",
            code: "You are an expert coding AI...",
            medical: "You are an expert medical AI...",
            creative: "You are an expert creative AI...",
            general: "You are a general purpose AI...",
        }

        const systemPrompt = systemPrompts[specialist] || systemPrompts['general']

        // NOTE: Replace with actual Anthropic API call once ANTHROPIC_API_KEY is available in .env.local
        // For now, we mock the response since we don't have the API key yet.
        /*
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY as string,
            'content-type': 'application/json',
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-opus-20240229',
            max_tokens: 2048,
            system: systemPrompt,
            messages: [{ role: 'user', content: message }]
          })
        })
    
        const data = await response.json()
        return NextResponse.json({ reply: data.content[0].text })
        */

        return NextResponse.json({
            reply: `Mock response from ${specialist} specialist AI. You said: "${message}"`
        })

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
