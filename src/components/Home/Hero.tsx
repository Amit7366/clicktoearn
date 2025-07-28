import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto relative bg-white py-24 px-4 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left Side - Image & Video */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center">
        <div>
          <p className="text-sm tracking-widest text-pink-500 font-semibold mb-2">
            EARNING SOLUTION
          </p>
          <h1 className="text-2xl md:text-5xl text-black font-bold leading-tight mb-4">
            Simple, Secure, and Reliable Way to Earn Money from Anywhere.
          </h1>
          <p className="text-gray-500 mb-6 text-sm md:text-base">
            Welcome to Clikz2Earn – your trusted platform for effortless online
            earnings. With our Paid-to-Click (PTC) model, you can make money
            securely and conveniently by viewing advertisements from the comfort
            of your own place. Whether you're looking to earn extra income or
            start a reliable side hustle, Clikz2Earn provides a simple,
            efficient, and rewarding experience. Join us today and turn your
            clicks into cash!
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href={"/login"}
              className="bg-purple-600 text-white font-medium px-6 py-3 rounded-bl-md rounded-tr-md flex gap-2 items-center"
            >
              <span>Get Started</span> <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href={"/register"}
              className="text-purple-600 font-medium hover:underline"
            >
              Find out more
            </Link>
          </div>
        </div>
        <Image
          src={"/shape-three.svg"}
          alt="Hero Illustration"
          width={50}
          height={50}
          className="absolute z-10 bottom-20 left-2 object-cover animate-float"
          priority
        />
        <Image
          src={"/shape-four.svg"}
          alt="Hero Illustration"
          width={50}
          height={50}
          className="absolute z-10 top-20 right-2 object-cover animate-float"
          priority
        />
      </div>

      {/* Right Side - Content */}
      <div className="relative min-h-[500px] w-full md:w-1/2">
        <Image
          src={"/hero.png"}
          alt="Hero Illustration"
          width={500}
          height={500}
          className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
          priority
        />
        <Image
          src={
            "https:edurock-blond.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout_8.e962d7b6.png&w=640&q=75"
          }
          alt="Hero Illustration"
          width={300}
          height={300}
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
          priority
        />

        <Image
          src={"/shape-five.svg"}
          alt="Hero Illustration"
          width={100}
          height={100}
          className="absolute z-10 top-20 right-16 object-contain animate-float"
          priority
        />
        <Image
          src={"/shape-five.svg"}
          alt="Hero Illustration"
          width={100}
          height={100}
          className="absolute z-10 top-20 right-16 object-cover animate-float"
          priority
        />
        <Image
          src={"/shape-six.svg"}
          alt="Hero Illustration"
          width={50}
          height={50}
          className="absolute z-10 bottom-20 right-16 object-cover animate-floatX"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
