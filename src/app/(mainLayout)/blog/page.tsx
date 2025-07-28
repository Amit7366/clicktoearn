import ReferSection from "@/components/Home/ReferSection";
import TestimonialsSection from "@/components/Home/Testimonial";
import PageHeader from "@/components/Shared/PageHeader";
import Image from "next/image";
import React from "react";

const projects = [
  {
    title: "Silent Night Flyers: A Closer Look at the Mystical World of Owls",
    description:
      "Fauna & Flora has been using the collective knowledge and experience of our people and our partners to protect nature across the globe.",
    image: "https://clik2earn.com/assets/global/images/vZG3MUwCzIZq3gw094r7.jpg", // update with actual path
    buttonText: "More Detail",
  },
  {
    title: "Conserving Africa’s Cape Floral Kingdom",
    image: "https://clik2earn.com/assets/global/images/r4pbyZZg1B76DWZvEY5e.jpg",
  },
  {
    title: "Exploring the Majestic World of White Tigers",
    image: "https://clik2earn.com/assets/global/images/jBtYMPxBtgqK31xWfXzC.jpg",
  },
];

const BlogPage = () => {
  return (
    <div className="py-20">
      <PageHeader header={"Blog"} />
      <section className="bg-white px-4 py-12 md:px-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-700">Our Project</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-black">
              Discover Our Global <br className="hidden md:block" />
              Blog Post
            </h2>
          </div>
          <button className="hidden md:block text-sm bg-lime-400 text-black px-4 py-2 rounded-full hover:bg-lime-500 transition">
            See More
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden group h-[300px] md:h-[400px]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <h3 className="text-lg md:text-xl font-semibold">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="mt-1 text-sm text-gray-200">
                    {project.description}
                  </p>
                )}
                {project.buttonText && (
                  <button className="mt-3 text-sm px-4 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition">
                    {project.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <ReferSection/>
      <TestimonialsSection/>
    </div>
  );
};

export default BlogPage;
