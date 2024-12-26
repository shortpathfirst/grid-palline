import { useState, createContext, ReactNode, useContext } from 'react';
import { grid } from '../model/GridStatus';

const GridStateContext = createContext<{
  gridState: grid;
  setGridState: React.Dispatch<React.SetStateAction<grid>>;
  isSetWall: boolean;
  switchWalls: () => void;
}>({
  gridState: -1,
  setGridState: () => { },
  isSetWall: false,
  switchWalls: () => { },
});

const GridStateProvider = ({ children }: { children: ReactNode }) => {
  const [gridState, setGridState] = useState(grid.draw);
  const [isSetWall, setWalls] = useState(false);
  const switchWalls = () => setWalls(!isSetWall);
  return (
    <GridStateContext.Provider value={{ gridState, setGridState, isSetWall, switchWalls }}>
      {children}
    </GridStateContext.Provider>
  );
}

const useGridState = () => useContext(GridStateContext);

export { GridStateProvider, useGridState };
