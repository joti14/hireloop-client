"use client";

import React, { useState } from 'react';
import { Form, Button, TextField, Label, InputGroup } from '@heroui/react';
// Gravity UI Icons
import { Link as LinkIcon, Globe, FileText, PaperPlane, TrashBin } from '@gravity-ui/icons';

const JobApply = ({ job }) => {
    // Safety check for data rendering
    const displayTitle = job?.jobTitle || job?.title || "Position";
    const displayCompany = job?.companyName || "";

    // Local form state
    const [resumeLink, setResumeLink] = useState("");
    const [portfolioLink, setPortfolioLink] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const applicationData = {
            jobId: job?._id?.$oid || job?._id,
            resumeLink,
            portfolioLink,
            additionalNotes
        };

        console.log("Submitting Application Data:", applicationData);
        // Integrate your API request or backend dispatch here
    };

    const handleReset = () => {
        setResumeLink("");
        setPortfolioLink("");
        setAdditionalNotes("");
    };

    return (
        <div className="w-full max-w-2xl bg-[#121214] border border-zinc-900 rounded-[24px] p-6 sm:p-8 shadow-2xl text-white">
            {/* Header Area */}
            <div className="mb-6">
                <span className="text-xs font-semibold text-[#e293ff] uppercase tracking-wider">
                    Application Form
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight mt-1">
                    Apply for {displayTitle}
                </h2>
                {displayCompany && (
                    <p className="text-sm text-zinc-400 mt-0.5">at {displayCompany}</p>
                )}
            </div>

            {/* Hero UI Form Component */}
            <Form onSubmit={handleSubmit} onReset={handleReset} className="space-y-5 w-full">
                
                {/* 1. Resume Link Field (Required) */}
                <TextField className="flex flex-col gap-1.5 w-full">
                    <Label className="text-zinc-400 text-xs font-medium tracking-wide">
                        Resume Link <span className="text-rose-500">*</span>
                    </Label>
                    <InputGroup className="flex items-center bg-[#1c1c1f] border border-zinc-800 focus-within:border-zinc-700 rounded-xl h-10 px-3 transition-colors w-full">
                        <InputGroup.Prefix className="flex items-center text-zinc-500 mr-2">
                            <LinkIcon width={16} height={16} />
                        </InputGroup.Prefix>
                        <InputGroup.Input 
                            type="url"
                            required
                            placeholder="https://shared-drive.com/your-resume.pdf"
                            value={resumeLink}
                            onChange={(e) => setResumeLink(e.target.value)}
                            className="w-full bg-transparent text-zinc-200 outline-none text-sm h-full placeholder:text-zinc-600"
                        />
                    </InputGroup>
                </TextField>

                {/* 2. Portfolio / Website Link Field (Optional) */}
                <TextField className="flex flex-col gap-1.5 w-full">
                    <Label className="text-zinc-400 text-xs font-medium tracking-wide">
                        Portfolio or LinkedIn URL <span className="text-zinc-600">(Optional)</span>
                    </Label>
                    <InputGroup className="flex items-center bg-[#1c1c1f] border border-zinc-800 focus-within:border-zinc-700 rounded-xl h-10 px-3 transition-colors w-full">
                        <InputGroup.Prefix className="flex items-center text-zinc-500 mr-2">
                            <Globe width={16} height={16} />
                        </InputGroup.Prefix>
                        <InputGroup.Input 
                            type="url"
                            placeholder="https://yourportfolio.com or linkedin.com/in/username"
                            value={portfolioLink}
                            onChange={(e) => setPortfolioLink(e.target.value)}
                            className="w-full bg-transparent text-zinc-200 outline-none text-sm h-full placeholder:text-zinc-600"
                        />
                    </InputGroup>
                </TextField>

                {/* 3. Cover Letter / Additional Notes Field (Optional) */}
                <TextField className="flex flex-col gap-1.5 w-full">
                    <Label className="text-zinc-400 text-xs font-medium tracking-wide">
                        Cover Letter / Additional Info <span className="text-zinc-600">(Optional)</span>
                    </Label>
                    <InputGroup className="flex bg-[#1c1c1f] border border-zinc-800 focus-within:border-zinc-700 rounded-xl p-3 transition-colors w-full">
                        <InputGroup.Prefix className="flex items-start text-zinc-500 mr-2 mt-0.5">
                            <FileText width={16} height={16} />
                        </InputGroup.Prefix>
                        <InputGroup.TextArea 
                            rows={4}
                            placeholder="Introduce yourself or add any other details you'd like the hiring team to know..."
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                            className="w-full bg-transparent text-zinc-200 outline-none text-sm min-h-[100px] resize-none placeholder:text-zinc-600"
                        />
                    </InputGroup>
                </TextField>

                {/* Form Action Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900 mt-6">
                    {/* Reset Action */}
                    <Button 
                        type="reset"
                        className="h-10 px-4 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-transparent border border-zinc-800 hover:border-zinc-700 rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                        <TrashBin width={14} height={14} />
                        Clear Form
                    </Button>

                    {/* Submit Action */}
                    <Button 
                        type="submit"
                        className="h-10 px-5 text-xs font-semibold bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl flex items-center gap-1.5 transition-all shadow-lg"
                    >
                        Submit Application
                        <PaperPlane width={14} height={14} />
                    </Button>
                </div>

            </Form>
        </div>
    );
};

export default JobApply;