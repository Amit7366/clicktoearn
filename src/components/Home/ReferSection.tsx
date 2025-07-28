// components/ReferSection.tsx
import Image from "next/image";
import Link from "next/link";

const ReferSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-white">
          <h2 className="text-3xl text-black md:text-4xl font-bold mb-4">
            Refer Friends and Earn
          </h2>
          <p className="text-base md:text-lg mb-6 leading-relaxed text-gray-400">
            Boost your earnings with our referral program! Invite your friends
            to join Clikz2Earn and earn exciting bonuses for every successful
            referral. The more friends you refer, the more rewards you unlock.
            Share your unique referral link, help your network start earning,
            and enjoy additional income together. Start referring today and grow
            your earnings effortlessly!
          </p>
          <Link href={"/register"} className="bg-purple-600 hover:bg-orange-600 transition text-white font-semibold px-6 py-3 rounded-bl-md rounded-tr-md ">
            Create Account
          </Link>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <Image
            src="/reffer.webp" // ⬅️ Replace with your image path
            alt="Refer Friends"
            width={700}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default ReferSection;
