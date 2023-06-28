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
}

interface Message {
  author: string;
  content?: string;
  emoticon?: string;
  image?: string;
}
