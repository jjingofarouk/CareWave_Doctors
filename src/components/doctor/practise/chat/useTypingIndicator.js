// src/hooks/useTypingIndicator.js
import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMessageWebSocket } from './useMessageWebSocket';

export const useTypingIndicator = (doctorId, websocket) => {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  const lastTypingUpdate = useRef(Date.now());
  const TYPING_TIMEOUT = 3000; // Stop showing typing indicator after 3 seconds of inactivity
  const THROTTLE_INTERVAL = 1000; // Only send typing updates once per second

  const startTyping = useCallback(() => {
    const now = Date.now();
    
    // Throttle typing updates
    if (now - lastTypingUpdate.current < THROTTLE_INTERVAL) {
      return;
    }

    lastTypingUpdate.current = now;

    // Send typing status to server
    try {
      websocket?.send(JSON.stringify({
        type: 'typing',
        doctorId,
        isTyping: true
      }));
    } catch (error) {
      console.error('Error sending typing indicator:', error);
    }

    // Clear existing timeout
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Set new timeout
    typingTimeout.current = setTimeout(() => {
      stopTyping();
    }, TYPING_TIMEOUT);
  }, [doctorId, websocket]);

  const stopTyping = useCallback(() => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    try {
      websocket?.send(JSON.stringify({
        type: 'typing',
        doctorId,
        isTyping: false
      }));
    } catch (error) {
      console.error('Error sending typing indicator:', error);
    }

    setIsTyping(false);
  }, [doctorId, websocket]);

  // Handle incoming typing indicators
  useEffect(() => {
    const handleTypingIndicator = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'typing' && data.doctorId === doctorId) {
          setIsTyping(data.isTyping);
        }
      } catch (error) {
        console.error('Error handling typing indicator:', error);
      }
    };

    websocket?.addEventListener('message', handleTypingIndicator);

    return () => {
      websocket?.removeEventListener('message', handleTypingIndicator);
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [doctorId, websocket]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  return {
    isTyping,
    startTyping,
    stopTyping
  };
};

// PropTypes validation for the hooks
useTypingIndicator.propTypes = {
  doctorId: PropTypes.string.isRequired,
  websocket: PropTypes.shape({
    send: PropTypes.func.isRequired,
    addEventListener: PropTypes.func.isRequired,
    removeEventListener: PropTypes.func.isRequired
  })
};

useMessageWebSocket.propTypes = {
  doctorId: PropTypes.string.isRequired
};