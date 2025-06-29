"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { ImQuotesLeft } from "react-icons/im";

const testimonials = [
  {
    text: `“The other hand we denounce righteous indignation men who are so beguiled and demoralized by the charms of pleasure of the moment. Dislike men who are so development co”`,
    name: "Robind Jon",
    role: "Designer TechBoot",
    img: "https://edurock-blond.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout_5.97d85e93.png&w=96&q=75",
  },
  {
    text: `“The other hand we denounce righteous indignation men who are so beguiled and demoralized by the charms of pleasure of the moment. Dislike men who are so development co”`,
    name: "Robind Jon",
    role: "Designer TechBoot",
    img: "https://edurock-blond.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout_5.97d85e93.png&w=96&q=75",
  },
  {
    text: `“The other hand we denounce righteous indignation men who are so beguiled and demoralized by the charms of pleasure of the moment. Dislike men who are so development co”`,
    name: "Robind Jon",
    role: "Designer TechBoot",
    img: "https://edurock-blond.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout_5.97d85e93.png&w=96&q=75",
  },
  {
    text: `“The other hand we denounce righteous indignation men who are so beguiled and demoralized by the charms of pleasure of the moment. Dislike men who are so development co”`,
    name: "Robind Jon",
    role: "Designer TechBoot",
    img: "https://edurock-blond.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout_5.97d85e93.png&w=96&q=75",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#f7f7ff] py-20 px-4 md:px-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative z-10">
          <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-4 py-1 rounded-full inline-block mb-4">
            Course List
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What They Say <br /> About us
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Construction is a general term meaning the art and science to form
            systems organizations and comes from Latin Construction is
          </p>
          <button className="bg-[#f43f5e] text-white px-6 py-2 rounded hover:bg-[#e11d48] transition text-sm">
            Explore More →
          </button>
        </div>

        <div>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: null,
              prevEl: null,
            }}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
            className="[&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="w-full bg-white rounded-lg shadow p-6 relative">
                  <div className="absolute -top-5 left-5 bg-[#7e22ce] p-2 rounded text-white z-40">
                    <ImQuotesLeft className="w-6 h-6" />
                  </div>
                  <p className="text-gray-700 text-sm mb-6 mt-4">{t.text}</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
