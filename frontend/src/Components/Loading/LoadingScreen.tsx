import { useState, useEffect, ReactNode } from 'react';
import Loading from './Loading';


function LoadingScreen({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {isLoading ? <Loading /> :
        <>
          {children}
        </>
      }
    </>

  );
}

export default LoadingScreen;