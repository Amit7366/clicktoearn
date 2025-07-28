"use client";

import { useEffect, useState } from "react";
import {
  ArrowUp,
  ChevronDown,
  Menu,
  ShoppingCart,
  User,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUserInfo } from "@/services/auth.services";
import Image from "next/image";

export const menu = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Plans", href: "/our-plan" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`max-w-screen fixed top-0 left-0 right-0 z-50 overflow-x-hidden ${
          scrolled ? "bg-[#0B0A1E] shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-0 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={"/logo.png"}
              width={150}
              height={100}
              alt="ClicktoEarn"
            />
            {/* <span className="text-xl font-bold text-pink-600">
              Click<span className="text-purple-600">to</span>Earn
            </span> */}
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {menu.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={`${scrolled ? "text-white" : "text-black"} ${
                  pathname === item.href ? "text-purple-600" : ""
                } font-semibold flex items-center gap-1 hover:text-purple-600 transition`}
              >
                {item.label}
              </Link>
            ))}

            {/* Right Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-6 py-3 rounded-bl-md rounded-tr-md shadow flex items-center gap-2"
              >
                <UserPlus />
                <span>Login / Register</span>
              </Link>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="text-black font-bold text-xl">
              {menuOpen ? (
                <X className="text-red-600" />
              ) : (
                <Menu className="text-purple-600" />
              )}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 px-4 py-4 space-y-3 bg-white shadow-md rounded-xl">
            {menu.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block w-full text-base text-black hover:text-purple-600 transition"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 mt-2">
              <Link
                href="/login"
                className="w-44 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md shadow text-center"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Scroll to Top Button */}
      {scrolled && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 z-[999] bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Navbar;
