export interface ServerToClientEvents {
    notif: (e: string) => void;
  }
  
  export interface ClientToServerEvents {
    notif: (e: string) => void;
  }

export interface Message {
  message: string,
  users: string | string[]
}

export interface MessageForMany {
  message:string,
  users: Users
}

export type Users = string[]