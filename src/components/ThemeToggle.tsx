import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="theme-toggle">
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
        </button>
    );
};

export default ThemeToggle;