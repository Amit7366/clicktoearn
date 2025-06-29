import TestimonialsSection from "@/components/Home/Testimonial";
import { Check } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const plans = [
    {
      name: "FREE",
      price: 0,
      users: "2 user",
      features: [
        ["Learning Scope", true],
        ["Team collaboration", false],
        ["Export HTML code", true],
        ["Upload Your Logo", true],
      ],
      buttonColor: "bg-violet-600",
      icon: "🐻",
    },
    {
      name: "BASIC",
      price: 29,
      users: "5 user",
      features: [
        ["Learning Scope", true],
        ["Team collaboration", false],
        ["Export HTML code", true],
        ["Upload Your Logo", true],
      ],
      buttonColor: "bg-pink-500",
      icon: "🖐️",
    },
    {
      name: "PRO",
      price: 59,
      users: "10 user",
      features: [
        ["Learning Scope", true],
        ["Team collaboration", false],
        ["Export HTML code", true],
        ["Upload Your Logo", true],
      ],
      buttonColor: "bg-violet-600",
      icon: "✋",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-[#0B0A1E] text-white py-20 px-4 md:px-0 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute right-0 bottom-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] -z-10">
          <Image
            src={'https://edurock-blond.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout_8.e962d7b6.png&w=640&q=75'}
            alt="Glow Background"
            width={400}
          height={400}
            
            objectFit="contain"
            className="pointer-events-none select-none"
          />
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 relative z-10">
          <div>
            <p className="text-sm tracking-widest text-pink-500 font-semibold mb-2">
              EDUCATION SOLUTION
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Cloud-based LMS <br /> Trusted by 1000+
            </h1>
            <p className="text-gray-300 mb-6 max-w-md">
              Lorem Ipsum is simply dummy text of the printing typesetting
              industry. Lorem Ipsum has been
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button className="bg-white text-black font-medium px-5 py-2 rounded-md">
                View Courses
              </button>
              <button className="text-white font-medium hover:underline">
                Find out more →
              </button>
            </div>
          </div>

          <div className="relative min-h-[500px] z-10">
            <Image
              src={'https://edurock-blond.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout_1.f749b788.png&w=640&q=75'}
              alt="Hero Illustration"
               width={300}
            height={300}
              className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
              priority
            />
            <Image
              src={'https://edurock-blond.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fabout_8.e962d7b6.png&w=640&q=75'}
              alt="Hero Illustration"
               width={300}
            height={300}
              className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
              priority
            />
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="container relative bg-white py-16 px-4 md:px-0 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side - Image & Video */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative w-[50%] min-h-[500px]">
            <Image
              src="https://html.themewin.com/pixells/quarter-tailwind-preview/quarter/assets/img/others/7.png"
              alt="Room Interior"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-xl"
            />

            {/* Video Preview */}
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[200px] h-[140px] rounded-xl shadow-lg overflow-hidden z-10">
              <Image
                src="https://images.unsplash.com/photo-1750459273768-f2c1018ba69d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Room Video Preview"
                width={200}
                height={140}
                className="w-full h-full object-cover"
              />
              <button className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2">
          <span className="inline-block text-sm bg-red-100 text-red-500 px-4 py-1 rounded-full font-medium mb-3">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            The Leading Real Estate <br /> Rental Marketplace
          </h2>
          <p className="text-gray-600 mb-6">
            Over 39,000 people work for us in more than 70 countries all over
            the world. This breadth of global coverage, combined with specialist
            services.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
          </div>

          {/* Quote */}
          <div className="bg-red-50 border-l-4 border-red-400 text-gray-700 p-4 mb-6">
            "Enimad minim veniam quis nostrud exercitation ullamco laboris.
            Lorem ipsum dolor sit amet"
          </div>

          {/* Button */}
          <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-md">
            OUR SERVICES
          </button>
        </div>
      </section>
      {/* Service Section */}
      <section className="bg-[#f6f6fe] py-20 px-4 md:px-20">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-10">
          {/* Left Content */}
          <div className="max-w-xl">
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full font-semibold text-sm mb-4">
              Populer Subject
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4">
              Provide IT & Technology <br /> Subject For You
            </h2>
            <p className="text-gray-600 mb-4">
              Construction is a general term meaning the art and science to form
              systems organizations, and comes from Latin Construction is
            </p>
            <blockquote className="border-l-2 border-pink-500 pl-4 text-gray-600 italic mb-6">
              Construction is a general term meaning the art and science to form
              systems organizations, and comes from Latin Construction is a
              organizations, and comes from Latin construction and Old
            </blockquote>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-md">
              Explore More ⟶
            </button>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">
            {[
              {
                title: "Business Studies",
                icon: "📈",
                desc: "Construction is a general term the art and science to form",
              },
              {
                title: "Artist & Design",
                icon: "💡",
                desc: "Construction is a general term the art and science to form",
              },
              {
                title: "Machine Learning",
                icon: "📖",
                desc: "Construction is a general term the art and science to form",
              },
              {
                title: "Artist & Design",
                icon: "📈",
                desc: "Construction is a general term the art and science to form",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-xl p-6 transition duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ boxShadow: "0 20px 60px rgba(132, 139, 200, 0.1)" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center text-2xl rounded-full shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-800 hover:text-purple-600"
                >
                  View Subject ⟶
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="max-w-6xl w-full mx-auto bg-[#fdfdff] py-20 px-4 md:px-16 text-center">
        <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full font-semibold text-sm mb-4">
          Subcription Plan
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Choose The Best Package <br /> For your Income
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-xl shadow-xl px-8 py-10 w-full  mx-auto hover:shadow-2xl transition-all duration-300"
            >
              {/* Decorative Icon */}
              <div className="absolute md:top-[-30px] right-[30px] md:right-[-30px] text-4xl select-none">
                {plan.icon}
              </div>

              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-1">
                ${plan.price}
                <span className="text-base font-medium">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Perfect for startup</p>

              <ul className="text-sm text-left text-gray-700 space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-pink-600 text-lg">✔</span> {plan.users}
                </li>
                {plan.features.map(([feat, ok], i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className={ok ? "text-pink-600" : "text-gray-400"}>
                      {ok ? "✔" : "✖"}
                    </span>
                    <span className={ok ? "" : "text-gray-400"}>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`${plan.buttonColor} w-full text-white font-semibold py-3 rounded-md hover:opacity-90 transition`}
              >
                Get Started
              </button>

              <p className="text-xs text-gray-400 mt-3">
                No credit card required
              </p>
            </div>
          ))}
        </div>
      </section>
      <TestimonialsSection />
    </main>
  );
}
