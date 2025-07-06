import React, { createContext, useContext, useState } from 'react';

interface LoadingContextType {
  isGooeyTextReady: boolean;
  setIsGooeyTextReady: (ready: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoadingContext must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isGooeyTextReady, setIsGooeyTextReady] = useState(false);

  return (
    <LoadingContext.Provider value={{ isGooeyTextReady, setIsGooeyTextReady }}>
      {children}
    </LoadingContext.Provider>
  );
};