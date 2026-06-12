"use client";

import React from 'react';
import { 
    TextField, 
    Input, 
    InputGroup,
    Select,
    ListBox,
    Label, 
    Button, 
    TextArea 
} from "@heroui/react";
import { X, MapPin, Upload } from "lucide-react";

const CompanyPage = () => {
    const industries = [
        { key: "tech", label: "Technology" },
        { key: "design", label: "Design & Creative" },
        { key: "finance", label: "Finance & Banking" },
        { key: "marketing", label: "Marketing" }
    ];

    const employeeRanges = [
        { key: "1-10", label: "1-10 employees" },
        { key: "11-50", label: "11-50 employees" },
        { key: "51-200", label: "51-200 employees" },
        { key: "201+", label: "201+ employees" }
    ];

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4">
            {/* Form Container Panel */}
            <div className="w-full max-w-2xl bg-[#121214] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden relative">
                
                {/* Close/Dismiss Button */}
                <button className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors" aria-label="Close">
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="p-6 pb-4">
                    <h2 className="text-xl font-semibold text-white tracking-tight">Register New Company</h2>
                    <p className="text-sm text-zinc-400 mt-1">Enter your business details to start hiring on HireLoop.</p>
                </div>

                {/* Input Fields Grid */}
                <div className="p-6 pt-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        
                        {/* Company Name */}
                        <TextField className="flex flex-col gap-1">
                            <Label className="text-zinc-300 font-medium text-sm pb-1">Company Name</Label>
                            <Input 
                                type="text"
                                placeholder="e.g. Acme Corp"
                                className="w-full bg-[#1c1c1f] border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 text-zinc-200 rounded-xl h-10 px-3 outline-none text-sm transition-colors shadow-none"
                            />
                        </TextField>

                        {/* Industry / Category Dropdown */}
                        <div className="flex flex-col gap-1">
                            <Label className="text-zinc-300 font-medium text-sm pb-1">Industry / Category</Label>
                            <Select
                                placeholder="Select industry"
                                className="w-full"
                            >
                                <Select.Trigger className="w-full bg-[#1c1c1f] border border-zinc-800 hover:border-zinc-700 data-[hovered=true]:border-zinc-700 rounded-xl h-10 px-3 text-sm outline-none transition-colors shadow-none">
                                    <Select.Value className="text-zinc-200 text-sm data-[placeholder=true]:text-zinc-500" />
                                    <Select.Indicator className="text-zinc-500" />
                                </Select.Trigger>
                                <Select.Popover className="bg-[#121214] border border-zinc-800 rounded-xl shadow-xl p-1">
                                    <ListBox className="outline-none flex flex-col gap-0.5">
                                        {industries.map((ind) => (
                                            <ListBox.Item
                                                key={ind.key}
                                                id={ind.key}
                                                textValue={ind.label}
                                                className="text-zinc-300 p-2 hover:bg-zinc-800 hover:text-white data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white rounded-lg cursor-pointer text-sm outline-none transition-colors"
                                            >
                                                {ind.label}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Website URL */}
                        <TextField className="flex flex-col gap-1">
                            <Label className="text-zinc-300 font-medium text-sm pb-1">Website URL</Label>
                            <InputGroup className="flex items-center bg-[#1c1c1f] border border-zinc-800 hover:border-zinc-700 focus-within:border-zinc-600 rounded-xl h-10 px-3 transition-colors">
                                <InputGroup.Prefix className="text-zinc-500 text-sm select-none pr-1 border-r border-zinc-800 mr-2 flex items-center h-full">
                                    https://
                                </InputGroup.Prefix>
                                <Input 
                                    type="text"
                                    placeholder="www.company.com"
                                    className="w-full bg-transparent text-zinc-200 outline-none text-sm h-full"
                                />
                            </InputGroup>
                        </TextField>

                        {/* Location */}
                        <TextField className="flex flex-col gap-1">
                            <Label className="text-zinc-300 font-medium text-sm pb-1">Location</Label>
                            <InputGroup className="flex items-center bg-[#1c1c1f] border border-zinc-800 hover:border-zinc-700 focus-within:border-zinc-600 rounded-xl h-10 px-3 transition-colors">
                                <InputGroup.Prefix className="flex items-center text-zinc-500 mr-2">
                                    <MapPin size={16} className="shrink-0" />
                                </InputGroup.Prefix>
                                <Input 
                                    type="text"
                                    placeholder="City, Country"
                                    className="w-full bg-transparent text-zinc-200 outline-none text-sm h-full"
                                />
                            </InputGroup>
                        </TextField>

                        {/* Employee Count Range Dropdown */}
                        <div className="flex flex-col gap-1">
                            <Label className="text-zinc-300 font-medium text-sm pb-1">Employee Count Range</Label>
                            <Select
                                placeholder="Select range"
                                className="w-full"
                            >
                                <Select.Trigger className="w-full bg-[#1c1c1f] border border-zinc-800 hover:border-zinc-700 data-[hovered=true]:border-zinc-700 rounded-xl h-10 px-3 text-sm outline-none transition-colors shadow-none">
                                    <Select.Value className="text-zinc-200 text-sm data-[placeholder=true]:text-zinc-500" />
                                    <Select.Indicator className="text-zinc-500" />
                                </Select.Trigger>
                                <Select.Popover className="bg-[#121214] border border-zinc-800 rounded-xl shadow-xl p-1">
                                    <ListBox className="outline-none flex flex-col gap-0.5">
                                        {employeeRanges.map((range) => (
                                            <ListBox.Item
                                                key={range.key}
                                                id={range.key}
                                                textValue={range.label}
                                                className="text-zinc-300 p-2 hover:bg-zinc-800 hover:text-white data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white rounded-lg cursor-pointer text-sm outline-none transition-colors"
                                            >
                                                {range.label}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Company Logo Upload Block */}
                        <div className="flex flex-col gap-1.5">
                            <span className="text-zinc-300 text-sm font-medium">Company Logo</span>
                            <div className="flex items-center gap-3 bg-[#1c1c1f] border border-dashed border-zinc-800 rounded-xl px-3 h-10 hover:border-zinc-700 transition-colors cursor-pointer group">
                                <div className="text-zinc-400 group-hover:text-white transition-colors">
                                    <Upload size={16} />
                                </div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-xs text-zinc-200 font-medium">Upload image</span>
                                    <span className="text-[10px] text-zinc-500">PNG, JPG up to 5MB</span>
                                </div>
                            </div>
                        </div>

                        {/* Brief Description */}
                        <TextField className="flex flex-col gap-1 md:col-span-2">
                            <Label className="text-zinc-300 font-medium text-sm pb-1">Brief Description</Label>
                            <TextArea
                                placeholder="Tell us about your company's mission and culture..."
                                rows={4}
                                className="w-full bg-[#1c1c1f] border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 text-zinc-200 rounded-xl p-3 outline-none text-sm transition-colors resize-none shadow-none"
                            />
                        </TextField>

                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-zinc-800 flex justify-end gap-3 bg-zinc-900/20">
                    <Button 
                        variant="light" 
                        className="border border-zinc-800 text-zinc-300 hover:bg-zinc-800 px-5 font-medium text-sm h-10 rounded-lg transition-colors"
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="bg-white text-zinc-950 font-semibold text-sm h-10 px-5 rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                        Register Company
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default CompanyPage;