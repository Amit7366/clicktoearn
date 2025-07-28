import Image from "next/image";
import React from "react";

const PageHeader = ({ header }: any) => {
  return (
    <section className="relative w-full h-[300px] md:h-[400px]  overflow-hidden flex items-center justify-center">
      {/* Orange right shape */}
      <div className="absolute top-0 right-0 h-full w-[55%] bg-purple-600 rounded-l-[100px] md:rounded-l-[180px]"></div>
      <div className="absolute top-0 right-0 h-full w-[60%] bg-purple-600 bg-opacity-60 rounded-l-[100px] md:rounded-l-[180px]"></div>
      <div className="absolute top-0 right-0 h-full w-[65%] bg-purple-600 bg-opacity-50 rounded-l-[100px] md:rounded-l-[180px]"></div>
      <div className="absolute top-0 right-0 h-full w-[70%] bg-purple-600 bg-opacity-40 rounded-l-[100px] md:rounded-l-[180px]"></div>
       <Image
        src={"/7.svg"}
        alt="Hero Illustration"
        width={100}
        height={100}
        className="absolute top-0 left-0 object-contain animate-floatX"
        priority
      />
      <Image
        src={"/6.svg"}
        alt="Hero Illustration"
        width={100}
        height={100}
        className="absolute z-10 top-20 right-16 object-contain animate-float"
        priority
      />
     
      {/* Background abstract shapes (optional placeholders) */}
      <div className="absolute top-8 left-6 w-8 h-8 bg-orange-200 rounded-full opacity-50 animate-float"></div>
      <div className="absolute bottom-10 left-16 w-10 h-10 bg-pink-200 rounded-full opacity-30"></div>
      <div className="absolute top-10 right-16 w-2 h-2 bg-white rounded-full shadow-md"></div>

      {/* Heading text */}
      <h1 className="relative z-10 text-3xl md:text-5xl font-extrabold text-white">
         {header}
      </h1>
    </section>
  );
};

export default PageHeader;
