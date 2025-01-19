import React from 'react';
import './LoadingSpinner.css'; // Import the enhanced styles

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
