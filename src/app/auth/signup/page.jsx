"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Button,
    Form,
    Input,
    Label,
    TextField,
    FieldError,
} from "@heroui/react";
import { Description, Radio, RadioGroup } from "@heroui/react";
import {
    Eye,
    EyeSlash,
    Person,
    At,
    ShieldKeyhole,
} from "@gravity-ui/icons";

import { signUp } from "@/lib/auth-client";

export default function SignupPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [role, setRole] = useState('Seeker');

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { error: authError } = await signUp.email({
                name,
                email,
                password,
                role,
                callbackURL: "/",
            });

            if (authError) {
                setError(authError.message);
            } else {
                setSuccess("Account created successfully!");
                e.currentTarget.reset();
            }
        } catch {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-black px-4">
            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[120px]" />

            {/* Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

            <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-[#121212]/90 p-8 backdrop-blur-2xl shadow-2xl">
                {/* Header */}
                <div className="mb-6 border-b border-white/5 pb-6 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">
                        Create an account
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Join hireloop to find your next opportunity
                    </p>
                </div>

                <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name */}
                    <TextField
                        name="name"
                        isRequired
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                            Name
                        </Label>

                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#181818]/60 px-4 py-3 focus-within:border-indigo-500">
                            <Person size={16} className="text-gray-400" />

                            <Input
                                placeholder="Enter your full name"
                                className="w-full bg-transparent text-white outline-none"
                            />
                        </div>

                        <FieldError />
                    </TextField>

                    {/* Email */}
                    <TextField
                        name="email"
                        type="email"
                        isRequired
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                            Email Address
                        </Label>

                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#181818]/60 px-4 py-3 focus-within:border-indigo-500">
                            <At size={16} className="text-gray-400" />

                            <Input
                                placeholder="you@example.com"
                                className="w-full bg-transparent text-white outline-none"
                            />
                        </div>

                        <FieldError />
                    </TextField>

                    {/* Password */}
                    <TextField
                        name="password"
                        isRequired
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                            Password
                        </Label>

                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#181818]/60 px-4 py-3 focus-within:border-indigo-500">
                            <ShieldKeyhole size={16} className="text-gray-400" />

                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Choose a password"
                                className="w-full bg-transparent text-white outline-none"
                            />

                            <button
                                type="button"
                                onClick={() => setIsVisible((prev) => !prev)}
                                className="text-gray-400 hover:text-white"
                            >
                                {isVisible ? (
                                    <EyeSlash size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>

                        <FieldError />
                    </TextField>

                    {/* Role Selection */}
                    <div className="flex flex-col gap-4">
                        <Label>Subscription plan</Label>
                        <RadioGroup defaultValue="seeker" name="role" onChange={value => setRole(value)} orientation="horizontal">
                            <Radio value="seeker">
                                <Radio.Control>
                                    <Radio.Indicator />      
                                </Radio.Control>
                                <Radio.Content>
                                    <Label>Job Seeker</Label>
                                </Radio.Content>
                            </Radio>
                            <Radio value="recruiter">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label>Recruiter</Label>
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {/* Status */}
                    {error && (
                        <div className="rounded-2xl border border-red-900/40 bg-red-950/40 p-4 text-xs text-red-400">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/40 p-4 text-xs text-emerald-400">
                            <span className="font-bold">Success:</span> {success}
                        </div>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        isPending={isLoading}
                        className="w-full h-12 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </Button>

                    {/* Footer */}
                    <div className="mt-2 border-t border-white/5 pt-4 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/auth/signin"
                            className="font-medium text-indigo-400 hover:text-indigo-300"
                        >
                            Sign in instead
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}