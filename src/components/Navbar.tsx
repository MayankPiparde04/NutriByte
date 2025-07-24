"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    { label: "Home", path: "/" },
    { label: "REE", path: "/ree" },
    { label: "Profile", path: "/profile" },
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
  ];

  const NavItems = () => (
    <>
      {routes.map(({ label, path }) => (
        <Link href={path} className="group" key={label}>
          <span className="px-4 py-2 text-sm font-medium text-white hover:text-green-100 transition-all relative">
            {label}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0.5 bg-green-300 group-hover:w-3/4 transition-all duration-200 rounded-full" />
          </span>
        </Link>
      ))}
    </>
  );

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[80%] rounded-2xl backdrop-blur-md border shadow-md transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-green-800/60 to-teal-600/60 border-white/30"
          : "bg-white/10 border-white/20"
      }`}
    >
      <nav className="flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-[42px] h-[42px]">
            <Image
              src="/NutriByte-logo.png"
              alt="NutriByte Logo"
              fill
              className="rounded-full ring-1 ring-white/20 shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100 font-serif">
            NutriByte
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <NavItems />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gradient-to-br from-green-700 to-green-800 text-white border-l border-white/20"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center p-4 border-b border-white/20">
                  <Image
                    src="/NutriByte-logo.png"
                    alt="NutriByte Logo"
                    width={36}
                    height={36}
                    className="rounded-full shadow-sm mr-3"
                  />
                  <span className="text-lg font-semibold">NutriByte</span>
                </div>
                <div className="flex flex-col space-y-2 p-6">
                  <NavItems />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
