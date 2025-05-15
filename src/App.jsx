import { useState } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import UserInfoModal from './components/UserInfoModal';
import botGif from './assets/Hello.gif';

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '📢 Welcome to the NSE Chatbot! Ask me about stock prices, market news, or company updates.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [awaitingUserInput, setAwaitingUserInput] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
    setMessages((prev) => [
      ...prev,
      {
        sender: 'bot',
        text: `👋 Hello ${info.name}, how can I assist you with the markets today?`,
      },
    ]);
  };

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setAwaitingUserInput(false);

    if (pendingAction) {
      const command = generateCommandFromIntent(pendingAction, text);
      setPendingAction(null);
      await processBotCommand(command);
    } else {
      await processBotCommand(text);
    }
  };

  const processBotCommand = async (text) => {
    setIsTyping(true);
    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const raw = await response.text();
      console.log('Raw response:', raw);

      const data = JSON.parse(raw);
      const reply = formatNSEReply(data.reply);
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error('📈 Error fetching data:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '⚠️ Failed to process your request. Please try again later.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleIntent = (type) => {
    if (['fundamentals', 'chart'].includes(type)) {
      setPendingAction(type);
      setAwaitingUserInput(true);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `📝 Please enter the company name or stock symbol to fetch the ${type}.`,
        },
      ]);
    } else if (type === 'gainers') {
      handleSend('show top gainers');
    } else if (type === 'ipo') {
      handleSend('show upcoming IPOs and earnings');
    }
  };

  const handleNewsClick = () => {
    handleSend('show me latest NSE news');
  };

  const generateCommandFromIntent = (intent, company) => {
    switch (intent) {
      case 'fundamentals':
        return `show fundamentals of ${company}`;
      case 'chart':
        return `show chart of ${company}`;
      default:
        return company;
    }
  };

  const formatNSEReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('stock price')) return `💹 ${text}`;
    if (lower.includes('news')) return `📰 ${text}`;
    if (lower.includes('ipo') || lower.includes('earnings'))
      return `📅 ${text}`;
    return `📈 ${text}`;
  };

  return (
    <>
      {!userInfo && <UserInfoModal onSubmit={handleUserInfoSubmit} />}

      <div className="flex flex-col h-screen font-sans">
        <Header />
        <div className="flex flex-1 bg-gradient-to-br from-white to-[#f4f6f9]">
          {/* Bot image section */}
          <div className="w-1/5 flex items-center justify-center p-4 bg-white shadow-inner">
            <img
              src={botGif}
              alt="Bot waving hello"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-lg"
            />
          </div>

          {/* Chat section */}
          <div className="w-4/5 flex flex-col p-4 bg-white rounded-l-2xl shadow-xl">
            <div className="flex-1 overflow-auto rounded-2xl bg-gradient-to-r from-white to-[#f4f6f9] p-4 shadow-inner">
              <ChatWindow
                messages={messages}
                isTyping={isTyping}
                awaitingUserInput={awaitingUserInput}
              />
            </div>
            <MessageInput
              onSend={handleSend}
              onNewsClick={handleNewsClick}
              onIntent={handleIntent}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
