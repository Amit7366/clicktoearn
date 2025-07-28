import React from "react";

const Service = () => {
  return (
    <section className="bg-[#f6f6fe] py-20 px-4 md:px-20">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Content */}
        <div className="max-w-xl">
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full font-semibold text-sm mb-4">
            ClicktoEarn
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4">
            Benefits And Facilities
          </h2>
          <p className="text-gray-600 mb-4">
            Clikz2Earn offers an easy, secure, and flexible way to earn money
            online. With various earning plans, a rewarding referral program,
            and 24/7 customer support, this platform is designed to help you
            maximize your income with no experience needed. Start earning today
            and enjoy the benefits of a reliable online income!
          </p>
          {/* <blockquote className="border-l-2 border-pink-500 pl-4 text-gray-600 italic mb-6">
                  Construction is a general term meaning the art and science to form
                  systems organizations, and comes from Latin Construction is a
                  organizations, and comes from Latin construction and Old
                </blockquote>
                <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-md">
                  Explore More ⟶
                </button> */}
        </div>

        {/* Right Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">
          {[
            {
              title: "Easy to Use",
              icon: "📈",
              desc: "Clikz2Earn offers a simple, user-friendly interface that makes earning money online easy for everyone.",
            },
            {
              title: "Flexible Earning Potential",
              icon: "💡",
              desc: "Choose from various plans to suit your financial goals and start earning right away.",
            },
            {
              title: "24/7 Support",
              icon: "📖",
              desc: "Our dedicated customer support team is always available to assist you with any questions or issues.",
            },
            {
              title: "Secure Payments",
              icon: "📈",
              desc: "Your earnings are protected with secure payment methods, ensuring hassle-free withdrawals.",
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
  );
};

export default Service;
