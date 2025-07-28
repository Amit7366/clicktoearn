import PageHeader from "@/components/Shared/PageHeader";
import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="py-20">
      <PageHeader header={"Contact US"} />
      <section className="py-16 px-4 md:px-12 bg-gradient-to-t from-white to-cyan-50">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Contact Info */}
          <div className="bg-teal-500 text-white p-8 space-y-6 relative">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              We'll create high-quality linkable content and build at least 40
              high-authority.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> +01*********
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> +01*********
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" /> support@clikz2earn.com
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" /> New York, USA
              </div>
            </div>

            {/* Optional background shape */}
            <div className="absolute -bottom-10 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          </div>

          {/* Form */}
          <form className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm block font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Trangely"
                  className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-2"
                />
              </div>
              <div>
                <label className="text-sm block font-medium mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="hello@nurency.com"
                  className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-2"
                />
              </div>
            </div>

            <div>
              <label className="text-sm block font-medium mb-1">
                Your Subject
              </label>
              <input
                type="text"
                placeholder="I want to hire you quickly"
                className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-2"
              />
            </div>

            <div>
              <label className="text-sm block font-medium mb-1 text-teal-500">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write here your message"
                className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-2 resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
