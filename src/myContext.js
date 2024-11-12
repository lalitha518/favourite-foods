// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [listOfRes, setListOfRes] = useState([]);
  const [originalList, setOriginalList] = useState([]);

  const value = {
    listOfRes,
    setListOfRes,
    originalList,
    setOriginalList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
