"use client";

import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Register",
    description:
      "Begin your journey with Clikz2Earn by signing up for free. Simply provide your details to create an account and start exploring earning opportunities.",
    image: "/step-1.webp", // replace with your image path
    reverse: false,
  },
  {
    id: 2,
    title: "Verify Account",
    description:
      "Secure your account by verifying your email address. This quick step ensures a safe and hassle-free experience on our platform.",
    image: "/step-2.webp", // replace with your image path
    reverse: true,
  },
  {
    id: 3,
    title: "Choose a Plan",
    description:
      "Pick from a variety of plans tailored to meet your earning goals. Whether youre just starting or looking to maximize rewards, we have a plan for you",
    image: "/step-3.webp", // replace with your image path
    reverse: false,
  },
  {
    id: 4,
    title: "Verify Account",
    description:
      "Start earning by viewing ads on our platform. Each ad you watch brings you closer to your rewards, making every click count!",
    image: "/step-4.webp", // replace with your image path
    reverse: true,
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        How It Works
      </h2>
      <div className="space-y-24">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`relative flex flex-col md:flex-row ${
              step.reverse ? "md:flex-row-reverse" : ""
            } items-center gap-10 md:gap-16`}
          >
            {/* Image */}
            <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-md flex-shrink-0">
              <Image
                src={step.image}
                alt={step.title}
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 max-w-md">{step.description}</p>
            </div>

            {/* Step Number */}
            <h1 className="absolute text-[80px] md:text-[120px] font-bold text-transparent z-0 -mt-20 md:mt-0 md:-ml-12 pointer-events-none stroke-text">
              {`0${step.id}`}
            </h1>

            {step.id <= 3 && (
              <span
                className={`${
                  step.reverse === false
                    ? "absolute bottom-0 left-1/2 -translate-x-1/2"
                    : "absolute bottom-0 left-1/2 -translate-x-1/2 -rotate-90 "
                }`}
              >
                <svg
                  width="400"
                  height="180"
                  viewBox="0 0 904 480"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50.3057 451.001L49.0059 469.206L62.2451 469.497"
                    stroke="#F7AFAC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M865.112 31.1245C843.116 112.199 755.036 210.999 473.807 194.977C388.771 184.498 133.375 260.14 51.5361 467.499"
                    stroke="#F34141"
                    stroke-opacity="0.6"
                    stroke-width="3.5"
                    stroke-dasharray="5 5"
                  ></path>
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
