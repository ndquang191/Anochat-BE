import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private waitingQueue: {
    socketId: string;
    gender: string;
    category: string;
  }[] = [];

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
    this.waitingQueue = this.waitingQueue.filter(
      (u) => u.socketId !== socket.id,
    );
  }

  @SubscribeMessage('find_partner')
  async handleFindPartner(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { gender: string; category: string },
  ) {
    console.log(`Find partner request:`, data);
    const partner = this.waitingQueue.find((u) => u.category === data.category);

    if (partner) {
      const roomId = `${socket.id}-${partner.socketId}`;
      console.log('RoomId:', roomId);
      await socket.join(roomId);
      this.server.to(partner.socketId).socketsJoin(roomId);

      this.server.to(socket.id).emit('partner_found', { roomId });
      this.server.to(partner.socketId).emit('partner_found', { roomId });

      this.waitingQueue = this.waitingQueue.filter(
        (u) => u.socketId !== partner.socketId,
      );
    } else {
      this.waitingQueue.push({
        socketId: socket.id,
        ...data,
      });
    }
    console.log('Current waitingQueue:', this.waitingQueue);
  }

  @SubscribeMessage('send_message')
  handleSendMessage(
    @MessageBody()
    message: {
      roomId: string;
      content: string;
      user: { name: string };
      id: string;
      createdAt: string;
    },
  ) {
    this.server.to(message.roomId).emit('message', message);
  }
}
