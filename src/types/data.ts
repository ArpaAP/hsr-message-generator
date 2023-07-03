export interface DBData {
  rooms: Room[];
  version: string;
}

export interface Room {
  roomId: string;
  roomName: string;
  characters: string[];
  topics: Topic[];
}

export interface Topic {
  topicId: string;
  topicName: string;
  messages: Message[];
  reply: ReplyMessage[] | Emoticon[];
}

export interface Message {
  messageId: string;
  author: string;
  content?: string;
  emoticon?: string;
  image?: string;
}

export interface ReplyMessage {
  type: "text" | "emoticon";
  emoticon?: string;
  content?: string;
}

export type Emoticon = string;
