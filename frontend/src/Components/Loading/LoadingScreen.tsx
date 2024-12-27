import { useState, useEffect } from 'react';
import GridPalline from '../Grid/GridPalline';

import { MatrixProvider } from '../../hooks/MatrixProvider';
import { GridStateProvider } from '../../hooks/GridStateHook';
import { OperationsProvider } from '../../hooks/OperationsHook';
import Loading from './Loading';


function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <MatrixProvider>
        <GridStateProvider>
          <OperationsProvider>
            <GridPalline />
          </OperationsProvider>
        </GridStateProvider>
      </MatrixProvider>

    </div>
  );
}

export default LoadingScreen;