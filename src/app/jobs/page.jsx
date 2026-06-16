import JobCard from "@/components/jobs/JobCard";
import { getJobs } from "@/lib/api/jobs";

export default async function JobsPage() {

    const jobs = await getJobs(); // Fetch jobs from your API

    return (
        <div className="min-h-screen bg-[#09090b] p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-white">Open Positions</h1>
                <p className="text-sm text-muted mb-8">Discover your next engineering challenge.</p>

                {/* Grid Layout to display cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((jobItem) => (
                        <JobCard
                            key={jobItem._id?.$oid || jobItem._id}
                            job={jobItem} // Here is where you "feed" the data!
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}