
import React, { useState, useRef, ChangeEvent } from 'react';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
  onRemoveFile: () => void;
}

const PaperclipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading, file, onFileChange, onRemoveFile }) => {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((input.trim() || file) && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
          onFileChange(selectedFile);
      }
      // Reset file input value to allow re-uploading the same file
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
  }

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        {file && (
          <div className="mb-2 flex items-center justify-between bg-primary-100 dark:bg-primary-900/50 rounded-lg px-3 py-2 text-sm text-primary-800 dark:text-primary-200">
            <div className="flex items-center space-x-2 truncate">
              <PaperclipIcon />
              <span className="truncate">{file.name}</span>
            </div>
            <button onClick={onRemoveFile} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                <XIcon />
            </button>
          </div>
        )}
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-2">
          <button 
            onClick={handleFileClick}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
            aria-label="Attach file"
          >
            <PaperclipIcon />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            className="hidden" 
            accept="image/png, image/jpeg, image/webp, text/plain, .pdf, .docx, .pptx"
          />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask StudyMate anything..."
            className="flex-1 bg-transparent focus:outline-none resize-none p-2"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || (!input.trim() && !file)}
            className="p-3 rounded-full bg-primary-500 text-white disabled:bg-primary-300 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
            aria-label="Send message"
          >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <SendIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputBar;
