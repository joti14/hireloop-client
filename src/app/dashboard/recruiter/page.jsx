'use client';
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import { FileText, Persons, Thunderbolt, CircleCheck } from "@gravity-ui/icons";
import DashboardStats from "@/components/dashboard/DashboardStats";

const RecruiterHomePage = () => {

    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div className="flex items-center gap-4">
            <Spinner />
        </div>
    }

    const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: FileText },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];

    const user = session?.user;
    console.log("session data in recruiter home page:", session);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl mb-5">Welcome back, {user.name}</h2>
            <DashboardStats statsData={recruiterStats}/>
        </div>
    );
};

export default RecruiterHomePage;