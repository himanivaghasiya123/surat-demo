import React, { createContext, useState, useContext } from 'react';

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);

  const showLoader = () => setLoader(true);

  const hideLoader = () => setLoader(false);

  return (
    <LoaderContext.Provider value={{ loader, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};