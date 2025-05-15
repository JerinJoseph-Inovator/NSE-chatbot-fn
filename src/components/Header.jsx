export default function Header() {
  return (
    <header className="bg-[#3a2d7d] text-white p-4 text-lg sm:text-xl font-semibold shadow flex flex-wrap items-center gap-2 sm:gap-4">
      <img src="/nse.png" alt="NSE Logo" className="h-8 w-8 object-contain" />
      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
        <span>NSE Chatbot</span>
        <span className="text-sm font-normal text-[#efb31f] sm:ml-2">
          Powered by National Stock Exchange Intelligence
        </span>
      </div>
    </header>
  );
}
