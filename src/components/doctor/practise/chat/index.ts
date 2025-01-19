// src/types/index.ts
export interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
    attachments?: Attachment[];
  }
  
  export interface Attachment {
    type: 'image' | 'document' | 'audio' | 'video';
    uri: string;
    name?: string;
    size?: number;
    duration?: number;
  }