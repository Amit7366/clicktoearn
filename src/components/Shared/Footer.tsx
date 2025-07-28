"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaSkype } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { menu } from "./Navbar";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-white px-6 md:px-16 py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">
            Still You Need Our <span className="text-purple-500">Support</span>{" "}
            ?
          </h2>
          <p className="mt-2 text-gray-300">
            Don’t wait make a smart & logical quote here. It's pretty easy.
          </p>
          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-gray-700 pt-10">
          <div>
            <h3 className="font-semibold text-lg mb-3">About us</h3>
            <p className="text-gray-400 text-sm">
              Corporate clients and leisure travelers have been relying on
              Groundlink for dependable safe, and professional chauffeur car end
              service in major cities across World.
            </p>
            <div className="flex items-start gap-3 mt-4">
              <div className="bg-purple-600 p-3 rounded-full">
                <BsClock className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">OPENING HOURS</p>
                <p className="text-sm text-gray-400">Mon - Sat (8.00 - 6.00)</p>
                <p className="text-sm text-gray-400">Sunday - Closed</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Usefull Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {
                menu.map((item,idx) =>  <li key={idx}><Link href={item.href}>{item.label}</Link></li>)
              }
             
             
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Course</h3>
            <ul className="space-y-2 text-sm text-gray-400">
             {
                menu.map((item,idx) =>  <li key={idx}><Link href={item.href}>{item.label}</Link></li>)
              }
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Recent Post</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-14 h-14 bg-gray-600 rounded-md" />
                  <div>
                    <p className="text-xs text-gray-400">02 Apr 2024</p>
                    <p className="text-sm text-white font-semibold">
                      {idx === 0
                        ? "Best Your Business"
                        : idx === 1
                        ? "Keep Your Business"
                        : "Nice Your Business"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          {/* <div className="flex items-center gap-2 text-lg font-bold">
            <span className="text-yellow-400 text-2xl">📚</span>
            Genius<span className="text-green-500">Andro</span>
          </div> */}
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Copyright © <span className="text-blue-400">2025</span> by Us.
            All Rights Reserved.
          </p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <FaFacebookF className="text-gray-400 hover:text-white" />
            <FaTwitter className="text-gray-400 hover:text-white" />
            <FaLinkedinIn className="text-gray-400 hover:text-white" />
            <FaSkype className="text-gray-400 hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
