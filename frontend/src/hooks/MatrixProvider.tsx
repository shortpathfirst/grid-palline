import { useState, createContext, ReactNode, useContext } from 'react';
import { Grid } from '../model/Grid';
import { Node } from '../model/Node';

const MatrixContext = createContext<{
  matrix: Node[][];
  setMatrix: React.Dispatch<React.SetStateAction<Node[][]>>
}>({
  matrix: [],
  setMatrix: () => { }
});

const MatrixProvider = ({ children }: { children: ReactNode }) => {
  const [matrix, setMatrix] = useState(Grid.createNodes(50, 18));

  return (
    <MatrixContext.Provider value={{ matrix, setMatrix }}>
      {children}
    </MatrixContext.Provider>
  );
}

const useMatrixContext = () => useContext(MatrixContext);

export { MatrixProvider, useMatrixContext };
