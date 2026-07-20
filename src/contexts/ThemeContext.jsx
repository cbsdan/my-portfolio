import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'midnight-cosmos', name: 'Midnight Cosmos', emoji: '🌌', description: 'Deep navy & electric blue' },
  { id: 'aurora-borealis', name: 'Aurora Borealis', emoji: '🌌', description: 'Northern lights green & teal' },
  { id: 'sunset-horizon', name: 'Sunset Horizon', emoji: '🌅', description: 'Warm coral & golden' },
  { id: 'ocean-depths', name: 'Ocean Depths', emoji: '🌊', description: 'Deep sea blues & aqua' },
];

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themes.find(t => t.id === savedTheme)) {
      return savedTheme;
    }
    return 'aurora-borealis';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
