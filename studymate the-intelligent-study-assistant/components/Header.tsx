
import React from 'react';

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary-500">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 .976.997 3.5 3.5 0 0 1 3.496 4.311 3.5 3.5 0 0 1-2.028 2.518c-1.1.58-1.44 1.86-1.44 2.975V20a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2.5c0-1.115-.34-2.395-1.44-2.975A3.5 3.5 0 0 1 3.028 10.5c.13-.77.53-1.463 1.135-1.99a3.5 3.5 0 0 1 4.34-1.228 1 1 0 0 0 .976-.997V4.5A2.5 2.5 0 0 1 9.5 2z"></path>
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 p-4 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center space-x-3">
        <BrainIcon />
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">StudyMate</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Your Intelligent Study Assistant</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
