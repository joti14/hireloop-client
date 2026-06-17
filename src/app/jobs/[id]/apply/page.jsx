import { getUserSession } from '@/lib/core/session';
import { ChevronLeft } from '@gravity-ui/icons';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();

    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== 'seeker') {
        return (
            <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-4">
                <p className="text-zinc-500 mb-4">Only job seekers can apply for positions. Please sign in with a seeker account to proceed.</p>
                <Link href="/jobs" className="text-sm text-[#e293ff] hover:underline flex items-center gap-1">
                    <ChevronLeft width={16} height={16} /> Back to Open Positions
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h2>Apply for this job</h2>
        </div>
    );
};

export default ApplyPage;