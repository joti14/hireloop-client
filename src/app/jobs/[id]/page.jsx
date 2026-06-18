import React from 'react';
import { getJobById } from '@/lib/api/jobs';
import { Button } from '@heroui/react';
// Gravity UI Icons
import { MapPin, Briefcase, CircleDollar, Calendar, ArrowUpRight, ChevronLeft } from '@gravity-ui/icons';
import Link from 'next/link';

const JobsDetailsPage = async ({ params }) => {
    const { id } = await params;
    
    let job;
    try {
        job = await getJobById(id);
        console.log("Job fetched:", job);
    } catch (error) {
        console.error("Error fetching job:", error);
        return (
            <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-4">
                <p className="text-zinc-500 mb-4">Failed to load job details</p>
            </div>
        );
    }

    // Safety fallback check if database record doesn't load or is empty
    if (!job) {
        return (
            <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-4">
                <p className="text-zinc-500 mb-4">Job listing not found or has expired.</p>
                <Link href="/jobs" className="text-sm text-[#e293ff] hover:underline flex items-center gap-1">
                    <ChevronLeft width={16} height={16} /> Back to Open Positions
                </Link>
            </div>
        );
    }

    const salarySymbol = job.currency === "USD" ? "$" : job.currency || "";
    
    // Formatting comma-separated string payloads into arrays for crisp scannable UI layout loops
    const requirementsList = job.requirements ? job.requirements.split(',').map(item => item.trim()) : [];
    const benefitsList = job.benefits ? job.benefits.split(',').map(item => item.trim()) : [];

    // Format the date strings neatly
    const formattedDeadline = job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : null;

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Back to Jobs Navigation */}
                <Link 
                    href="/jobs" 
                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#e293ff] transition-colors group mb-2"
                >
                    <ChevronLeft width={16} height={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
                    Back to Open Positions
                </Link>

                {/* ================= MAIN HERO / HEADER HEADER PANEL ================= */}
                <div className="bg-[#121214] border border-zinc-900 rounded-[24px] p-6 sm:p-8 shadow-xl space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        {/* Title & Brand block */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                {job.companyLogo && (
                                    <img 
                                        src={job.companyLogo} 
                                        alt={`${job.companyName} Logo`} 
                                        className="w-9 h-9 rounded-lg object-contain bg-white/10 p-1"
                                    />
                                )}
                                <span className="text-zinc-400 font-medium text-sm tracking-wide">{job.companyName}</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-none">
                                {job.jobTitle}
                            </h1>
                        </div>

                        {/* Primary Interaction Action Button */}
                        <Link
                            href={`/jobs/${job._id}/apply`} 
                            className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-6 h-11 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shrink-0"
                        >
                            Apply For This Job
                            <ArrowUpRight width={16} height={16} />
                        </Link>
                    </div>

                    <hr className="border-zinc-900" />

                    {/* Meta Quick Information Tags Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Location */}
                        <div className="flex items-center gap-3 bg-[#1c1c1f]/50 border border-zinc-900/60 rounded-xl p-3">
                            <div className="p-2 bg-[#1c1c1f] rounded-lg text-[#e293ff]">
                                <MapPin width={16} height={16} />
                            </div>
                            <div>
                                <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Location</p>
                                <p className="text-sm font-medium text-zinc-200">{job.location}</p>
                            </div>
                        </div>

                        {/* Workplace Type */}
                        <div className="flex items-center gap-3 bg-[#1c1c1f]/50 border border-zinc-900/60 rounded-xl p-3">
                            <div className="p-2 bg-[#1c1c1f] rounded-lg text-[#e293ff]">
                                <Briefcase width={16} height={16} />
                            </div>
                            <div>
                                <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Job Type</p>
                                <p className="text-sm font-medium text-zinc-200 capitalize">{job.isRemote ? "Remote" : job.jobType}</p>
                            </div>
                        </div>

                        {/* Salary Compensation */}
                        <div className="flex items-center gap-3 bg-[#1c1c1f]/50 border border-zinc-900/60 rounded-xl p-3">
                            <div className="p-2 bg-[#1c1c1f] rounded-lg text-[#e293ff]">
                                <CircleDollar width={16} height={16} />
                            </div>
                            <div>
                                <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Salary (Mo.)</p>
                                <p className="text-sm font-medium text-zinc-200">
                                    {salarySymbol}{Number(job.minSalary).toLocaleString()} - {Number(job.maxSalary).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Application Closing Deadline */}
                        <div className="flex items-center gap-3 bg-[#1c1c1f]/50 border border-zinc-900/60 rounded-xl p-3">
                            <div className="p-2 bg-[#1c1c1f] rounded-lg text-[#e293ff]">
                                <Calendar width={16} height={16} />
                            </div>
                            <div>
                                <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Deadline</p>
                                <p className="text-sm font-medium text-zinc-200 truncate">{formattedDeadline || job.deadline}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= REMAINING JOB SPECIFICS BLOCK ================= */}
                <div className="bg-[#121214] border border-zinc-900 rounded-[24px] p-6 sm:p-8 shadow-xl space-y-8">
                    
                    {/* Responsibilities Subsection */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold text-white tracking-tight">Role Overview & Responsibilities</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                            {job.responsibilities}
                        </p>
                    </div>

                    {/* Requirements Subsection */}
                    {requirementsList.length > 0 && (
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold text-white tracking-tight">Requirements</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {requirementsList.map((req, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-zinc-400 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#e293ff] mt-2 shrink-0" />
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Perks and Benefits Subsection */}
                    {benefitsList.length > 0 && (
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold text-white tracking-tight">Benefits & Perks</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {benefitsList.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-zinc-400 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default JobsDetailsPage;