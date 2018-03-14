import WebSocket from 'simple-websocket';

import ConnectionBase from './base';


export default class Client extends ConnectionBase {
  close = async () => {
    if (this.ws) {
      this.ws.destroy();
    }
  };

  connect = async (port, host = 'ws://localhost') => (new Promise((resolve, revoke) => {
    this.port = port;
    const ws = this.attachWebSocket(new WebSocket(`${host}:${port}/`));
    let connected = false;
    ws.once('connect', () => {
      this.emit('connection');
      connected = true;
      resolve();
    });
    ws.once('error', (error) => {
      if (!connected) {
        revoke(error);
      }
    });
  }));
}
