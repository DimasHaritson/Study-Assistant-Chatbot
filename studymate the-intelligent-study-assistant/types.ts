
export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface Reference {
  uri: string;
  title: string;
}

export interface ChatMessage {
  id: string;
  author: MessageAuthor;
  text: string;
  references?: Reference[];
  fileInfo?: {
      name: string;
      type: string;
  };
}
