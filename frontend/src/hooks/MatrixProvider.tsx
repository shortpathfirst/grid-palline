import { useState, createContext, ReactNode, useContext } from 'react';
import { Grid } from '../model/Grid';
import { GridNode } from '../model/GridNode';

const MatrixContext = createContext<{
  matrix: GridNode[][];
  setMatrix: React.Dispatch<React.SetStateAction<GridNode[][]>>;
  changeMatrixValue: (i: number, j: number, value?: string, isWall?: boolean) => void;
  resetParams: () => void;
}>({
  matrix: [],
  setMatrix: () => { },
  changeMatrixValue: () => { },
  resetParams: () => { }
});

const MatrixProvider = ({ children }: { children: ReactNode }) => {
  const [matrix, setMatrix] = useState(Grid.createNodes(50, 18));

  const changeMatrixValue = (i: number, j: number, value?: string, isWall?: boolean) => {
    const newMatrix = matrix.map(row => row.slice());

    if (value !== undefined)
      newMatrix[i][j].value = value;
    if (isWall !== undefined)
      newMatrix[i][j].isWall = isWall;

    setMatrix(newMatrix)
  }
  function resetParams() {
    let copy = matrix.map((row, i) =>
      row.map((_, j) => {
        matrix[i][j].isVisited = false;
        matrix[i][j].distance = Infinity;
        matrix[i][j].previousNode = null;
        matrix[i][j].isStart = false;
        matrix[i][j].isFinish = false;
        return matrix[i][j];
      })
    );
    setMatrix(copy);
  }
  return (
    <MatrixContext.Provider value={{ matrix, setMatrix, changeMatrixValue, resetParams }}>
      {children}
    </MatrixContext.Provider>
  );
}

const useMatrixContext = () => useContext(MatrixContext);

export { MatrixProvider, useMatrixContext };
