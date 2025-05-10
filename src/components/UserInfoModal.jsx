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
      <div className="bg-gradient-to-r from-white to-[#f4f6f9] p-6 rounded-2xl shadow-lg w-96 animate-fade-in">
        <h2 className="text-2xl font-bold mb-3 text-[#3a2d7d]">👋 Welcome!</h2>
        <p className="mb-4 text-gray-700">Please enter your name and email to get started:</p>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a2d7d]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a2d7d]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full bg-[#3a2d7d] text-white p-3 rounded hover:bg-[#2b2366] transition-all"
          onClick={handleSubmit}
        >
          Enter Chat
        </button>
      </div>
    </div>
  );
}
