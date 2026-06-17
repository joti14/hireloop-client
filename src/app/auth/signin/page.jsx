"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SigninPage() {
    // Form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignin = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { data, error: authError } = await signIn.email({
                email,
                password,
            });

            if (authError) {
                setError(authError.message || "Invalid email or password.");
            } else {
                setSuccess("Signed in successfully! Redirecting...");
                setEmail("");
                setPassword("");
                router.push(redirectTo);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-black px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

            <div className="w-full max-w-md p-8 rounded-[2rem] border border-white/10 bg-[#121212]/90 backdrop-blur-2xl shadow-2xl relative z-10">
                {/* Header Container */}
                <div className="flex flex-col items-center justify-center gap-2 pb-6 border-b border-white/5 mb-6 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-400">Sign in to your hireloop account</p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSignin} className="flex flex-col gap-5">
                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Email Address</label>
                        <div className="flex items-center gap-2.5 border border-white/10 rounded-2xl px-4 py-3 bg-[#181818]/60 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-200">
                            <At className="text-gray-400 pointer-events-none" size={16} />
                            <input
                                required
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent text-sm outline-none border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Password</label>
                            <Link href="/auth/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="flex items-center gap-2.5 border border-white/10 rounded-2xl px-4 py-3 bg-[#181818]/60 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-200">
                            <ShieldKeyhole className="text-gray-400 pointer-events-none" size={16} />
                            <input
                                required
                                type={isVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent text-sm outline-none border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                            />
                            <button
                                className="focus:outline-none text-gray-400 hover:text-white transition-colors"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Status Badges */}
                    {error && (
                        <div className="p-4 text-xs font-medium rounded-2xl bg-red-950/40 text-red-400 border border-red-900/40">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-4 text-xs font-medium rounded-2xl bg-emerald-950/40 text-emerald-400 border border-emerald-900/40">
                            <span className="font-bold">Success:</span> {success}
                        </div>
                    )}

                    {/* Action Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 font-semibold rounded-2xl text-sm bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : null}
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-white/5 mt-2 text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link href={`/auth/signup?redirect=${redirectTo}`} className="font-medium cursor-pointer text-indigo-400 hover:text-indigo-300 transition-colors">
                            Sign up now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
