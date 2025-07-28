import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section className="container relative bg-white py-16 px-4 md:px-0 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left Side - Image & Video */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center">
        <div className="relative w-[50%] min-h-[500px] flex items-center">
          <div className="absolute z-10 w-[300px] h-[200px] rounded-xl bg-purple-600 -right-5 top-7 -rotate-12 "></div>

          <Image
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Room Interior"
            width={500}
            height={500}
            className="w-full h-[300px] object-cover rounded-xl relative z-20"
          />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/2">
        <span className="inline-block text-sm bg-red-100 text-red-500 px-4 py-1 rounded-full font-medium mb-3">
          ClicktoEarn
        </span>
        <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
          About Us
        </h2>
        <p className="text-gray-600 mb-6">
          At Clikz2Earn, we believe in empowering individuals to earn money
          online easily and securely. Established with the goal of creating
          opportunities for everyone, our Paid-to-Click (PTC) platform offers a
          simple and reliable way to generate income by viewing ads.
        </p>
        <p className="text-gray-600 mb-6">
          Our mission is to provide a trustworthy and user-friendly platform
          where effort meets rewards. Whether you're a student, a homemaker, or
          a professional seeking extra income, Clikz2Earn is designed to make
          earning money online accessible to all.
        </p>
        <p className="text-gray-600 mb-6">
          We prioritize transparency, security, and efficiency, ensuring every
          user enjoys a seamless experience. With Clikz2Earn, your time and
          efforts are valued, and your earnings are just a few clicks away. Join
          us and discover how easy it is to turn your time into money!
        </p>

        {/* Features */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  ["Smart Home Design", "home"],
                  ["Exceptional Lifestyle", "users"],
                  ["Beautiful Scene Around", "image"],
                  ["Complete 24/7 Security", "shield"],
                ].map(([label, icon], index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-red-100 text-red-500 p-2 rounded-full">
                      <Check className="size-2" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">
                      {label}
                    </span>
                  </div>
                ))}
              </div> */}

        {/* Quote */}
        {/* <div className="bg-red-50 border-l-4 border-red-400 text-gray-700 p-4 mb-6">
                "Enimad minim veniam quis nostrud exercitation ullamco laboris.
                Lorem ipsum dolor sit amet"
              </div> */}

        {/* Button */}
        <Link
          href={"/register"}
          className="bg-purple-600 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-bl-md rounded-tr-md"
        >
          Regsiter with Us
        </Link>
      </div>
    </section>
  );
};

export default About;
