"use client";

import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Background Pattern / Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          {/* Left Section */}
          <div>
            {/* Logo */}
            <Link href="/">
              <h2 className="text-4xl font-extrabold tracking-tight">
                <span className="text-blue-500">hire</span>
                <span className="text-orange-500">loop</span>
              </h2>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-500">
              The AI-native career platform. Built for people who take
              their work seriously.
            </p>

            {/* Social Icons */}
            <div className="mt-20 flex items-center gap-3">
              <Link
                href="#"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-md
                  bg-white/5
                  text-gray-400
                  transition-all
                  hover:bg-[#2F27CE]
                  hover:text-white
                "
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-md
                  bg-[#2F27CE]
                  text-white
                "
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-md
                  bg-white/5
                  text-gray-400
                  transition-all
                  hover:bg-[#2F27CE]
                  hover:text-white
                "
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-[#4F46E5]">
              Product
            </h3>

            <div className="space-y-4">
              <Link
                href="/jobs"
                className="block text-gray-500 transition hover:text-white"
              >
                Job discovery
              </Link>

              <Link
                href="#"
                className="block text-gray-500 transition hover:text-white"
              >
                Worker AI
              </Link>

              <Link
                href="/companies"
                className="block text-gray-500 transition hover:text-white"
              >
                Companies
              </Link>

              <Link
                href="#"
                className="block text-gray-500 transition hover:text-white"
              >
                Salary data
              </Link>
            </div>
          </div>

          {/* Navigations */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-[#4F46E5]">
              Navigations
            </h3>

            <div className="space-y-4">
              <Link
                href="#"
                className="block text-gray-500 transition hover:text-white"
              >
                Help center
              </Link>

              <Link
                href="#"
                className="block text-gray-500 transition hover:text-white"
              >
                Career library
              </Link>

              <Link
                href="/contact"
                className="block text-gray-500 transition hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-[#4F46E5]">
              Resources
            </h3>

            <div className="space-y-4">
              <Link
                href="#"
                className="block text-gray-500 transition hover:text-white"
              >
                Brand Guideline
              </Link>

              <Link
                href="#"
                className="block text-gray-500 transition hover:text-white"
              >
                Newsroom
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-16 border-t border-white/5 pt-8">
          <div className="flex flex-col gap-3 text-sm text-gray-600 md:flex-row md:justify-end md:items-center">
            <span>Copyright 2024 — Programming Hero</span>

            <span className="hidden md:block">•</span>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms & Policy
            </Link>

            <span className="hidden md:block">•</span>

            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}