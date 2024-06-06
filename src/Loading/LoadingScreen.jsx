import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import GridPalline from '../Visualizer/GridPalline';


function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <GridPalline/>
    </div>
  );
}

export default MyComponent;