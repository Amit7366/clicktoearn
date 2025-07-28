'use client';

import { X } from 'lucide-react';

type Props = {
  onClose: () => void;
  data?: any;
};

const UserModal = ({ onClose, data }: Props) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Edit User Information</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="px-6 py-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={data?.name || ''}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={data?.email || ''}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue={data?.phone || ''}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              placeholder="Enter phone number"
            />
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                defaultValue={data?.age || ''}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div className="flex gap-4 items-center mt-1">
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="gender" defaultChecked />
                  Male
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="gender" />
                  Female
                </label>
              </div>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              defaultValue={data?.dob || ''}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-1 text-sm">
                <input type="radio" name="status" defaultChecked />
                <span className="text-green-600">●</span> Active
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input type="radio" name="status" />
                <span className="text-red-600">●</span> Inactive
              </label>
            </div>
          </div>

          {/* Buttons */}
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

export default UserModal;
