
import React from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, sendMessage, isLoading, file, setFile, removeFile } = useChat();

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header />
      <ChatWindow messages={messages} isLoading={isLoading} />
      <InputBar 
        onSendMessage={sendMessage} 
        isLoading={isLoading} 
        file={file}
        onFileChange={(f) => setFile(f)}
        onRemoveFile={removeFile}
      />
    </div>
  );
}

export default App;
