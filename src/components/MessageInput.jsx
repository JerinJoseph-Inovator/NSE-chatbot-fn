import React, { useState } from 'react';
import { SendHorizonal, Newspaper, BarChart, Info, TrendingUp, LineChart } from 'lucide-react';

const MessageInput = ({ onSend, onNewsClick, onIntent }) => {
  const [input, setInput] = useState('');

  const handleSendClick = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendClick();
  };

  return (
    <div className="p-4 border-t bg-gradient-to-r from-white to-[#f4f6f9] shadow-md">
      {/* Intent buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={onNewsClick}
          className="flex items-center gap-1 px-3 py-1 bg-[#3a2d7d] text-white rounded-xl shadow hover:opacity-90 transition text-sm"
        >
          <Newspaper size={16} />
          NSE News
        </button>

        <button
          onClick={() => onIntent('fundamentals')}
          className="flex items-center gap-1 px-3 py-1 bg-[#efb31f] text-black rounded-xl shadow hover:opacity-90 transition text-sm"
        >
          <Info size={16} />
          Fundamentals
        </button>

        <button
          onClick={() => onIntent('chart')}
          className="flex items-center gap-1 px-3 py-1 bg-[#f26c23] text-white rounded-xl shadow hover:opacity-90 transition text-sm"
        >
          <LineChart size={16} />
          Chart
        </button>

        <button
          onClick={() => onIntent('gainers')}
          className="flex items-center gap-1 px-3 py-1 bg-[#3a2d7d] text-white rounded-xl shadow hover:opacity-90 transition text-sm"
        >
          <TrendingUp size={16} />
          Top Gainers
        </button>

        <button
          onClick={() => onIntent('ipo')}
          className="flex items-center gap-1 px-3 py-1 bg-[#efb31f] text-black rounded-xl shadow hover:opacity-90 transition text-sm"
        >
          <BarChart size={16} />
          IPOs & Earnings
        </button>
      </div>

      {/* Input and send */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#3a2d7d] text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSendClick}
          className="p-3 rounded-full bg-gradient-to-br from-[#3a2d7d] to-[#5a4d9c] text-white shadow-lg hover:scale-105 transition"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
