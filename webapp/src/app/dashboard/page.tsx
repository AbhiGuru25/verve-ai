import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
    const user = await currentUser();

    return (
        <div className="min-h-screen bg-[#0e0c1a] text-white font-[family-name:var(--font-dm-sans)]">
            {/* Top bar */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-white/8">
                <Link href="/" className="flex items-center gap-2 font-[family-name:var(--font-syne)] font-extrabold text-lg tracking-[2px]">
                    <img src="/logo.png" alt="Verve AI" className="w-7 h-7 rounded-md" />
                    VERVE<span className="text-[#c41e3a]">AI</span>
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-white/50">
                        Welcome, {user?.firstName || "there"}
                    </span>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-9 h-9",
                            },
                        }}
                    />
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-8 py-16">
                <h1 className="font-[family-name:var(--font-syne)] text-3xl font-extrabold mb-2">
                    Dashboard
                </h1>
                <p className="text-white/40 mb-12">
                    Your AI command center. Choose a specialist to get started.
                </p>

                {/* AI Specialist Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { slug: "general", icon: "🧠", name: "General AI", desc: "Chat with a general-purpose AI assistant", color: "#c41e3a" },
                        { slug: "legal", icon: "⚖️", name: "Legal Expert", desc: "Contract analysis, compliance, legal research", color: "#6b1fa8" },
                        { slug: "code", icon: "💻", name: "Code Expert", desc: "Debug, write, and review code in 50+ languages", color: "#3b82f6" },
                        { slug: "finance", icon: "📊", name: "Finance Expert", desc: "Financial modeling, analysis, and reports", color: "#10b981" },
                        { slug: "medical", icon: "🏥", name: "Medical Expert", desc: "Medical research and health information", color: "#f59e0b" },
                        { slug: "creative", icon: "🎨", name: "Creative Expert", desc: "Writing, design ideas, and creative content", color: "#ec4899" },
                    ].map((specialist, i) => (
                        <Link
                            href={`/dashboard/chat/${specialist.slug}`}
                            key={i}
                            className="bg-white/5 border border-white/8 rounded-2xl p-6 text-left hover:bg-white/8 hover:border-[rgba(196,30,58,0.3)] hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 transition-transform group-hover:scale-110"
                                style={{ background: `${specialist.color}20` }}
                            >
                                {specialist.icon}
                            </div>
                            <h3 className="font-[family-name:var(--font-syne)] font-bold text-base mb-1">
                                {specialist.name}
                            </h3>
                            <p className="text-sm text-white/40 font-light">
                                {specialist.desc}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Studio Cards */}
                <h2 className="font-[family-name:var(--font-syne)] text-xl font-bold mt-16 mb-6">
                    Creative Studio
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="bg-gradient-to-br from-[#c41e3a]/10 to-[#6b1fa8]/10 border border-white/8 rounded-2xl p-8 text-left hover:border-[#c41e3a]/30 hover:-translate-y-1 transition-all duration-300">
                        <div className="text-3xl mb-4">📸</div>
                        <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg mb-1">Photo Studio</h3>
                        <p className="text-sm text-white/40 font-light">160+ templates, SDXL, Flux Pro, DALL·E 3</p>
                    </button>
                    <button className="bg-gradient-to-br from-[#6b1fa8]/10 to-[#c41e3a]/10 border border-white/8 rounded-2xl p-8 text-left hover:border-[#6b1fa8]/30 hover:-translate-y-1 transition-all duration-300">
                        <div className="text-3xl mb-4">🎬</div>
                        <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg mb-1">Video Studio</h3>
                        <p className="text-sm text-white/40 font-light">130+ templates, Kling AI, CogVideoX</p>
                    </button>
                </div>
            </main>
        </div>
    );
}
