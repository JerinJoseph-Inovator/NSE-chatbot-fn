import { useState } from 'react';

export default function UserInfoModal({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (name.trim() && email.trim()) {
      onSubmit({ name, email });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-white to-[#f4f6f9] p-6 rounded-2xl shadow-xl w-[90%] max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold mb-2 text-[#3a2d7d]">👋 Welcome!</h2>
        <p className="mb-5 text-gray-700">Please enter your name and email to get started:</p>

        <div className="mb-3">
          <label htmlFor="name" className="block text-sm font-medium text-[#3a2d7d] mb-1">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a2d7d]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-[#3a2d7d] mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a2d7d]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-[#3a2d7d] text-white py-3 rounded-xl hover:bg-[#2b2366] transition-all text-sm font-semibold"
          onClick={handleSubmit}
        >
          Enter Chat
        </button>
      </div>
    </div>
  );
}
