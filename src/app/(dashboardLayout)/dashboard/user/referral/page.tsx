"use client";

import { useState } from "react";
import { Copy, Send, UserPlus, Gift, Share2 } from "lucide-react";
import { toast } from "sonner";
import { getInfoAboutMe } from "@/hooks/getInfoAboutMe";
import ReferralGenerationList from "./RefferalGeneration";
import Link from "next/link";


const ReferralSection = () => {
  const [copied, setCopied] = useState(false);
  const { user: userDetails, loading } = getInfoAboutMe();
  const referralLink = `https://www.clikz2earn.com/register?invite=${userDetails?.referralId}`;
// console.log(userDetails.referralId);
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Clik2Earn",
          text: "Get ₹5 bonus! Use my referral link:",
          url: referralLink,
        });
      } catch (err) {
        toast.error("Sharing cancelled.");
      }
    } else {
      toast.info("Sharing not supported on this device.");
    }
  };

  return (
    <>
      <section className="px-4 py-12 bg-white mt-12">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-lg p-8 text-center space-y-8">
          <h2 className="text-base md:text-3xl font-bold">
            Earn 10% Reffer Commission by each friend for 1st deposit !
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div onClick={handleCopy} className="flex flex-col items-center space-y-2 cursor-pointer">
              <div className="bg-white/20 p-3 rounded-full">
                <Copy className="w-6 h-6" />
              </div>
              <p className="font-semibold text-xs md:text-base">Copy the Link</p>
             
            </div>

            <div onClick={handleShare} className="flex flex-col items-center space-y-2 cursor-pointer">
              <div className="bg-white/20 p-3 rounded-full">
                <Send className="w-6 h-6" />
              </div>
              <p className="font-semibold text-xs md:text-base">Send Invitation</p>
             
            </div>

            <div onClick={handleCopy} className="flex flex-col items-center space-y-2">
              <div className="bg-white/20 p-3 rounded-full">
                <UserPlus className="w-6 h-6" />
              </div>
              <p className="font-semibold text-xs md:text-base">Registration</p>
              
            </div>

            <Link href={'/dashboard'} className="flex flex-col items-center space-y-2">
              <div className="bg-white/20 p-3 rounded-full">
                <Gift className="w-6 h-6" />
              </div>
              <p className="font-semibold text-xs md:text-base">Get your Reward</p>
              
            </Link>
          </div>
        </div>

        {/* Link Sharing Box */}
        <div className="mt-10 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">Share Your Referral Link</h3>
          <p className="text-sm text-gray-600 mb-4">
            You can also share your referral link by copying and sending it or
            sharing to your social media
          </p>

          <div className="flex flex-col items-start gap-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="text-xs md:text-base w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                >
                  <Copy className="w-4 h-4" />{" "}
                  {copied ? "Copied!" : "Copy Link"}
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            0 people join using this link
          </p>
        </div>
      </section>
      <section className="p-4 md:p-8 space-y-8 bg-gradient-to-b from-white to-indigo-50 min-h-screen">
        {/* Referral Tree */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Referral Tree</h2>
          <div className="overflow-auto">
            {/* Replace with actual tree chart or structure */}
            
              
              <ReferralGenerationList/>
            
          </div>
        </div>

       
      </section>
    </>
  );
};

export default ReferralSection;
