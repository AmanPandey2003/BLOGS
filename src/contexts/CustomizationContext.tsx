/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomizationConfig } from '../types';

interface CustomizationContextProps {
  config: CustomizationConfig;
  updateConfig: (newConfig: Partial<CustomizationConfig>) => void;
  resetConfig: () => void;
  saveConfig: () => void;
}

const defaultStyles: CustomizationConfig = {
  primaryColor: '#6366f1', // Indigo
  secondaryColor: '#10b981', // Emerald
  accentColor: '#f43f5e', // Rose
  backgroundColorLight: '#f8fafc', // Slate 50
  backgroundColorDark: '#09090b', // Zinc 950
  cardColorLight: '#ffffff', // White
  cardColorDark: '#18181b', // Zinc 900
  borderRadius: '12px',
  fontSans: 'Inter',
  logoText: 'StringToTech',
  tagline: 'Turning Complex Technology Into Simple Knowledge',
  heroTitle: "Learn Today's Tech. Build Tomorrow's Future. with StringToTech",
  heroDescription: 'From Equations to Intelligent Applications — Learn Mathematics, Master Computer Science, Build with Code, and Explore the Future of AI.',
  sidebarWidth: '300px',
  footerText: '© 2026 StringToTech. Turning Complex Technology Into Simple Knowledge.',
  socialLinks: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    discord: 'https://discord.gg',
    youtube: 'https://youtube.com',
    telegram: 'https://t.me'
  }
};

const CustomizationContext = createContext<CustomizationContextProps | undefined>(undefined);

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<CustomizationConfig>(defaultStyles);

  useEffect(() => {
    const saved = localStorage.getItem('stringtotech-customization');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse customization options.", err);
      }
    }
  }, []);

  const updateConfig = (newConfig: Partial<CustomizationConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem('stringtotech-customization', JSON.stringify(updated));
      return updated;
    });
  };

  const resetConfig = () => {
    setConfig(defaultStyles);
    localStorage.setItem('stringtotech-customization', JSON.stringify(defaultStyles));
  };

  const saveConfig = () => {
    // In a full DB context this synchronizes to persistent server database
    console.log("Branding options successfully stored in local environment.", config);
  };

  // Convert font selected to google fonts css rules and generic mappings
  const getFontFamilyCss = (font: string) => {
    switch (font) {
      case 'Space Grotesk': return "'Space Grotesk', sans-serif";
      case 'Playfair Display': return "'Playfair Display', serif";
      case 'JetBrains Mono': return "'JetBrains Mono', monospace";
      default: return "'Inter', sans-serif";
    }
  };

  return (
    <CustomizationContext.Provider value={{ config, updateConfig, resetConfig, saveConfig }}>
      {/* Inject google fonts dynamically to support selected fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Dynamic Style injection overriding tailwind variables */}
      <style>{`
        :root {
          --primary-color: ${config.primaryColor};
          --secondary-color: ${config.secondaryColor};
          --accent-color: ${config.accentColor};
          --bg-light: ${config.backgroundColorLight};
          --bg-dark: ${config.backgroundColorDark};
          --card-light: ${config.cardColorLight};
          --card-dark: ${config.cardColorDark};
          --border-radius: ${config.borderRadius};
          --font-custom: ${getFontFamilyCss(config.fontSans)};
          --sidebar-width: ${config.sidebarWidth};
        }
        
        .font-custom {
          font-family: var(--font-custom);
        }
      `}</style>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) throw new Error('useCustomization must be used within a CustomizationProvider');
  return context;
};
