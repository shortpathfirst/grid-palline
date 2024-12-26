import React, { useState, useEffect } from 'react';
import GridPalline from '../Grid/GridPalline';
import Welcome from './Welcome';
import { MatrixProvider } from '../../hooks/MatrixProvider';
import { GridStateProvider } from '../../hooks/GridStateHook';
import { OperationsProvider } from '../../hooks/OperationsHook';


function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <Welcome />
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