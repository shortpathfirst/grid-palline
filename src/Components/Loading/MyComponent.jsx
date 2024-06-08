import React, { Suspense } from 'react';
    
const OtherComponent = React.lazy(() => import('./MyComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}

export default MyComponent;