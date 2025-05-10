import { useState } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import botGif from './assets/Hello.gif'; // Adjust path if needed

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
      const response = await fetch('http://localhost:8000/chat', {
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
      console.error('📈 Error fetching gainers:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '⚠️ Failed to fetch top gainers. Please try again later.',
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
    if (text.toLowerCase().includes('stock price')) return `💹 ${text}`;
    if (text.toLowerCase().includes('news')) return `📰 ${text}`;
    return `📈 ${text}`;
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        {/* Bot image section */}
        <div className="w-1/5 bg-white flex items-center justify-center p-4">
          <img src={botGif} alt="Bot waving hello" className="max-w-full max-h-full object-contain" />
        </div>

        {/* Chat section */}
        <div className="w-4/5 flex flex-col bg-[#f4f6f9]">
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            awaitingUserInput={awaitingUserInput}
          />
          <MessageInput
            onSend={handleSend}
            onNewsClick={handleNewsClick}
            onIntent={handleIntent}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
