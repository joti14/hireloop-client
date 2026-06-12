import { getCompanyJobs } from '@/lib/api/jobs';
import { Chip, Table, Button } from "@heroui/react";
import { Eye, Edit2, Trash2 } from "lucide-react";

const RecruiterJobs = async () => {
    const companyId = 'company_123'; // todo: link to dynamic auth
    const jobs = await getCompanyJobs(companyId);

    // Helper to capitalize strings nicely in the table cells
    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-zinc-200">Recruiter Manage All Jobs</h2>
                <p className="text-sm text-zinc-500">Monitor, edit, and update statuses of your active job listings.</p>
            </div>

            <Table aria-label="Company job listings management table">
                <Table.ResizableContainer>
                    <Table.Content className="min-w-[800px] border border-zinc-900 bg-[#121214] text-white rounded-xl">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="1.5fr" id="title" minWidth={180}>
                                Job Title
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="location" minWidth={140}>
                                Location
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="salary" minWidth={140}>
                                Salary Range
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="deadline" minWidth={120}>
                                Deadline
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="0.8fr" id="status" minWidth={100}>
                                Status
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="actions" minWidth={130}>
                                Actions
                            </Table.Column>
                        </Table.Header>
                        
                        <Table.Body>
                            {jobs && jobs.length > 0 ? (
                                jobs.map((job) => {
                                    // Safeguard string conversion if mongo _id is parsed as an object or string
                                    const jobId = job._id?.toString() || job._id;
                                    
                                    return (
                                        <Table.Row key={jobId} className="border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors">
                                            {/* Job Title Column */}
                                            <Table.Cell className="font-medium text-zinc-200">
                                                {capitalize(job.jobTitle)}
                                            </Table.Cell>
                                            
                                            {/* Location Column */}
                                            <Table.Cell className="text-zinc-400 text-sm">
                                                {job.isRemote ? (
                                                    <span className="text-sky-400 font-medium bg-sky-950/20 px-2 py-0.5 rounded border border-sky-900/30 text-xs">
                                                        Remote
                                                    </span>
                                                ) : (
                                                    job.location || "N/A"
                                                )}
                                            </Table.Cell>
                                            
                                            {/* Salary Column */}
                                            <Table.Cell className="text-zinc-300 text-sm">
                                                {job.minSalary && job.maxSalary 
                                                    ? `${job.currency === 'USD' ? '$' : ''}${job.minSalary} - ${job.currency === 'USD' ? '$' : ''}${job.maxSalary}`
                                                    : "Not Disclosed"
                                                }
                                            </Table.Cell>
                                            
                                            {/* Deadline Column */}
                                            <Table.Cell className="text-zinc-400 text-sm">
                                                {job.deadline ? new Date(job.deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "No Limit"}
                                            </Table.Cell>
                                            
                                            {/* Status Column */}
                                            <Table.Cell>
                                                <Chip 
                                                    color={job.status === "active" ? "success" : "danger"} 
                                                    size="sm" 
                                                    variant="soft"
                                                    className="capitalize font-medium"
                                                >
                                                    {job.status || "Inactive"}
                                                </Chip>
                                            </Table.Cell>
                                            
                                            {/* Actions Column */}
                                            <Table.Cell>
                                                <div className="flex items-center gap-1.5">
                                                    <Button 
                                                        isIconOnly 
                                                        size="sm" 
                                                        variant="light" 
                                                        className="text-zinc-400 hover:text-white"
                                                        aria-label="View Details"
                                                    >
                                                        <Eye size={16} />
                                                    </Button>
                                                    <Button 
                                                        isIconOnly 
                                                        size="sm" 
                                                        variant="light" 
                                                        className="text-zinc-400 hover:text-amber-400"
                                                        aria-label="Edit Job"
                                                    >
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <Button 
                                                        isIconOnly 
                                                        size="sm" 
                                                        variant="light" 
                                                        className="text-zinc-400 hover:text-danger"
                                                        aria-label="Delete Job"
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })
                            ) : (
                                <Table.Row>
                                    <Table.Cell className="text-center text-zinc-500 py-8" colSpan={6}>
                                        No job postings found.
                                    </Table.Cell>
                                    {/* Empty cells to avoid layout crashes during rendering empty states */}
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default RecruiterJobs;