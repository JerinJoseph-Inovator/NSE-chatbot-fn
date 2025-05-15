import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Function to detect URLs and convert to clickable links
const renderMessageWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-words hover:text-blue-800"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const ChatWindow = ({ messages, isTyping, awaitingUserInput }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, awaitingUserInput]);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto px-2 sm:px-4 py-4 space-y-3 sm:space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-md text-sm leading-relaxed break-words whitespace-pre-wrap
                ${
                  msg.sender === 'user'
                    ? 'bg-[#3a2d7d] text-white rounded-tr-sm'
                    : 'bg-gradient-to-br from-[#efb31f] to-[#f9e8a4] text-black rounded-tl-sm'
                }`}
            >
              {msg.sender === 'bot' ? renderMessageWithLinks(msg.text) : msg.text}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-300 text-black px-4 py-2 rounded-2xl shadow w-fit animate-pulse text-sm">
              Typing...
            </div>
          </div>
        )}

        {awaitingUserInput && (
          <div className="flex justify-start">
            <div className="bg-yellow-100 text-yellow-900 px-4 py-2 rounded-2xl shadow w-fit text-sm">
              Waiting for your input...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
