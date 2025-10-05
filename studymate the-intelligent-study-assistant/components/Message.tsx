
import React from 'react';
import { ChatMessage, MessageAuthor, Reference } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import ReferenceCard from './ReferenceCard';

interface MessageProps {
  message: ChatMessage;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-semibold">
        U
    </div>
);

const AIIcon = () => (
    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 .976.997 3.5 3.5 0 0 1 3.496 4.311 3.5 3.5 0 0 1-2.028 2.518c-1.1.58-1.44 1.86-1.44 2.975V20a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2.5c0-1.115-.34-2.395-1.44-2.975A3.5 3.5 0 0 1 3.028 10.5c.13-.77.53-1.463 1.135-1.99a3.5 3.5 0 0 1 4.34-1.228 1 1 0 0 0 .976-.997V4.5A2.5 2.5 0 0 1 9.5 2z"></path>
        </svg>
    </div>
);

const FileChip: React.FC<{ fileInfo: { name: string; type: string } }> = ({ fileInfo }) => (
    <div className="flex items-center space-x-2 bg-slate-200 dark:bg-slate-700 rounded-full px-3 py-1 text-sm mb-2 max-w-xs">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 dark:text-slate-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        <span className="truncate">{fileInfo.name}</span>
    </div>
);


const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;

  return (
    <div className={`flex items-start gap-4 mb-6 animate-fade-in-up ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <AIIcon />}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl p-4 max-w-2xl prose prose-sm dark:prose-invert prose-p:my-2 prose-li:my-1 prose-headings:my-2
            ${isUser ? 'bg-primary-500 text-white rounded-br-lg' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-lg shadow-sm'}`}>
          {message.fileInfo && <FileChip fileInfo={message.fileInfo} />}
          {message.text ? <MarkdownRenderer content={message.text} /> : (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
              </div>
          )}
        </div>
        {message.references && message.references.length > 0 && (
          <div className="mt-4 w-full">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">REFERENCES</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {message.references.map((ref, index) => (
                <ReferenceCard key={index} reference={ref} />
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && <UserIcon />}
    </div>
  );
};

export default Message;
