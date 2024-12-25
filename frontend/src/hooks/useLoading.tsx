import { useState, createContext, useContext, ReactNode } from 'react';

const LoadingContext = createContext<{
  isLoading:boolean;
  showLoading: ()=>void;
  hideLoading: ()=>void;
}>({
  isLoading: false,
  showLoading: () => { },
  hideLoading: () => { }
});

export const LoadingProvider = ({ children }:{children:ReactNode}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);