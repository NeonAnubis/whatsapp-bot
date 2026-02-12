import { Check, CheckCheck } from 'lucide-react';
import type { Message } from '../types';
import { formatMessageTime } from '../utils/helpers';

interface MessageBubbleProps {
  message: Message;
  onButtonClick?: (value: string, label: string) => void;
}

const MessageBubble = ({ message, onButtonClick }: MessageBubbleProps) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';
  const isAgent = message.sender === 'agent';

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-whatsapp-hover/50 text-gray-300 px-4 py-2 rounded-lg text-sm max-w-md text-center">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-bubble`}>
      <div
        className={`max-w-[70%] rounded-lg px-3 py-2 ${
          isUser
            ? 'bg-whatsapp-msg-sent text-white'
            : 'bg-whatsapp-msg-received text-white'
        }`}
      >
        {/* Agent badge */}
        {isAgent && (
          <div className="flex items-center gap-2 mb-1 pb-1 border-b border-whatsapp-hover">
            <div className="w-6 h-6 bg-whatsapp-green rounded-full flex items-center justify-center text-xs">
              👤
            </div>
            <span className="text-xs text-whatsapp-green-light font-medium">Agente</span>
          </div>
        )}

        {/* Image Message */}
        {message.type === 'image' && message.imageUrl && (
          <div className="mb-2">
            <img
              src={message.imageUrl}
              alt="Uploaded"
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="whitespace-pre-wrap break-words text-sm leading-5">
          {message.content}
        </div>

        {/* Buttons */}
        {message.type === 'button' && message.buttons && (
          <div className="mt-3 space-y-2">
            {message.buttons.map((button) => (
              <button
                key={button.id}
                onClick={() => onButtonClick?.(button.value, button.label)}
                className="w-full bg-whatsapp-hover hover:bg-whatsapp-hover/70 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left"
              >
                {button.label}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp and Read Status */}
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[10px] text-gray-400">
            {formatMessageTime(message.timestamp)}
          </span>
          {isUser && (
            <span className="text-whatsapp-blue">
              {message.read ? (
                <CheckCheck className="w-3 h-3" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
