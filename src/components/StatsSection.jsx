"use client";

import {
    Briefcase,
    Factory,
    Persons,
    Star
} from "@gravity-ui/icons";

const stats = [
    {
        icon: Briefcase,
        value: "50K",
        label: "Active Jobs",
    },
    {
        icon: Factory,
        value: "12K",
        label: "Companies",
    },
    {
        icon: Persons,
        value: "2M",
        label: "Job Seekers",
    },
    {
        icon: Star,
        value: "97%",
        label: "Satisfaction Rate",
    },
];

export default function StatsSection() {
    return (
        <section className="relative overflow-hidden bg-black py-20 lg:py-28">
            {/* Purple Glow */}
            <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[150px]" />

            {/* Stars Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />

            <div className="relative mx-auto max-w-7xl px-4">
                {/* Globe Background Section */}
                <div
                    className="relative overflow-hidden rounded-[2rem] bg-black/10 bg-no-repeat bg-center bg-cover"
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.24)), url('/images/globe.png')`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative flex min-h-[380px] items-center justify-center px-6 py-24 text-center">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl font-medium text-white leading-relaxed md:text-5xl">
                                Assisting over <span className="font-semibold">15,000 job seekers</span>
                                <br />
                                find their dream positions.
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="-mt-16 mx-auto max-w-6xl px-4">
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="
                    rounded-3xl
                    border border-white/10
                    bg-gradient-to-b
                    from-white/[0.05]
                    to-white/[0.02]
                    backdrop-blur-xl
                    p-5 lg:p-6
                    hover:border-violet-500/40
                    transition-all
                    duration-300
                "
                                >
                                    <div className="mb-8">
                                        <Icon className="h-5 w-5 text-white" />
                                    </div>

                                    <h3 className="text-4xl lg:text-[42px] font-bold text-white">
                                        {item.value}
                                    </h3>

                                    <p className="mt-2 text-gray-400">
                                        {item.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}