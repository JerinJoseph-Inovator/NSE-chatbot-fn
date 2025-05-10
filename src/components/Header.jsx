export default function Header() {
  return (
    <header className="bg-[#3a2d7d] text-white p-4 text-xl font-semibold shadow flex items-center gap-2">
      <img src="/nse.png" alt="NSE Logo" className="h-8" />
      NSE Chatbot
      <span className="text-sm font-normal text-[#efb31f] ml-2">
        Powered by National Stock Exchange Intelligence
    </span>

    </header>
    
  );
}
