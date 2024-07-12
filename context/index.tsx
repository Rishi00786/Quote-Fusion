"use client"
// context.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

interface StateContextType {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  bgimage: string[];
  setBgimage: React.Dispatch<React.SetStateAction<string[]>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bgimage, setBgimage] = useState<string[]>([]);

  return (
    <StateContext.Provider value={{ data, setData, quotes, setQuotes, searchQuery, setSearchQuery, bgimage, setBgimage }}>
      {children}
    </StateContext.Provider>
  );
};