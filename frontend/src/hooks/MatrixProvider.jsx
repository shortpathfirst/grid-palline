import React from 'react';
import { useState, createContext } from 'react';
import { Grid } from '../model/Grid';

const MatrixContext = createContext();
const MatrixDispatchContext = createContext();


const MatrixProvider = ({ children }) => {
  const [matrix, setMatrix] = useState(Grid.createNodes(50,18));

  return (
    <MatrixContext.Provider value={matrix}>
      <MatrixDispatchContext.Provider value={setMatrix}>
        {children}
      </MatrixDispatchContext.Provider>
    </MatrixContext.Provider>
  );
}



export {MatrixProvider,MatrixContext,MatrixDispatchContext};
