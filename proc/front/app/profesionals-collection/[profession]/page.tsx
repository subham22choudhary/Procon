// app/profesionals-collection/[profession]/page.tsx
import type { Metadata } from "next";

type Profession = "lawyer" | "doctor" | "ca";

type Pro = {
    id: string;
    name: string;
    profession: Profession;
    title: string;
    experienceYears: number;
    location: string;
    mode: "Online" | "In-person" | "Online & In-person";
    languages: string[];
    rating: number;
    reviewsCount: number;
    startingFee: string;
    availability: "Available today" | "Next 24 hrs" | "This week";
    services: string[];
};

const PROFESSIONALS: Pro[] = [
    // CA
    {
        id: "ca-1",
        name: "Aarav Mehta",
        profession: "ca",
        title: "CA • Tax Planning & ITR",
        experienceYears: 8,
        location: "Mumbai",
        mode: "Online & In-person",
        languages: ["English", "Hindi"],
        rating: 4.8,
        reviewsCount: 214,
        startingFee: "₹999",
        availability: "Available today",
        services: ["ITR Filing", "Tax Planning", "Business Accounting"],
    },
    {
        id: "ca-2",
        name: "Neha Sharma",
        profession: "ca",
        title: "CA • GST & Compliance",
        experienceYears: 6,
        location: "Delhi",
        mode: "Online",
        languages: ["English", "Hindi"],
        rating: 4.7,
        reviewsCount: 162,
        startingFee: "₹799",
        availability: "Next 24 hrs",
        services: ["GST Filing", "TDS", "ROC Compliance"],
    },

    // Doctor
    {
        id: "doc-1",
        name: "Dr. Priya Nair",
        profession: "doctor",
        title: "Doctor • Dermatology",
        experienceYears: 9,
        location: "Chennai",
        mode: "Online & In-person",
        languages: ["English", "Tamil"],
        rating: 4.8,
        reviewsCount: 301,
        startingFee: "₹600",
        availability: "Available today",
        services: ["Acne Care", "Hairfall", "Allergy & Rash"],
    },

    // Lawyer
    {
        id: "law-1",
        name: "Adv. Sana Khan",
        profession: "lawyer",
        title: "Lawyer • Family & Civil",
        experienceYears: 7,
        location: "Hyderabad",
        mode: "Online & In-person",
        languages: ["English", "Hindi", "Urdu"],
        rating: 4.7,
        reviewsCount: 188,
        startingFee: "₹1200",
        availability: "This week",
        services: ["Legal Notice", "Divorce", "Property Disputes"],
    },
];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function niceProfession(p: Profession) {
    if (p === "ca") return "Chartered Accountants";
    if (p === "doctor") return "Doctors";
    return "Lawyers";
}

// ✅ Map any slug to canonical profession
function toProfession(slugRaw: string | undefined): Profession | null {
    const slug = decodeURIComponent((slugRaw ?? "").trim().toLowerCase());

    const map: Record<string, Profession> = {
        // lawyer
        lawyer: "lawyer",
        lawyers: "lawyer",

        // doctor
        doctor: "doctor",
        doctors: "doctor",

        // ca
        ca: "ca",
        "chartered-accountant": "ca",
        "chartered-accountants": "ca",
        "c.a": "ca",
        "c-a": "ca",
    };

    return map[slug] ?? null;
}

export async function generateMetadata({
    params,
}: {
    params: { profession: string };
}): Promise<Metadata> {
    const profession = toProfession(params.profession);
    return {
        title: profession
            ? `${niceProfession(profession)} • Profesionals Collection`
            : "Profesionals Collection",
    };
}

export default function ProfessionCollectionPage({
    params,
}: {
    params: { profession: string };
}) {
    const profession = toProfession(params.profession);

    if (!profession) {
        return (
            <main className="min-h-screen bg-black text-white">
                <div className="mx-auto max-w-4xl px-6 py-16">
                    <a
                        href="/profesionals-collection"
                        className="inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-emerald-100"
                    >
                        ← Back to collection
                    </a>
                    <h1 className="mt-6 text-2xl font-semibold">Profession not found</h1>
                    <p className="mt-3 text-white/70">
                        Try:{" "}
                        <span className="text-emerald-200">/profesionals-collection/ca</span>,{" "}
                        <span className="text-emerald-200">/profesionals-collection/doctor</span>,{" "}
                        <span className="text-emerald-200">/profesionals-collection/lawyer</span>
                    </p>
                </div>
            </main>
        );
    }

    const list = PROFESSIONALS.filter((p) => p.profession === profession);

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto max-w-6xl px-6 py-14">
                <div className="mb-10">
                    <a
                        href="/profesionals-collection"
                        className="inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-emerald-100"
                    >
                        ← Back to collection
                    </a>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        {niceProfession(profession)}
                    </div>

                    <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {niceProfession(profession)}
                    </h1>

                    <p className="mt-3 max-w-2xl text-white/70">
                        Compare experience, services, fees, and availability.
                    </p>

                    <div className="mt-6 h-px w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" />
                </div>

                <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((p) => (
                        <article
                            key={p.id}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-500/30 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.35)]"
                        >
                            <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl opacity-70 group-hover:opacity-100" />
                            <div className="pointer-events-none absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl opacity-70 group-hover:opacity-100" />

                            <header className="relative">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold tracking-tight">{p.name}</h2>
                                        <p className="mt-1 text-sm text-emerald-200">{p.title}</p>
                                    </div>

                                    <span
                                        className={cn(
                                            "shrink-0 rounded-full border px-2.5 py-1 text-xs",
                                            "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                                        )}
                                    >
                                        {p.availability}
                                    </span>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
                                        {p.experienceYears}+ yrs
                                    </span>
                                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
                                        {p.mode}
                                    </span>
                                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
                                        {p.location}
                                    </span>
                                </div>
                            </header>

                            <div className="relative mt-5 flex items-center justify-between">
                                <div className="text-sm text-white/80">
                                    <span className="text-emerald-200">★</span>{" "}
                                    <span className="font-medium">{p.rating.toFixed(1)}</span>
                                    <span className="text-white/50"> ({p.reviewsCount} reviews)</span>
                                </div>
                                <div className="text-sm text-white/80">
                                    <span className="text-white/50">From </span>
                                    <span className="font-semibold text-emerald-200">{p.startingFee}</span>
                                </div>
                            </div>

                            <div className="relative mt-5">
                                <p className="text-xs uppercase tracking-wide text-white/50">Key services</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {p.services.slice(0, 3).map((s) => (
                                        <span
                                            key={s}
                                            className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-200"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <p className="relative mt-4 text-xs text-white/60">
                                Languages: <span className="text-white/75">{p.languages.join(", ")}</span>
                            </p>

                            <div className="relative mt-6 grid grid-cols-2 gap-3">
                                <a
                                    href={`/profesionals-collection/${profession}/${p.id}`}
                                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white"
                                >
                                    View Profile
                                </a>
                                <a
                                    href={`/booking?profession=${profession}&id=${p.id}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/15 hover:border-emerald-500/40"
                                >
                                    Book <span className="text-emerald-300">→</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
