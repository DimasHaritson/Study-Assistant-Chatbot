
import React from 'react';
import { Reference } from '../types';

interface ReferenceCardProps {
  reference: Reference;
}

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-slate-500">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
);


const ReferenceCard: React.FC<ReferenceCardProps> = ({ reference }) => {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch (e) {
      return 'invalid url';
    }
  };

  return (
    <a
      href={reference.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
    >
      <div className="flex items-start space-x-2">
        <LinkIcon />
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{reference.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{getDomain(reference.uri)}</p>
        </div>
      </div>
    </a>
  );
};

export default ReferenceCard;
