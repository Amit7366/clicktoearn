"use client";

import { useState } from "react";
import { ChevronDown, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getUserInfo } from "@/services/auth.services";

const menu = ["Home", "Subscription", "Service", "About", "Contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="max-w-screen bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 md:px-0 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-pink-600">
            Click<span className="text-purple-600">to</span>Earn
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {menu.map((item) => (
            <Link
              href={"/login"}
              key={item}
              className="text-sm text-black font-medium flex items-center gap-1 hover:text-purple-600"
            >
              {item}
              {/* <ChevronDown className="w-4 h-4" /> */}
            </Link>
          ))}

          {/* Right Buttons */}
          <div className="flex items-center space-x-3">
            {/* <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] px-1.5 rounded-full">
                6
              </span>
            </div>
            <button className="border p-2 rounded-full">
              <User className="w-4 h-4" />
            </button> */}
            <Link
              href="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-6 py-2 rounded-md shadow"
            >
              Login
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="text-black font-bold text-xl">≡</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-md rounded-b-xl">
          {menu.map((item) => (
            <button
              key={item}
              className="w-full text-left text-base text-black flex items-center gap-1 hover:text-purple-600"
            >
              {item}
              {/* <ChevronDown className="w-4 h-4" /> */}
            </button>
          ))}
          <div className="flex items-center gap-4 mt-2">
            {/* <ShoppingCart className="w-5 h-5" />
            <button className="border p-2 rounded-full">
              <User className="w-4 h-4" />
            </button> */}
            <Link
              href="/login"
              className="w-44 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md shadow text-center"
            >
              Get Start
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
