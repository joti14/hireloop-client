"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
// Gravity UI Icons
import { Check, ChevronDown, Diamond, ShieldCheck, Flame, CircleInfo } from "@gravity-ui/icons";

export default function PricingPage() {
    // Tab state: 'seekers' or 'recruiters' as outlined in image_e3119a.png
    const [activeTab, setActiveTab] = useState("seekers");
    // FAQ state tracker for individual accordion toggles
    const [openFaq, setOpenFaq] = useState(null);

    // --- Pricing Tiers Dataset ---
    const seekerPlans = [
        {
            name: "Free",
            id: 'seeker_free',
            price: "$0",
            period: "/forever",
            description: "Essential tools to kickstart your job search journey.",
            features: [
                "Browse & save up to 10 jobs",
                "Apply to up to 3 jobs per month",
                "Basic candidate profile visibility",
                "Standard email job alerts"
            ],
            cta: "Get Started",
            popular: false,
            icon: <CircleInfo width={18} height={18} />
        },
        {
            name: "Pro",
            id: 'seeker_pro',
            price: "$19",
            period: "/month",
            description: "Perfect for active job seekers looking to fast-track responses.",
            features: [
                "Apply to up to 30 jobs per month",
                "Unlimited saved job listings",
                "Real-time application tracking status",
                "Premium salary & market insights"
            ],
            cta: "Upgrade to Pro",
            popular: true,
            icon: <Flame width={18} height={18} />
        },
        {
            name: "Premium",
            id: 'seeker_premium',
            price: "$39",
            period: "/month",
            description: "Maximum tracking and absolute priority placement options.",
            features: [
                "Everything in Pro included",
                "Unlimited job applications",
                "Profile boost directly to top recruiters",
                "Early access to newly posted jobs",
                "Priority 24/7 client support"
            ],
            cta: "Go Premium",
            popular: false,
            icon: <Diamond width={18} height={18} />
        }
    ];

    const recruiterPlans = [
        {
            name: "Free",
            id: 'recruiter_free',
            price: "$0",
            period: "/forever",
            description: "Ideal for testing your initial corporate recruitment strategy.",
            features: [
                "Up to 3 active job posts simultaneously",
                "Basic applicant management pipeline",
                "Standard listing visibility",
                "Great for a company's first year of hiring"
            ],
            cta: "Post for Free",
            popular: false,
            icon: <CircleInfo width={18} height={18} />
        },
        {
            name: "Growth",
            id: 'recruiter_growth',
            price: "$49",
            period: "/month",
            description: "Built for scaling engineering organizations needing consistent outreach.",
            features: [
                "Up to 10 active job posts simultaneously",
                "Full applicant tracking system (ATS)",
                "Basic conversion analytics dashboard",
                "Dedicated email support channel"
            ],
            cta: "Start Growth Plan",
            popular: true,
            icon: <Flame width={18} height={18} />
        },
        {
            name: "Enterprise",
            id: 'recruiter_enterprise',
            price: "$144",
            period: "/month",
            description: "Ultimate control, customization, and candidate access metrics.",
            features: [
                "Up to 50 active job posts simultaneously",
                "Advanced analytics & reporting dashboard",
                "Featured prominent job listings",
                "Team collaboration & seat permissions",
                "Custom corporate branding spaces",
                "Priority VIP support channel"
            ],
            cta: "Contact Enterprise",
            popular: false,
            icon: <ShieldCheck width={18} height={18} />
        }
    ];

    // --- FAQ Dataset ---
    const faqItems = [
        {
            question: "How does the cancellation process work?",
            answer: "You can cancel your subscription at any time directly through your billing settings dashboard. Once canceled, your premium features will remain active until the conclusion of your current monthly billing cycle."
        },
        {
            question: "What is your refund policy?",
            answer: "We offer a 14-day money-back guarantee for all newly activated paid subscription tiers if you determine the services do not fit your immediate recruitment or search workflows."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We securely handle transactions using all major international payment formats, including Visa, Mastercard, American Express, Discover, PayPal, and native Apple Pay options."
        },
        {
            question: "Can I switch or upgrade plans midway through a cycle?",
            answer: "Yes, you can upgrade or transition your tier structure at any time. Plan upgrades are computed using clear pro-rated metrics instantly, while lower tier shifts take formal effect on your upcoming renewal date."
        }
    ];

    const activePlansList = activeTab === "seekers" ? seekerPlans : recruiterPlans;

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 py-16 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* ================= PAGE HEADER SECTION ================= */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                        Flexible Pricing for Every Ambition
                    </h1>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                        Choose the ideal tier to elevate your talent sourcing infrastructure or optimize your engineering application pipeline.
                    </p>

                    {/* Interactive Tab Toggle Component */}
                    <div className="pt-4 flex justify-center">
                        <div className="inline-flex bg-[#121214] p-1.5 rounded-full border border-zinc-950 shadow-inner">
                            <button
                                onClick={() => setActiveTab("seekers")}
                                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${activeTab === "seekers"
                                    ? "bg-white text-zinc-950 shadow-md"
                                    : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                For Job Seekers
                            </button>
                            <button
                                onClick={() => setActiveTab("recruiters")}
                                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${activeTab === "recruiters"
                                    ? "bg-white text-zinc-950 shadow-md"
                                    : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                For Recruiters
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= PRICING CARDS TIERS GRID ================= */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {activePlansList.map((plan, index) => (
                        <Card
                            key={index}
                            className={`flex flex-col relative bg-[#121214] border rounded-[24px] p-6 sm:p-8 transition-all duration-300 shadow-xl ${plan.popular
                                ? "border-[#e293ff]/40 shadow-[#e293ff]/5"
                                : "border-zinc-900 hover:border-zinc-800"
                                }`}
                        >
                            {/* Popular Accent Highlight Tag */}
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e293ff] text-zinc-950 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow">
                                    Most Popular
                                </span>
                            )}

                            {/* Plan Base Meta Header */}
                            <div className="space-y-4 flex-1">
                                <div className="flex justify-between items-center">
                                    <div className={`p-2.5 rounded-xl ${plan.popular ? 'bg-[#e293ff]/10 text-[#e293ff]' : 'bg-[#1c1c1f] text-zinc-400'}`}>
                                        {plan.icon}
                                    </div>
                                    <span className="text-zinc-400 font-medium text-sm">{plan.name}</span>
                                </div>

                                <div className="pt-2 flex items-baseline gap-1">
                                    <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                                        {plan.price}
                                    </span>
                                    <span className="text-zinc-500 text-sm font-normal">
                                        {plan.period}
                                    </span>
                                </div>

                                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                                    {plan.description}
                                </p>

                                <hr className="border-zinc-900 my-4" />

                                {/* Interactive Feature Item Loop */}
                                <ul className="space-y-3 pt-2">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                                            <div className="mt-0.5 shrink-0 p-0.5 rounded-full bg-zinc-900 text-[#e293ff]">
                                                <Check width={12} height={12} />
                                            </div>
                                            <span className="leading-normal font-normal text-zinc-400 text-xs sm:text-sm">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Footer Interaction Trigger Block */}
                            <div className="pt-8 mt-auto">
                                <form action="/api/checkout_sessions" method="POST">
                                    <input type="hidden" name="plan_id" value={plan.id} />
                                    <section>
                                        <button type="submit" role="link"
                                            className={`w-full h-11 font-semibold text-xs rounded-xl transition-all tracking-wide ${plan.popular
                                                ? "bg-[#e293ff] hover:bg-[#d67eef] text-zinc-950 shadow-lg"
                                                : "bg-[#1c1c1f] hover:bg-zinc-800 text-zinc-200 border border-zinc-800"
                                                }`}>
                                            Checkout
                                        </button>
                                    </section>
                                </form>
                            </div>
                        </Card>
                    ))}
                </div>

                <hr className="border-zinc-950 max-w-4xl mx-auto" />

                {/* ================= FAQ ACCORDION DISPLAY BLOCK ================= */}
                <div className="max-w-3xl mx-auto space-y-6 pt-4">
                    <div className="text-center space-y-2">
                        <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-zinc-500 text-xs sm:text-sm">
                            Everything you need to know about plans, options, and operational structures.
                        </p>
                    </div>

                    <div className="space-y-3 pt-4">
                        {faqItems.map((faq, index) => {
                            const isCurrentOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="bg-[#121214] border border-zinc-900 rounded-xl overflow-hidden transition-colors"
                                >
                                    {/* Accordion Head Header Trigger Component */}
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full p-5 flex items-center justify-between text-left focus:outline-none group"
                                    >
                                        <span className="text-zinc-200 font-medium text-sm sm:text-base group-hover:text-white transition-colors">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            width={16}
                                            height={16}
                                            className={`text-zinc-500 transition-transform duration-300 ${isCurrentOpen ? "transform rotate-180 text-[#e293ff]" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Accordion Internal Slider Content Canvas */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isCurrentOpen ? "max-h-[200px] border-t border-zinc-900/40" : "max-h-0"
                                            }`}
                                    >
                                        <p className="p-5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal bg-[#161618]/30">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}