import React, { createContext, useState, useEffect } from "react";

// Create the context
export const BoardContext = createContext();

// Create a provider component
export const BoardProvider = ({ children }) => {
  const storedGrouping = localStorage.getItem("grouping") || "priority";
  const storedSortOption = localStorage.getItem("sortOption") || "title";
  const [grouping, setGrouping] = useState(storedGrouping);
  const [sortOption, setSortOption] = useState(storedSortOption);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("sortOption", sortOption);
  }, [sortOption]);
  return (
    <BoardContext.Provider
      value={{ grouping, setGrouping, sortOption, setSortOption }}
    >
      {children}
    </BoardContext.Provider>
  );
};
