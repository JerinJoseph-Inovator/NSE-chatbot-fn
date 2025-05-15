import userAvatar from '../assets/avatars/user-avatar.png';
import botAvatar from '../assets/avatars/bot-avatar.png';

export default function Message({ sender, text, timestamp }) {
  const isUser = sender === 'user';
  const avatarSrc = isUser ? userAvatar : botAvatar;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-2 sm:gap-3`}>
      {!isUser && (
        <img src={avatarSrc} alt="Bot avatar" className="w-8 h-8 rounded-full" />
      )}
      <div
        className={`max-w-[85%] sm:max-w-md px-4 py-2 rounded-2xl shadow-md text-sm break-words whitespace-pre-line
          ${isUser
            ? 'bg-[#efb31f] text-white rounded-tr-sm'
            : 'bg-[#f3f3f3] text-[#3a2d7d] border border-[#3a2d7d] rounded-tl-sm'}`}
      >
        {text}
        <div className="text-xs text-gray-500 mt-1 text-right">{timestamp}</div>
      </div>
      {isUser && (
        <img src={avatarSrc} alt="User avatar" className="w-8 h-8 rounded-full" />
      )}
    </div>
  );
}
