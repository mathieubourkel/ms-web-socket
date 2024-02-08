export interface ServerToClientEvents {
    notif: (e: Message) => void;
  }
  
  export interface ClientToServerEvents {
    notif: (e: Message) => void;
  }

  export interface User {
    userId: string;
    userName: string;
  }
  
  export interface Message {
    user: User;
    timeSent: string;
    message: string;
  }