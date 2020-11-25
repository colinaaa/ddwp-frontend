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
import { captureMessage } from 'sentry-miniapp';

class WebSocket {
  private static _instance: WebSocket | null = null;

  readyState: number;

  constructor(url: string, protocols?: string | string[]) {
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
      fail: ({ errMsg }) => captureMessage(`connectSocket: ${errMsg}`),
    });

    onSocketClose((data) => {
      this.readyState = WebSocket.CLOSED;

      if (this.onclose) {
        this.onclose(data);
      }
    });

    onSocketError((err) => {
      if (this.onerror) {
        this.onerror(err);
      }
    });

    onSocketMessage((message) => {
      if (this.onmessage) {
        this.onmessage(message);
      }
    });

    onSocketOpen((head) => {
      this.readyState = WebSocket.OPEN;

      if (this.onopen) {
        this.onopen(head);
      }
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
      fail: ({ errMsg }) => captureMessage(`sendSocketMessage: ${errMsg}`),
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
      fail: ({ errMsg }) => captureMessage(`closeSocket: ${errMsg}`),
    });
  }

  onclose: ((this: WebSocket, ev: any) => any) | null;
  onerror: ((this: WebSocket, ev: any) => any) | null;
  onmessage: ((this: WebSocket, ev: any) => any) | null;
  onopen: ((this: WebSocket, ev: any) => any) | null;

  static readonly CONNECTING = 0; // The connection is not yet open.
  static readonly OPEN = 1; // The connection is open and ready to communicate.
  static readonly CLOSING = 2; // The connection is in the process of closing.
  static readonly CLOSED = 3;
}

export default WebSocket;
