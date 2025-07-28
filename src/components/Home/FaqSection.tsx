"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Clikz2Earn?",
    answer:
      "Clikz2Earn is a platform where users can register, complete tasks, and earn money online securely and easily.",
  },
  {
    question: "How do I start earning?",
    answer:
      "Simply sign up, verify your email, and begin completing available offers and activities.",
  },
  {
    question: "Is it safe to use Clikz2Earn?",
    answer:
      "Yes, Clikz2Earn ensures user data privacy and secure transactions using advanced security measures.",
  },
  {
    question: "How do I get paid?",
    answer:
      "You can withdraw your earnings through various supported payment methods after reaching the minimum payout.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* FAQ Items */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-black focus:outline-none"
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="rounded-3xl overflow-hidden max-w-[400px] w-full">
            <Image
              src="/faq.webp" // change to your own image
              alt="Support Representative"
              width={400}
              height={400}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
