export interface DBData {
  rooms: Room[];
  version: string;
}

interface Room {
  roomId: string;
  characters: string[];
  topics: Topic[];
}

interface Topic {
  topicId: string;
  messages: Message[];
  reply: ReplyMessage[] | Emoticon[];
}

interface Message {
  author: string;
  content?: string;
  emoticon?: string;
  image?: string;
}

interface ReplyMessage {
  type: "text" | "emoticon";
  emoticon?: string;
  content?: string;
}

type Emoticon = string;
