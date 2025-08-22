import React, { createContext, useContext, useState, useEffect } from "react";
import { loadStars, saveStars, removeStars } from "../functions/storage/Stars";

const StarsContext = createContext();

export const StarsProvider = ({ children }) => {
  const [stars, setStarsState] = useState(0);

  // Načtení stars při startu aplikace
  useEffect(() => {
    const fetchStars = async () => {
      const value = await loadStars(); // loadStars vrací číslo
      setStarsState(value);
    };
    fetchStars();
  }, []);

  /**
   * Bezpečný setter pro stars
   * - Podporuje i callback (prev => newValue)
   * - Aktualizuje state
   * - Uloží do AsyncStorage
   */
  const setStars = (valueOrCallback) => {
    setStarsState(prev => {
      const newValue =
        typeof valueOrCallback === "function" ? valueOrCallback(prev) : valueOrCallback;
      if (typeof newValue !== "number") return prev; // pokud není číslo, ignoruj
      saveStars(newValue); // uložení do AsyncStorage
      return newValue;
    });
  };

  /**
   * Reset stars na 0
   */
  const resetStars = async () => {
    setStarsState(0);
    await removeStars(); // smaže hodnotu v AsyncStorage
  };

  return (
    <StarsContext.Provider value={{ stars, setStars, resetStars }}>
      {children}
    </StarsContext.Provider>
  );
};

// Hook pro pohodlný přístup k contextu
export const useStars = () => useContext(StarsContext);
