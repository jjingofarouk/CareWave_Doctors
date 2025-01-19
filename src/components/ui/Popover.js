import React from 'react';

const Popover = ({ content, children }) => {
  return (
    <div className="popover">
      <div className="popover-content">{content}</div>
      <div className="popover-trigger">{children}</div>
    </div>
  );
};

export default Popover;
