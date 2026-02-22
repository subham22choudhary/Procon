// app/profesionals-collection/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Professionals Collection",
    description: "Choose from Lawyers, Doctors, and Chartered Accountants.",
};

type ProCard = {
    role: "Lawyer" | "Doctor" | "CA";
    headline: string;
    description: string;
    highlights: string[];
    ctaText: string;
    href: string;
};

const CARDS: ProCard[] = [
    {
        role: "Lawyer",
        headline: "Legal Guidance You Can Trust",
        description:
            "Connect with verified lawyers for consultation, documentation, and case support — securely and professionally.",
        highlights: ["Consultation & case review", "Contracts & documentation", "Verified professionals"],
        ctaText: "Explore Lawyers",
        href: "/profesionals-collection/lawyer",
    },
    {
        role: "Doctor",
        headline: "Care That Fits Your Schedule",
        description:
            "Find doctors across specialties, book appointments, and get advice with a smooth, privacy-first experience.",
        highlights: ["Specialists & physicians", "Appointment-friendly", "Health-first approach"],
        ctaText: "Explore Doctors",
        href: "/profesionals-collection/doctor",
    },
    {
        role: "CA",
        headline: "Clear, Confident Financial Decisions",
        description:
            "Work with Chartered Accountants for tax planning, filings, compliance, and business accounting support.",
        highlights: ["Tax planning & filing", "GST & compliance", "Business accounting"],
        ctaText: "Explore CAs",
        href: "/profesionals-collection/ca",
    },
];

function Icon({ role }: { role: ProCard["role"] }) {
    const common = {
        width: 22,
        height: 22,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: "shrink-0",
    } as const;

    if (role === "Lawyer") {
        return (
            <svg {...common}>
                <path
                    d="M9 7h6M12 3v4m7 3-4 4m-6 0-4-4M6 14h12M7 21h10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        );
    }
    if (role === "Doctor") {
        return (
            <svg {...common}>
                <path
                    d="M12 21s7-4.35 7-11a4 4 0 0 0-7-2.65A4 4 0 0 0 5 10c0 6.65 7 11 7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 9v4m-2-2h4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        );
    }
    return (
        <svg {...common}>
            <path
                d="M4 7h16M7 7v14m10-14v14M4 21h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M9.5 12.5c.6-1 1.6-1.5 2.8-1.5 1.7 0 3.2 1.2 3.2 3s-1.5 3-3.2 3c-1.2 0-2.2-.5-2.8-1.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ProfesionalsCollectionPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Profesionals Collection
                    </div>

                    <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Choose the right professional — fast.
                    </h1>

                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
                        Select a category to view a curated list. Compare experience, reviews, fees, and availability.
                    </p>

                    <div className="mt-6 h-px w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" />
                </div>

                <section className="grid gap-6 md:grid-cols-3">
                    {CARDS.map((c) => (
                        <article
                            key={c.role}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-500/30 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.35)]"
                        >
                            <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl opacity-70 group-hover:opacity-100" />
                            <div className="pointer-events-none absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl opacity-70 group-hover:opacity-100" />

                            <header className="relative flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                                    <Icon role={c.role} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-emerald-300">{c.role}</p>
                                    <h2 className="text-lg font-semibold tracking-tight">{c.headline}</h2>
                                </div>
                            </header>

                            <p className="relative mt-4 text-sm leading-relaxed text-white/70">{c.description}</p>

                            <ul className="relative mt-5 space-y-2 text-sm text-white/80">
                                {c.highlights.map((h) => (
                                    <li key={h} className="flex items-start gap-2">
                                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="relative mt-6">
                                <a
                                    href={c.href}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/15 hover:border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                                >
                                    {c.ctaText}
                                    <span className="text-emerald-300">→</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
