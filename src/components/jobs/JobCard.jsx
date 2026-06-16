"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@heroui/react";
import { MapPin, Briefcase, CircleDollar, ArrowRight } from "@gravity-ui/icons";

// We receive the single 'job' object as a prop here
export default function JobCard({ job }) {
    // Safety check in case data hasn't loaded yet
    if (!job) return null;

    const jobId = job._id?.$oid || job._id;
    const salarySymbol = job.currency === "USD" ? "$" : job.currency || "";

    return (
        <Card className="w-full max-w-[400px] bg-[#0d0d0f] border border-zinc-900 text-white rounded-[24px] p-6 shadow-xl hover:border-zinc-800 transition-all duration-300">
            
            <Card.Header className="flex flex-col items-start gap-3 p-0">
                {/* Company Row */}
                <div className="flex items-center gap-2.5">
                    {job.companyLogo && (
                        <img 
                            src={job.companyLogo} 
                            alt={`${job.companyName} Logo`} 
                            className="w-7 h-7 rounded-md object-contain bg-white/10 p-0.5"
                        />
                    )}
                    <span className="text-zinc-400 text-xs font-medium tracking-wide">
                        {job.companyName}
                    </span>
                </div>

                {/* Job Title */}
                <Card.Title className="text-[26px] font-semibold tracking-tight text-zinc-100 leading-tight">
                    {job.jobTitle}
                </Card.Title>

                {/* Responsibilities / Description */}
                <Card.Description className="text-zinc-400 text-[14px] leading-relaxed mt-1 font-normal line-clamp-2">
                    {job.responsibilities}
                </Card.Description>
            </Card.Header>

            {/* Pill Tags */}
            <Card.Content className="flex flex-wrap gap-2 mt-5 p-0">
                {/* Location */}
                <div className="inline-flex items-center gap-2 bg-[#161618] px-3.5 py-2 rounded-full border border-zinc-900 text-[13px] font-medium text-zinc-300">
                    <MapPin className="text-[#e293ff]" width={14} height={14} />
                    <span>{job.location}</span>
                </div>

                {/* Job Type */}
                <div className="inline-flex items-center gap-2 bg-[#161618] px-3.5 py-2 rounded-full border border-zinc-900 text-[13px] font-medium text-zinc-300 capitalize">
                    <Briefcase className="text-[#e293ff]" width={14} height={14} />
                    <span>{job.isRemote ? "Remote" : job.jobType}</span>
                </div>

                {/* Salary */}
                {(job.minSalary || job.maxSalary) && (
                    <div className="inline-flex items-center gap-2 bg-[#161618] px-3.5 py-2 rounded-full border border-zinc-900 text-[13px] font-medium text-zinc-300">
                        <CircleDollar className="text-[#e293ff]" width={14} height={14} />
                        <span>
                            {salarySymbol}{Number(job.minSalary).toLocaleString()} – {salarySymbol}{Number(job.maxSalary).toLocaleString()}
                        </span>
                    </div>
                )}
            </Card.Content>

            {/* Footer Apply Link */}
            <Card.Footer className="mt-8 p-0 flex items-center justify-between">
                <Link 
                    href={`/jobs/${jobId}`}
                    className="inline-flex items-center gap-2 text-zinc-100 font-medium text-[15px] hover:text-[#e293ff] transition-colors group outline-none"
                >
                    Apply Now
                    <ArrowRight 
                        width={16} 
                        height={16} 
                        className="transform group-hover:translate-x-1 transition-transform duration-200" 
                    />
                </Link>
            </Card.Footer>
        </Card>
    );
}