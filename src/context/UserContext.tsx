import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  favorites: string[];
  solved: string[];
  toggleFavorite: (id: string) => void;
  toggleSolved: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isSolved: (id: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [solved, setSolved] = useState<string[]>([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem('coding-platform-favorites');
    const storedSolved = localStorage.getItem('coding-platform-solved');
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    if (storedSolved) setSolved(JSON.parse(storedSolved));
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id];
      localStorage.setItem('coding-platform-favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const toggleSolved = (id: string) => {
    setSolved(prev => {
      const newSolved = prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id];
      localStorage.setItem('coding-platform-solved', JSON.stringify(newSolved));
      return newSolved;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);
  const isSolved = (id: string) => solved.includes(id);

  return (
    <UserContext.Provider value={{ favorites, solved, toggleFavorite, toggleSolved, isFavorite, isSolved }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
