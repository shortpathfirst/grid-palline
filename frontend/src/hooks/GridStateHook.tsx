import { useState, createContext, ReactNode, useContext } from 'react';
import { grid } from '../model/GridStatus';

const GridStateContext = createContext<{
  gridState:grid;
  setGridState: React.Dispatch<React.SetStateAction<grid>>
}>({
  gridState: -1,
  setGridState: () => { }
});

const GridStateProvider = ({ children }: { children: ReactNode }) => {
  const [gridState, setGridState] = useState(grid.draw); 

  return (
    <GridStateContext.Provider value={{ gridState, setGridState }}>
      {children}
    </GridStateContext.Provider>
  );
}

const useGridState = () => useContext(GridStateContext);

export { GridStateProvider, useGridState };
