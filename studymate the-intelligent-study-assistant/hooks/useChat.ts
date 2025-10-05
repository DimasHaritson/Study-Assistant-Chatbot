
import { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat, Part } from '@google/genai';
import { ChatMessage, MessageAuthor, Reference } from '../types';
import { fileToGenerativePart } from '../utils/fileHelper';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const initializeChat = () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: `You are StudyMate, an intelligent study assistant. Your goal is to help users learn effectively.
            - Answer questions based on the context provided from uploaded files or web searches.
            - Provide clear, concise, and accurate explanations.
            - Format your responses using markdown for readability (e.g., lists, bold text).
            - Always cite your sources, whether from a file or the web.
            - Adapt your tone to be helpful and encouraging.`,
            tools: [{ googleSearch: {} }],
          },
        });
        setChat(newChat);
      } catch (error) {
        console.error("Failed to initialize Gemini AI:", error);
        // You might want to display an error to the user here
      }
    };
    initializeChat();
  }, []);

  const removeFile = () => {
    setFile(null);
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text && !file) return;
    if (!chat) {
        console.error("Chat not initialized");
        return;
    }

    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      author: MessageAuthor.USER,
      text,
      fileInfo: file ? { name: file.name, type: file.type } : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);

    const aiResponseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        author: MessageAuthor.AI,
        text: '',
        references: [],
    };

    setMessages((prev) => [...prev, aiResponseMessage]);

    try {
      let promptParts: (string | Part)[] = [text];

      if (file) {
          const filePart = await fileToGenerativePart(file);
          if(filePart) {
              promptParts = [
                  filePart,
                  `The user has uploaded a file named "${file.name}". Please analyze its content and answer the following question: ${text}`,
              ];
          } else {
              promptParts = [
                  `The user attempted to upload a file named "${file.name}" of type "${file.type}", but it could not be read. Please inform the user about this and answer their question based on your general knowledge: ${text}`
              ];
          }
      }
      
      // FIX: The `message` property should be assigned the array of parts directly.
      const stream = await chat.sendMessageStream({
          message: promptParts,
      });
      
      let fullText = '';
      let currentReferences: Reference[] = [];

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullText += chunkText;
        
        const groundingMetadata = chunk.candidates?.[0]?.groundingMetadata;
        if (groundingMetadata?.groundingChunks) {
            const newRefs = groundingMetadata.groundingChunks
              .map((c: any) => ({
                uri: c.web?.uri || '',
                title: c.web?.title || 'Untitled',
              }))
              .filter((r: Reference) => r.uri);
            currentReferences = [...new Map([...currentReferences, ...newRefs].map(item => [item.uri, item])).values()];
        }
        
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiResponseMessage.id
              ? { ...msg, text: fullText, references: currentReferences }
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiResponseMessage.id
            ? { ...msg, text: 'Sorry, I encountered an error. Please try again.' }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setFile(null);
    }
  }, [chat, file]);

  return { messages, sendMessage, isLoading, file, setFile, removeFile };
};
