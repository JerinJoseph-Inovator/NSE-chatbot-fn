import Message from './Message';
import { useEffect, useRef } from 'react';

export default function ChatWindow({ messages, isTyping, awaitingUserInput }) {
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, isTyping]);

  const renderTypingIndicator = () => (
    <div className="flex items-center gap-2 text-sm text-[#3a2d7d] pl-2 animate-pulse">
      <div className="w-2 h-2 bg-[#3a2d7d] rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-[#e22128] rounded-full animate-bounce delay-150" />
      <div className="w-2 h-2 bg-[#efb31f] rounded-full animate-bounce delay-300" />
      <span>NSE Bot is typing...</span>
    </div>
  );

  const renderAwaitingInput = () => (
    <div className="flex items-center gap-2 text-sm text-[#3a2d7d] pl-2">
      <div className="w-2 h-2 bg-[#3a2d7d] rounded-full animate-pulse delay-500" />
      <div className="w-2 h-2 bg-[#e22128] rounded-full animate-pulse delay-700" />
      <div className="w-2 h-2 bg-[#efb31f] rounded-full animate-pulse delay-900" />
      <span>Awaiting your input...</span>
    </div>
  );

  return (
    <div
      ref={chatRef}
      className="flex flex-col gap-4 p-4 overflow-y-auto flex-1 bg-[#f4f6f9]"
    >
      {messages.map((msg, index) => (
        <Message
          key={index}
          sender={msg.sender}
          text={msg.text}
          timestamp={new Date().toLocaleTimeString()}
        />
      ))}

      {isTyping && renderTypingIndicator()}
      {awaitingUserInput && renderAwaitingInput()}
    </div>
  );
}
