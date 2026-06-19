import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { ChevronLeft, CircleInfo, Diamond, ArrowRight } from '@gravity-ui/icons';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getPlanById } from '@/lib/api/plans';

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    // 1. Authenticate user session
    const user = await getUserSession();
    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    // 2. Authorize role type
    if (user.role !== 'seeker') {
        return (
            <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-md bg-[#121214] border border-zinc-900 rounded-[24px] p-8 shadow-xl space-y-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                        <CircleInfo width={22} height={22} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100">Access Restricted</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Only job seekers can apply for positions. Please sign in with a candidate account to proceed.
                    </p>
                    <div className="pt-2">
                        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-[#e293ff] hover:underline font-medium">
                            <ChevronLeft width={16} height={16} /> Back to Open Positions
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Gather Application limits and data
    const applications = await getApplicationsByApplicant(user.id);

    const plan = await getPlanById(user?.plan || 'seeker_free');

    const job = await getJobById(id);
    
    // Quick quota analytics calculations
    const currentCount = applications.length;
    const maxCount = plan.maxApplicationsPerMonth;
    const remainingCount = Math.max(0, maxCount - currentCount);
    const quotaPercentage = Math.min(100, (currentCount / maxCount) * 100);
    const hasReachedLimit = currentCount >= maxCount;

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 sm:p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl space-y-6">
                
                {/* Navigation Breadcrumb */}
                <Link 
                    href={`/jobs/${id}`} 
                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#e293ff] transition-colors group self-start"
                >
                    <ChevronLeft width={16} height={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
                    Back to Job Details
                </Link>

                {/* ================= ACCOUNT ACCOUNT USAGE QUOTA CARD ================= */}
                <div className="bg-[#121214] border border-zinc-900 rounded-[20px] p-5 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#e293ff] bg-[#e293ff]/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                    <Diamond width={10} height={10} /> {plan.name} Tier
                                </span>
                                <h3 className="text-sm font-semibold text-zinc-300">Monthly Usage Tracking</h3>
                            </div>
                            <p className="text-xs text-zinc-400">
                                You have used <span className="text-white font-medium">{currentCount}</span> out of <span className="text-white font-medium">{maxCount}</span> applications this cycle.
                            </p>
                        </div>

                        {/* Plan Upgrading Link Element */}
                        <Link 
                            href="/plans" 
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 h-9 px-4 rounded-xl transition-all shadow-md shrink-0"
                        >
                            View Upgrade Plans
                            <ArrowRight width={14} height={14} />
                        </Link>
                    </div>

                    {/* Usage Progress Line Slider Gauge */}
                    <div className="space-y-1.5">
                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${hasReachedLimit ? 'bg-rose-500' : 'bg-[#e293ff]'}`}
                                style={{ width: `${quotaPercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-zinc-500">
                            <span>{quotaPercentage.toFixed(0)}% Consumed</span>
                            <span>{remainingCount} applications remaining</span>
                        </div>
                    </div>
                </div>

                {/* ================= CONDITIONAL INJECTION VIEWPORT ================= */}
                {hasReachedLimit ? (
                    /* Lockout Panel Display when Limit Exceeded */
                    <div className="bg-[#121214] border border-dashed border-rose-950/40 rounded-[24px] p-8 text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                            <CircleInfo width={22} height={22} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-base font-bold text-zinc-200">Monthly Quota Exceeded</h4>
                            <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                                You've submitted all available applications on your current tier. Upgrade your account pipeline to instantly apply for more jobs.
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Inject standard Job Application Wrapper */
                    <JobApply applicant={user} job={job} />
                )}

            </div>
        </div>
    );
};

export default ApplyPage;