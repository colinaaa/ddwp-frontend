/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  closeSocket,
  connectSocket,
  onSocketClose,
  onSocketError,
  onSocketMessage,
  onSocketOpen,
  sendSocketMessage,
} from '@tarojs/taro';
import { EventEmitter } from 'events';

class WebSocket extends EventEmitter {
  private static _instance: WebSocket | null = null;

  readyState: number;

  constructor(url: string, protocols?: string | string[]) {
    super();

    if (WebSocket._instance !== null) {
      return WebSocket._instance;
    }

    this.readyState = WebSocket.CONNECTING;

    connectSocket({
      url,
      header: {
        'content-type': 'application/json',
      },
      protocols: typeof protocols === 'string' ? [protocols] : protocols,
    });

    onSocketClose(({ code, reason }) => {
      this.readyState = WebSocket.CLOSED;

      this.emit('close', code, reason);
      this.removeAllListeners();
    });

    onSocketError((err) => {
      this.emit('error', err);
    });

    onSocketMessage((message) => {
      this.emit('message', message);
    });

    onSocketOpen((head) => {
      this.readyState = WebSocket.OPEN;

      this.emit('open', head);
    });

    WebSocket._instance = this;
    return this;
  }

  send(data: string | ArrayBuffer) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    sendSocketMessage({
      data,
    });
  }

  close(code?: number, reason?: string): void {
    if (this.readyState === WebSocket.CLOSED) {
      return;
    }
    this.readyState = WebSocket.CLOSING;
    closeSocket({
      code,
      reason,
      complete: () => {
        this.readyState = WebSocket.CLOSED;
      },
    });
  }

  get onopen() {
    const listeners = this.listeners('open');

    for (let i = 0; i < listeners.length; i++) {
      const l = listeners[i];
      if (l) {
        return l;
      }
    }
  }

  set onopen(listener: any) {
    this.addListener('open', listener);
  }

  get onclose() {
    const listeners = this.listeners('close');

    for (let i = 0; i < listeners.length; i++) {
      const l = listeners[i];
      if (l) {
        return l;
      }
    }
    return undefined;
  }

  set onclose(listener: any) {
    this.addListener('close', listener);
  }

  get onmessage() {
    const listeners = this.listeners('message');

    for (let i = 0; i < listeners.length; i++) {
      const l = listeners[i];
      if (l) {
        return l;
      }
    }
    return undefined;
  }

  set onmessage(listener: any) {
    this.addListener('message', listener);
  }

  get onerror() {
    const listeners = this.listeners('error');

    for (let i = 0; i < listeners.length; i++) {
      const l = listeners[i];
      if (l) {
        return l;
      }
    }
    return undefined;
  }

  set onerror(listener: any) {
    this.addListener('error', listener);
  }

  // onclose: ((this: WebSocket, ev: any) => any) | null;
  // onerror: ((this: WebSocket, ev: any) => any) | null;
  // onmessage: ((this: WebSocket, ev: any) => any) | null;
  // onopen: ((this: WebSocket, ev: any) => any) | null;

  static readonly CONNECTING = 0; // The connection is not yet open.
  static readonly OPEN = 1; // The connection is open and ready to communicate.
  static readonly CLOSING = 2; // The connection is in the process of closing.
  static readonly CLOSED = 3;
}

export default WebSocket;
