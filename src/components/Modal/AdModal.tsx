'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { getFromLocalStorage } from '@/utils/local-storage';

interface AdData {
  _id?: string;
  title: string;
  videoUrl: string;
  type: string;
  date: string;
  adDuration: number;
  rewardVerification: {
    a: number;
    b: number;
    answer: number;
  };
  rewardAmount: number;
}

type Props = {
  onClose: () => void;
  data?: AdData;
};

const AdModal = ({ onClose, data }: Props) => {
  const token = getFromLocalStorage('accessToken');

  const [form, setForm] = useState({
    title: data?.title || '',
    videoUrl: data?.videoUrl || '',
    type: data?.type || 'YouTube',
    date: data?.date || new Date().toISOString().split('T')[0],
    adDuration: data?.adDuration || 0,
    rewardVerification: {
      a: data?.rewardVerification?.a || 0,
      b: data?.rewardVerification?.b || 0,
      answer: data?.rewardVerification?.answer || 0,
    },
    rewardAmount: data?.rewardAmount || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (['a', 'b', 'answer'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        rewardVerification: {
          ...prev.rewardVerification,
          [name]: Number(value),
        },
      }));
    } else if (['rewardAmount', 'adDuration'].includes(name)) {
      setForm((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?._id) return;

    const payload = {
      title: form.title,
      videoUrl: form.videoUrl,
      type: form.type,
      date: form.date,
      adDuration: form.adDuration,
      rewardVerification: form.rewardVerification,
      rewardAmount: form.rewardAmount,
    };

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/daily-tasks/${data._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error('Failed to update ad task');
      onClose(); // Close modal
      return res.json();
    });

    toast.promise(promise, {
      loading: 'Updating task...',
      success: (data) => data?.message || 'Task updated successfully!',
      error: (err) => err.message || 'Failed to update task.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Edit Ad Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="px-6 py-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL</label>
            <input
              type="url"
              name="videoUrl"
              value={form.videoUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              placeholder="Enter video URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Duration</label>
            <input
              type="number"
              name="adDuration"
              step="0.1"
              min="0"
              value={form.adDuration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              placeholder="0.5"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {['a', 'b', 'answer'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field === 'answer' ? 'Answer (A + B)' : field.toUpperCase()}
                </label>
                <input
                  type="number"
                  name={field}
                  value={(form.rewardVerification as any)[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                  placeholder={field.toUpperCase()}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reward Amount</label>
            <input
              type="number"
              step="0.01"
              name="rewardAmount"
              value={form.rewardAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              placeholder="0.2"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-red-500 text-red-500 rounded px-5 py-2 text-sm hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded text-sm hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdModal;
