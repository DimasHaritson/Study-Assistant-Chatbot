
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Message from './Message';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
    </div>
);


const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
       <div className="max-w-4xl mx-auto">
        {messages.map((msg) => (
            <Message key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.author === 'user' && (
            <div className="flex justify-start">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-lg p-3 max-w-lg">
                    <TypingIndicator />
                </div>
            </div>
        )}
       </div>
    </div>
  );
};

export default ChatWindow;
