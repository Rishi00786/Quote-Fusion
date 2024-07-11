"use client"
// context.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface StateContextType {
  data: any[]; // Existing state
  setData: React.Dispatch<React.SetStateAction<any[]>>; // Existing state updater
  quotes: any[]; // State for fetched quotes
  setQuotes: React.Dispatch<React.SetStateAction<any[]>>; // State updater for fetched quotes
  searchQuery: string; // State for search query
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // State updater for search query
  bgimage: string[]; // State for selected background image type (array of strings)
  setBgimage: React.Dispatch<React.SetStateAction<string[]>>; // State updater for selected background image type (array of strings)
}

// Create the context with an initial default value
const StateContext = createContext<StateContextType | undefined>(undefined);

// A custom hook to use the context
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

// Provider component to wrap the app
export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any[]>([]); // Existing state
  const [quotes, setQuotes] = useState<any[]>([]); // State for fetched quotes
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bgimage, setBgimage] = useState<string[]>([]); // Initialize bgimage as an array of strings

  return (
    <StateContext.Provider value={{ data, setData, quotes, setQuotes, searchQuery, setSearchQuery, bgimage, setBgimage }}>
      {children}
    </StateContext.Provider>
  );
};
