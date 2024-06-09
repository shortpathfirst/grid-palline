import React, { useState, useEffect } from 'react';
import GridPalline from '../Grid/GridPalline';
import Welcome from './Welcome';


function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <Welcome/>
  }

  return (
    <div>
      <GridPalline/>
    </div>
  );
}

export default MyComponent;