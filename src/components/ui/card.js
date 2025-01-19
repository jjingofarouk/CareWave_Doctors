import React from 'react';
import './Card.css'; // Enhanced styling

const Card = ({ children, className = "", variant = "default", ...props }) => {
  return (
    <div className={`card card-${variant} ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h2 className={`card-title ${className}`}>{children}</h2>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`card-description ${className}`}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`card-content ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`card-footer ${className}`}>{children}</div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
