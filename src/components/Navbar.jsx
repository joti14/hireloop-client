"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { motion } from "motion/react"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  // console.log("Session data in navbar: ", session, "is pending: ", isPending);
  const user = session?.user;
  // console.log(user, 'user')

  const handleSignOut = async() => {
    await signOut();
  }

  const navLinks = [
    {
      name: "Browse Jobs",
      href: "/jobs",
    },
    {
      name: "Company",
      href: "/companies",
    },
    {
      name: "Pricing",
      href: "/plans",
    },
  ];

  return (
    <header className="w-full px-4 lg:px-8 py-6">
      <nav
        className="
          mx-auto
          max-w-7xl
          h-[76px]
          rounded-[24px]
          border border-white/10
          bg-[#151515]/80
          backdrop-blur-xl
          flex items-center
          px-6 lg:px-8
          shadow-lg
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          {/* Replace with Image if you have logo */}
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-blue-500">hire</span>
            <span className="text-orange-500">loop</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="ml-auto hidden md:flex items-center">
          {/* Nav Links */}
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  text-gray-300
                  hover:text-white
                  transition-colors
                  duration-200
                  text-sm
                  font-medium
                "
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-8 h-7 w-px bg-white/15" />

          {/* Sign In */}
          {
            user ?
              <>
                Welcome, {user?.name}! 
                <Button onClick={handleSignOut} variant="ghost">Sign Out</Button>
              </>
              :
              <Link
                href="/auth/signin"
                onClick={() => setIsOpen(false)}
                className="text-indigo-400 font-medium"
              >
                Sign In
              </Link>}

          {/* CTA */}
          <Button
            as={Link}
            href="/auth/signup"
            radius="lg"
            className="
              ml-8
              bg-indigo-600
              hover:bg-indigo-500
              text-white
              font-semibold
              px-8
              min-w-[150px]
              h-12
            "
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto md:hidden text-white"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="
            md:hidden
            mt-3
            rounded-3xl
            border border-white/10
            bg-[#151515]/95
            backdrop-blur-xl
            p-6
          "
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="
                  text-gray-300
                  hover:text-white
                  transition-colors
                "
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-white/10 pt-5 flex flex-col gap-4">
              {
                user ?
                  <>
                    <Button variant="ghost">Sign Out</Button>
                  </>
                  :
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsOpen(false)}
                    className="text-indigo-400 font-medium"
                  >
                    Sign In
                  </Link>}

              <Button
                as={Link}
                href="/auth/signup"
                onPress={() => setIsOpen(false)}
                className="bg-indigo-600 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}