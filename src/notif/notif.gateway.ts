import {ConnectedSocket, MessageBody,SubscribeMessage,WebSocketGateway,WebSocketServer, WsException,} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import {ServerToClientEvents,ClientToServerEvents,Message, MessageForMany,} from './notif.interface';
import { Server } from 'socket.io';
import * as jwt from 'jsonwebtoken'

@WebSocketGateway({path: '/websocket', cors: {origin: '*'}})

export class NotifGateway {
  
  @WebSocketServer() server: Server = new Server<ServerToClientEvents, ClientToServerEvents>();
  
  private logger = new Logger('NotifGateway');

  async handleConnection(@ConnectedSocket() client: any) {
    try {
      const token = client.handshake.auth.token
      if (!token) throw new WsException("NO TOKEN")
      const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      client.handshake.user = payload
      client.join(`${payload.userId}`)
      return "OK"
    } catch (error) {
      client.disconnect(true)
    }
  }

  @SubscribeMessage('notifFromClient')
  handleNotif(@MessageBody() payload:Message): void {
    console.log(payload)
    this.logger.log(payload);
    this.server.to(payload.users).emit('notifToClient', payload.message)
  }

}