import { useState, useEffect, useRef, useCallback } from 'react';

// Constants for WebSocket states and configuration
const WEBSOCKET_STATES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
};

const WEBSOCKET_CONFIG = {
  RECONNECT_DELAY: 2000,
  MAX_RECONNECT_ATTEMPTS: 5,
  PING_INTERVAL: 30000,
  PONG_TIMEOUT: 5000
};

export const useMessageWebSocket = (doctorId, onError) => {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const reconnectAttempts = useRef(0);
  const pingTimeout = useRef(null);
  const reconnectTimeout = useRef(null);

  // Clean up timeouts
  const clearTimeouts = () => {
    if (pingTimeout.current) clearTimeout(pingTimeout.current);
    if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
  };

  // Setup ping/pong heartbeat
  const heartbeat = useCallback(() => {
    clearTimeout(pingTimeout.current);
    pingTimeout.current = setTimeout(() => {
      if (ws.current?.readyState === WEBSOCKET_STATES.OPEN) {
        console.log('No pong received, closing connection');
        ws.current.close();
      }
    }, WEBSOCKET_CONFIG.PONG_TIMEOUT);
  }, []);

  // Connect WebSocket
  const connect = useCallback(() => {
    try {
      // Ensure we have a doctor ID
      if (!doctorId) {
        throw new Error('Doctor ID is required for WebSocket connection');
      }

      // Close existing connection if any
      if (ws.current) {
        ws.current.close();
      }

      // Create new WebSocket connection with proper URL format and parameters
      const protocol = __DEV__ ? 'ws' : 'wss';
      const host = __DEV__ ? 'localhost:3000' : 'api.yourdomain.com';
      const url = `${protocol}://${host}/chat?doctorId=${doctorId}&client=mobile`;

      ws.current = new WebSocket(url);

      // Connection opened
      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        reconnectAttempts.current = 0;
        heartbeat();

        // Send initial authentication message
        ws.current.send(JSON.stringify({
          type: 'auth',
          doctorId: doctorId,
          timestamp: new Date().toISOString()
        }));
      };

      // Connection closed
      ws.current.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        setIsConnected(false);
        clearTimeouts();

        // Attempt reconnection if not manually closed
        if (reconnectAttempts.current < WEBSOCKET_CONFIG.MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeout.current = setTimeout(() => {
            reconnectAttempts.current += 1;
            connect();
          }, WEBSOCKET_CONFIG.RECONNECT_DELAY);
        } else {
          onError(new Error('Maximum reconnection attempts reached'));
        }
      };

      // Handle errors
      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        onError(error);
      };

      // Handle messages
      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Handle different message types
          switch (data.type) {
            case 'pong':
              heartbeat();
              break;
            case 'message':
              // Handle chat message
              break;
            case 'typing':
              // Handle typing indicator
              break;
            case 'error':
              onError(new Error(data.message));
              break;
            default:
              console.log('Unhandled message type:', data.type);
          }
        } catch (err) {
          console.error('Error parsing message:', err);
        }
      };
    } catch (error) {
      console.error('Error setting up WebSocket:', error);
      onError(error);
    }
  }, [doctorId, onError, heartbeat]);

  // Send message
  const sendMessage = useCallback((message) => {
    return new Promise((resolve, reject) => {
      try {
        if (!ws.current || ws.current.readyState !== WEBSOCKET_STATES.OPEN) {
          throw new Error('WebSocket is not connected');
        }

        ws.current.send(JSON.stringify({
          type: 'message',
          content: message,
          timestamp: new Date().toISOString()
        }));

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  // Mark message as read
  const markMessageAsRead = useCallback((messageId) => {
    if (ws.current?.readyState === WEBSOCKET_STATES.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'read',
        messageId,
        timestamp: new Date().toISOString()
      }));
    }
  }, []);

  // Setup connection
  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      clearTimeouts();
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  // Setup ping interval
  useEffect(() => {
    if (!isConnected) return;

    const pingInterval = setInterval(() => {
      if (ws.current?.readyState === WEBSOCKET_STATES.OPEN) {
        ws.current.send(JSON.stringify({ type: 'ping' }));
      }
    }, WEBSOCKET_CONFIG.PING_INTERVAL);

    return () => clearInterval(pingInterval);
  }, [isConnected]);

  return {
    isConnected,
    sendMessage,
    markMessageAsRead,
    reconnectWebSocket: connect
  };
};