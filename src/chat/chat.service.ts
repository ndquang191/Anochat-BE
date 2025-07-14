// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';

interface WaitingUser {
  socketId: string;
  gender: string;
  category: string;
}

@Injectable()
export class ChatService {
  private queue: WaitingUser[] = [];

  addToQueue(user: WaitingUser): WaitingUser | null {
    // tìm người phù hợp trong hàng chờ
    const matchIndex = this.queue.findIndex(
      (u) => u.gender !== user.gender && u.category === user.category,
    );

    if (matchIndex !== -1) {
      const partner = this.queue.splice(matchIndex, 1)[0];
      return partner;
    }

    // nếu chưa có ai thì thêm user vào hàng chờ
    this.queue.push(user);
    return null;
  }

  removeFromQueue(socketId: string) {
    this.queue = this.queue.filter((u) => u.socketId !== socketId);
  }
}
