import React, { useReducer } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { HiMenuAlt2 } from 'react-icons/hi';
import { SlWrench } from 'react-icons/sl';
import { GiPaintBucket } from 'react-icons/gi';
import { MdScreenRotation } from 'react-icons/md';
import { FaUndo } from 'react-icons/fa';
import { BsGrid3X3Gap } from 'react-icons/bs';
import logo from '../../Assets/Eraser_icon.svg';
import GridSetting from './Tools/GridSetting';
import MazeTools from './Tools/MazeTools';
import '../../styles/sidebars.css';
import { arrayToImg } from '../../Controller/Utils/imgUtils';
import ControlTools from './Tools/ControllTools/ControlTools';
import FileSelector from './Tools/ControllTools/FileSelector';
import { useMatrixContext } from '../../hooks/MatrixProvider';

const initialState = {
  collapsed: false,
  isEraser: false,
  floodFill: false,
  gridState: {},
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
    case 'SET_GRID_STATE':
      return { ...state, gridState: action.payload };
    case 'SET_IS_WALL':
      return { ...state, isWall: action.payload };
    default:
      return state;
  }
}

function LeftSideBar({
  onEraser,
  isEraser,
  onRandomImage,
  onChangeStart,
  onSetWalls,
  onFloodFill,
  onPrevState,
  onRotate,
  onClear,
  gridState,
  isWall,
  floodFill,
  operationList,
  changeMatrix,
  dijkstra,
  handleLoadImage,
  handleRotatePallina,
}) {
  const [state, dispatch] = useReducer(reducer, initialState); // Use useReducer for state management
  const {matrix} = useMatrixContext();

  // <input multiple TO ACCEPT MULTIPLE FILE
  function download() {
    arrayToImg(matrix);
  }

  const floodFillStyle = state.floodFill ? { backgroundColor: '#9f8dc6' } : {};

  const rndImageStyle = {
    display: 'none', // CURRENTLY HIDDEN
    background: 'conic-gradient(from 45deg,red,yellow,lime,aqua,blue,magenta,red)',
    fontSize: '1.4rem',
    fontWeight: 'bolder',
    marginTop: '2rem',
  };

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
    <div className="container">
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
                onClick={onFloodFill}
                style={floodFillStyle}
              />
              <MenuItem icon={<FaUndo />} onClick={onPrevState} />
              <MenuItem icon={<MdScreenRotation />} onClick={onRotate} />
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
                onChangeStart={onChangeStart}
                onSetWalls={onSetWalls}
                gridState={gridState}
                isWall={isWall}
                operationList={operationList}
                changeMatrix={changeMatrix}
                dijkstra={dijkstra}
              />

              <ControlTools
                onDownload={download}
                onEraser={onEraser}
                onPrevState={onPrevState}
                onFloodFill={onFloodFill}
                floodFill={floodFill}
                onRotate={onRotate}
                handleRotatePallina={handleRotatePallina}
                isEraser={isEraser}
                onClear={onClear}
                floodFillStyle={floodFillStyle}
              ></ControlTools>

              <SubMenu label={'Grid size'} icon={<BsGrid3X3Gap />} defaultOpen={true}>
                <GridSetting
                  onRotate={onRotate}
                  onClear={onClear}
                />
              </SubMenu>
              <MenuItem onClick={onRotate} icon={<MdScreenRotation />}>
                ROTATE
              </MenuItem>
              <MenuItem onClick={handleRotatePallina} icon={<MdScreenRotation />}>
                ROTATE BEAD
              </MenuItem>
              <FileSelector handleLoadImage={handleLoadImage}></FileSelector>

              <MenuItem onClick={onRandomImage} style={rndImageStyle}>
                RandomImage
              </MenuItem>
            </main>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
}

export default LeftSideBar;
