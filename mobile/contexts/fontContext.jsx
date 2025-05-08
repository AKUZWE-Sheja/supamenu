// src/contexts/FontContext.js
import React, { createContext, useContext } from 'react';
import { useFonts, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontsLoaded] = useFonts({ PlayfairDisplay_600SemiBold });

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {fontsLoaded ? children : null /* or loading screen */}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);