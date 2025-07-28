"use client";

import { useState } from 'react';
import { toast } from 'sonner';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitToApi = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/contact/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || 'Failed to send message');
    }

    return await response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await toast.promise(submitToApi(), {
      loading: 'Sending message...',
      success: () => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        return 'Message sent successfully!';
      },
      error: (err) => err.message || 'Failed to send message.'
    });
  };

  return (
    <section className="py-10 flex justify-start">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 space-y-6 rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm block font-medium mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Trangely"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm block font-medium mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="hello@nurency.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm block font-medium mb-1">Your Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="I want to hire you quickly"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-2"
            required
          />
        </div>

        <div>
          <label className="text-sm block font-medium mb-1 text-teal-500">Message</label>
          <textarea
            rows={4}
            name="message"
            placeholder="Write here your message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-2 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition font-medium"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default SupportPage;
