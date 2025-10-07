"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center justify-center text-xl gap-2">
            <span className="text-2xl font-extrabold text-orange-500  tracking-tight">
              Task
            </span>
            <span className="hidden sm:inline-flex items-center mt-1 rounded-full border border-amber-500  px-2 py-0.5 text-xs text-amber-500 ">
              Flow
            </span>
          </Link>

          <nav className="hidden lg:flex gap-6 items-center">
            <Link
              href="/"
              className="text-[15px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#674ddb] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/addTasks"
              className="text-[15px] font-medium text-gray-700 dark:text-gray-200 hover:text-[#674ddb] transition-colors"
            >
              Add Tasks
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/contact">Get Started</Link>
            </Button>

            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="h-6 w-6 text-gray-800 dark:text-gray-100" />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm lg:hidden">
          <div className="absolute right-0 top-0 h-full w-3/4 max-w-xs bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-800 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-[#674ddb]">TaskFlow</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-800 dark:text-gray-100" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-200">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium hover:text-[#674ddb] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/addTasks"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium hover:text-[#674ddb] transition-colors"
              >
                Add Tasks
              </Link>
            </nav>

            <div className="mt-8">
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>

          <div
            className="absolute inset-0"
            onClick={() => setMenuOpen(false)}
          ></div>
        </div>
      )}
    </header>
  );
}
