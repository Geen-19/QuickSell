import React, { createContext, useState } from 'react';

// Create the context
export const BoardContext = createContext();

// Create a provider component
export const BoardProvider = ({ children }) => {
  const [grouping, setGrouping] = useState("priority");
  const [sortOption, setSortOption] = useState("title");

  return (
    <BoardContext.Provider value={{ grouping, setGrouping, sortOption, setSortOption }}>
      {children}
    </BoardContext.Provider>
  );
};
