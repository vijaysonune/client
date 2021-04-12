export interface Message {
    id: number;
    senderUsername: string;
    senderId: number;
    senderPhotoUrl: string;
    recepientUsername: string;
    recepientId: number;
    recepientPhotoUrl: string;
    content: string;
    messageSent: Date;
    dateRead?: Date;
  }