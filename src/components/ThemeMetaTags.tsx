"use client";

import { useTheme } from '@/context/ThemeContext';
import { useEffect } from 'react';

export default function ThemeMetaTags() {
  const { theme, isLoading } = useTheme();

  useEffect(() => {
    if (isLoading) return;

    // Update theme-color meta tag for Safari iOS status bar
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColorMeta);
    }

    // Also update apple-mobile-web-app-status-bar-style for iOS
    let appleStatusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    
    if (!appleStatusBarMeta) {
      appleStatusBarMeta = document.createElement('meta');
      appleStatusBarMeta.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
      document.head.appendChild(appleStatusBarMeta);
    }

    // Set colors based on theme
    if (theme === 'dark') {
      // Dark theme colors from your CSS variables
      themeColorMeta.setAttribute('content', '#1a1a1a'); // --bg-primary-fallback for dark
      appleStatusBarMeta.setAttribute('content', 'black-translucent');
    } else {
      // Light theme colors from your CSS variables  
      themeColorMeta.setAttribute('content', '#f7f8fa'); // --bg-primary-fallback for light
      appleStatusBarMeta.setAttribute('content', 'default');
    }

    // Also update msapplication-navbutton-color for Windows Phone (legacy but good practice)
    let msNavButtonMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
    
    if (!msNavButtonMeta) {
      msNavButtonMeta = document.createElement('meta');
      msNavButtonMeta.setAttribute('name', 'msapplication-navbutton-color');
      document.head.appendChild(msNavButtonMeta);
    }

    msNavButtonMeta.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#f7f8fa');

  }, [theme, isLoading]);

  return null; // This component doesn't render anything
} 