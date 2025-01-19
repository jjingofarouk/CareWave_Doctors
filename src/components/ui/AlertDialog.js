// src/components/ui/AlertDialog.js
import React, { useEffect } from "react";
import "./AlertDialog.css";

export const AlertDialogContent = ({ children }) => (
  <div className="alert-dialog-content">{children}</div>
);

export const AlertDialogHeader = ({ children }) => (
  <div className="alert-dialog-header">{children}</div>
);

export const AlertDialogTitle = ({ children }) => (
  <h2 className="alert-dialog-title">{children}</h2>
);

export const AlertDialogDescription = ({ children }) => (
  <div className="alert-dialog-description">{children}</div>
);

export const AlertDialogFooter = ({ children }) => (
  <div className="alert-dialog-footer">{children}</div>
);

export const AlertDialogAction = ({ children, onClick, variant = "default" }) => (
  <button className={`alert-dialog-action alert-dialog-action-${variant}`} onClick={onClick}>
    {children}
  </button>
);

const AlertDialog = ({ isOpen, onClose, title, children, actions = [] }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // Clean up
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="alert-dialog-overlay" onClick={onClose} role="dialog" aria-labelledby="alert-title">
      <div
        className="alert-dialog-box"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        role="document"
      >
        <AlertDialogHeader>
          <AlertDialogTitle id="alert-title">{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{children}</AlertDialogDescription>
        <AlertDialogFooter>
          {actions.map((action, index) => (
            <AlertDialogAction
              key={index}
              onClick={action.onClick}
              variant={action.variant || "default"}
            >
              {action.label}
            </AlertDialogAction>
          ))}
        </AlertDialogFooter>
      </div>
    </div>
  );
};

export default AlertDialog;
