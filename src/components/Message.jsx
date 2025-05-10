import userAvatar from '../assets/avatars/user-avatar.png';
import botAvatar from '../assets/avatars/bot-avatar.png';

export default function Message({ sender, text, timestamp }) {
  const isUser = sender === 'user';
  const avatarSrc = isUser ? userAvatar : botAvatar;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-3`}>
      <div className="flex-shrink-0">
        <img src={avatarSrc} alt={`${sender} avatar`} className="w-8 h-8 rounded-full" />
      </div>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-sm whitespace-pre-line
          ${isUser
            ? 'bg-[#efb31f] text-white'
            : 'bg-[#f3f3f3] text-[#3a2d7d] border border-[#3a2d7d]'}`}
      >
        {text}
        <div className="text-xs text-gray-500 mt-1">{timestamp}</div>
      </div>
    </div>
  );
}
