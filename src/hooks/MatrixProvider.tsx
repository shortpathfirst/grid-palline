import React from 'react';
import { useState, createContext } from 'react';
import { Node } from '../model/Node';

const MatrixContext = createContext<Node[][]>([]);
const MatrixDispatchContext = createContext<Function>(undefined!);

const MatrixProvider = ({ children }:any) => {
  const [matrix, setMatrix] = useState([]);

  return (
    <MatrixContext.Provider value={matrix}>
      <MatrixDispatchContext.Provider value={setMatrix}>
        {children}
      </MatrixDispatchContext.Provider>
    </MatrixContext.Provider>
  );
}



export {MatrixProvider,MatrixContext,MatrixDispatchContext};
