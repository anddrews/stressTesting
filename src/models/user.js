import openSocket from 'socket.io-client';

import {bearerToken, socketUri} from '../constants';


export class User {
  constructor() {
    this.clientId = `${Math.random().toString(36).substr(2, 16)
    + Math.random().toString(36).substr(2, 16)}`;
    this.clientName = `Пользователь: ${Math.random().toString(36).substr(2, 16)}`;
    this.url = `http://${this.clientName}-${this.clientId}`;
    const socketOption = {
      reconnection: true,
      reconnectionAttempts: null,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
      autoConnect: true,
      transports: ['websocket'],
      rejectUnauthorized: true,
      query: {
        token: bearerToken,
        client_id: this.clientId,
        type: 'widget',
        abon_code: 2524333,
        user: this.clientName
      }
    };
    this.socket = openSocket(socketUri, socketOption);
  }
  
  sendViewPage() {
    const params = {
      uri: this.url,
      params: "",
      title: `Page title ${this.clientName}`,
      clientName: this.clientName,
    };
    this.socket.emit('widget:viewpage', params);
    console.log(`emitted viewPage:${this.clientName}`)
  }
  
  startOnFocus(delay = 1000) {
    const params = {
      uri: this.url,
      params: "",
      title: `Page title ${this.clientName}`,
    };
    
    let onFocus = true;
    this.onFocusInterval = setInterval(() => {
      this.socket.emit('widget:onFocus', {...params, focus: onFocus});
      console.log(`emitted onFocus:${onFocus}`);
      onFocus = !onFocus;
      
    }, delay);
  }
  
  stopOnFocus() {
    clearInterval(this.onFocusInterval);
  }
  
  closeSocket() {
    this.socket.close();
  }
}
