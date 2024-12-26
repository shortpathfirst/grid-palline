import { useReducer } from 'react';
import '../../styles/sidebars.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { HiMenuAlt2 } from 'react-icons/hi';
import { SlWrench } from 'react-icons/sl';
import { GiPaintBucket } from 'react-icons/gi';
import { MdScreenRotation } from 'react-icons/md';
import { FaUndo } from 'react-icons/fa';
import { BsGrid3X3Gap } from 'react-icons/bs';
import logo from '../../Assets/Eraser_icon.svg';
import GridSetting from './Tools/GridSizeSetting';
import MazeTools from './Tools/MazeTools';
import ControlTools from './Tools/ControllTools/ControlTools';
import FileSelector from './Tools/ControllTools/FileSelector';
import { useMatrixContext } from '../../hooks/MatrixProvider';
import RandomImageButton from './Tools/RandomImageMenuButton';
import { RotateUtils } from '../../Controller/Utils/RotateUtils';
import { useGridState } from '../../hooks/GridStateHook';
import { grid } from '../../model/GridStatus';
import { useOperationsContext } from '../../hooks/OperationsHook';

const initialState = {
  collapsed: false,
  isEraser: false,
  floodFill: false,
  isWall: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_COLLAPSE':
      return { ...state, collapsed: !state.collapsed };
    case 'SET_ERASER':
      return { ...state, isEraser: action.payload };
    case 'TOGGLE_FLOOD_FILL':
      return { ...state, floodFill: !state.floodFill };
    case 'SET_IS_WALL':
      return { ...state, isWall: action.payload };
    default:
      return state;
  }
}

function LeftSideBar({
  onSetWalls,
  onClear,
  isWall,
  dijkstraPoints,
  handleLoadImage,
  handleRotatePallina,
}) {
  const [state, dispatch] = useReducer(reducer, initialState); // Use useReducer for state management
  const { matrix, setMatrix } = useMatrixContext();
  const { gridState, setGridState } = useGridState()
  const {undoOperations} = useOperationsContext();

  const rotateMatrix = () => {
    setMatrix(RotateUtils.rotateMatrix(matrix));
  }


  function handleFloodFill() {
    setGridState(prev => prev === grid.fill ? grid.draw : grid.fill)
  }
  const floodFillStyle = gridState === grid.fill ? { backgroundColor: '#9f8dc6' } : {};

  const styles = {
    sidebarBackground: 'rgb(214, 201, 223)',
    header: { textAlign: 'center', fontSize: '2rem' },
    level0: {
      fontSize: '1.4rem',
      backgroundColor: 'rgb(214, 201, 223)',
    },
  };

  const eraser = (
    <img
      src={logo}
      alt="Eraser"
      width={35}
      height={35}
      style={{ opacity: state.isEraser ? 0.4 : 1 }}
      onClick={() => dispatch({ type: 'SET_ERASER', payload: !state.isEraser })}
    />
  );

  return (
    <div className="sideBarContainer">
      <Sidebar
        style={{ height: '100%', position: 'fixed' }}
        collapsedWidth={'70px'}
        collapsed={state.collapsed}
        backgroundColor={styles.sidebarBackground}
        transitionDuration={200}
      >
        <Menu
          menuItemStyles={{
            button: ({ level }) => {
              if (level === 0) return styles.level0;
              if (level === 1) return styles.level0;
            },
          }}
        >
          {state.collapsed ? (
            <main>
              <MenuItem
                icon={<HiMenuAlt2 className="logo-burger" />}
                onClick={() => dispatch({ type: 'TOGGLE_COLLAPSE' })}
              ></MenuItem>
              <MenuItem
                icon={<GiPaintBucket />}
                onClick={handleFloodFill}
                style={floodFillStyle}
              />
              <MenuItem icon={<FaUndo />} onClick={()=>undoOperations()} />
              <MenuItem icon={<MdScreenRotation />} onClick={rotateMatrix} />
              <MenuItem icon={eraser}></MenuItem>
            </main>
          ) : (
            <main className="mainMenu">
              <MenuItem
                icon={<SlWrench />}
                suffix={'Menu'}
                style={styles.header}
                onClick={() => dispatch({ type: 'TOGGLE_COLLAPSE' })}
              ></MenuItem>

              <MazeTools
                onSetWalls={onSetWalls}
                isWall={isWall}
                dijkstraPoints={dijkstraPoints}
              />

              <ControlTools
                handleRotatePallina={handleRotatePallina}
                onClear={onClear}
                floodFillStyle={floodFillStyle}
              ></ControlTools>

              <SubMenu label={'Grid size'} icon={<BsGrid3X3Gap />} defaultOpen={true}>
                {/* Grid Size Menu */}
                <GridSetting />
              </SubMenu>
              <MenuItem onClick={rotateMatrix} icon={<MdScreenRotation />}>
                ROTATE
              </MenuItem>
              <MenuItem onClick={handleRotatePallina} icon={<MdScreenRotation />}>
                ROTATE BEAD
              </MenuItem>
              <FileSelector handleLoadImage={handleLoadImage}></FileSelector>

              <RandomImageButton></RandomImageButton>
            </main>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
}

export default LeftSideBar;
