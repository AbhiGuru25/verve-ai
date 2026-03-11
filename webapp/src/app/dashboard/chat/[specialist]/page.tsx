"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const specialists = {
    general: { icon: "🧠", name: "General AI" },
    legal: { icon: "⚖️", name: "Legal Expert" },
    code: { icon: "💻", name: "Code Expert" },
    finance: { icon: "📊", name: "Finance Expert" },
    medical: { icon: "🏥", name: "Medical Expert" },
    creative: { icon: "🎨", name: "Creative Expert" },
};

export default function ChatPage() {
    const { user } = useUser();
    const params = useParams();
    const specialistSlug = params.specialist as string;
    const specialist = specialists[specialistSlug as keyof typeof specialists] || specialists.general;

    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: `Hello ${user?.firstName || 'there'}! I am your ${specialist.name}. How can I assist you today?` }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg, specialist: specialistSlug })
            });

            if (res.ok) {
                const data = await res.json();
                setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error answering your request." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, a network error occurred." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#0e0c1a] text-white font-[family-name:var(--font-dm-sans)]">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-[#0e0c1a]/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm">
                        <span>← Back</span>
                    </Link>
                    <div className="h-6 w-[1px] bg-white/10"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                            {specialist.icon}
                        </div>
                        <div>
                            <h1 className="font-[family-name:var(--font-syne)] font-bold text-lg leading-tight">
                                {specialist.name}
                            </h1>
                            <div className="flex items-center gap-2 text-xs text-emerald-400">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Online
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Messages Area */}
            <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-[#c41e3a]' : 'bg-white/10'}`}>
                                {msg.role === 'user' ? (user?.firstName?.charAt(0) || 'U') : specialist.icon}
                            </div>
                            <div className={`px-5 py-4 rounded-2xl max-w-[80%] ${msg.role === 'user'
                                    ? 'bg-[#c41e3a]/10 border border-[#c41e3a]/30 text-white rounded-tr-sm'
                                    : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-sm'
                                }`}>
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-white/10">
                                {specialist.icon}
                            </div>
                            <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/50 rounded-tl-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area */}
            <footer className="p-6 bg-gradient-to-t from-[#0e0c1a] to-transparent">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-white/30 transition-colors">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            placeholder="Message the AI specialist..."
                            className="w-full bg-transparent text-white placeholder:text-white/30 outline-none resize-none px-4 py-3 min-h-[56px] max-h-[200px]"
                            rows={1}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center shrink-0 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                            </svg>
                        </button>
                    </form>
                    <p className="text-center text-xs text-white/30 mt-3">
                        AI can make mistakes. Consider verifying important information.
                    </p>
                </div>
            </footer>
        </div>
    );
}
