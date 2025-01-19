import React from 'react';

const ScrollArea = ({ children }) => {
  return <div style={{ overflowY: 'auto', maxHeight: '400px' }}>{children}</div>;
};

export default ScrollArea;
