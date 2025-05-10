import { useState } from 'react';

export default function MessageInput({ onSend, onNewsClick, onIntent }) {
  const [input, setInput] = useState('');

  const send = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 border-t bg-white">
      <div className="flex items-center gap-2">
        <input
          className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3a2d7d] transition-all"
          placeholder="Ask me about stocks..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button
          onClick={send}
          className="bg-[#3a2d7d] text-white px-4 py-2 rounded-full hover:bg-[#2d2364] transition-all"
        >
          Send
        </button>
        <button
          onClick={onNewsClick}
          className="bg-[#efb31f] text-white px-4 py-2 rounded-full hover:bg-[#d4a019] transition-all"
        >
          📰 NSE News
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {['fundamentals', 'chart', 'gainers', 'ipo'].map((type) => (
          <button
            key={type}
            onClick={() => onIntent(type)}
            className="bg-[#f3f3f3] text-[#3a2d7d] px-3 py-1 rounded-full text-sm hover:bg-[#e1e1e1] transition-all"
          >
            {type === 'fundamentals' && '📊 Get Fundamentals'}
            {type === 'chart' && '📉 View Chart'}
            {type === 'gainers' && '🔼 Top Gainers'}
            {type === 'ipo' && '🗓️ IPOs & Earnings'}
          </button>
        ))}
      </div>
    </div>
  );
}
