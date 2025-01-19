import React, { useState } from 'react';
import './Tabs.css';

export const Tabs = ({ children, className = '', defaultActiveTab = 0, ...props }) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);

    const handleTabClick = (index) => {
        setActiveTab(index); // Set active tab on click
    };

    return (
        <div className={`tabs ${className}`} {...props}>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    activeTab,
                    setActiveTab: handleTabClick,
                    index,
                })
            )}
        </div>
    );
};

export const TabsList = ({ children, className = '', activeTab, setActiveTab, ...props }) => {
    return (
        <div className={`tabs-list ${className}`} {...props}>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    active: activeTab === index,
                    onClick: () => setActiveTab(index),
                })
            )}
        </div>
    );
};

export const TabsTrigger = ({ children, className = '', active, ...props }) => {
    return (
        <button
            className={`tabs-trigger ${className} ${active ? 'active' : ''}`}
            {...props}
            aria-selected={active}
            role="tab"
            tabIndex={active ? 0 : -1}
        >
            {children}
        </button>
    );
};

export const TabsContent = ({ children, className = '', activeTab, index, ...props }) => {
    return activeTab === index ? (
        <div className={`tabs-content ${className}`} {...props}>
            {children}
        </div>
    ) : null;
};
