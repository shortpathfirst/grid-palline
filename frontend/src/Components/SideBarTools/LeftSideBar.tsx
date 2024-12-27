import { CSSProperties, useState } from 'react';
import '../../styles/sidebars.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { HiMenuAlt2 } from 'react-icons/hi';
import { SlWrench } from 'react-icons/sl';
import { GiPaintBucket } from 'react-icons/gi';
import { MdScreenRotation } from 'react-icons/md';
import { FaUndo } from 'react-icons/fa';
import { BsGrid3X3Gap } from 'react-icons/bs';
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
import { DijkstraPoints } from '../../model/DijkstraPoint';
import Eraser from './Tools/Eraser';

type Props = {
  onClear: () => void,
  dijkstraPoints: DijkstraPoints,
  handleLoadImage: (img: string[][]) => void,
  handleRotatePallina: () => void,
}
const styles = {
  sidebarBackground: 'rgb(214, 201, 223)',
  header: { textAlign: 'center', fontSize: '2rem' } as CSSProperties,
  level0: {
    fontSize: '1.4rem',
    backgroundColor: 'rgb(214, 201, 223)',
  },
};

function LeftSideBar({
  onClear,
  dijkstraPoints,
  handleLoadImage,
  handleRotatePallina,
}: Props) {

  const { matrix, setMatrix } = useMatrixContext();
  const { gridState, setGridState } = useGridState()
  const { undoOperations } = useOperationsContext();
  const [leftSidebarCollapsed, setLeftCollapsed] = useState(true);

  const floodFillStyle = gridState === grid.fill ? { backgroundColor: '#9f8dc6' } : {};

  const handleCollapse = () => {
    setLeftCollapsed(!leftSidebarCollapsed)
  }

  const rotateMatrix = () => {
    setMatrix(RotateUtils.rotateMatrix(matrix));
  }

  function handleFloodFill() {
    setGridState(prev => prev === grid.fill ? grid.draw : grid.fill)
  }

  const switchEraser = () => {
    setGridState(prev => prev === grid.eraser ? grid.draw : grid.eraser)
  }

  return (
    <div className="sideBarContainer">
      <Sidebar
        style={{ height: '100%', position: 'fixed' }}
        collapsedWidth={'70px'}
        collapsed={leftSidebarCollapsed}
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
          {leftSidebarCollapsed ? (
            <main>
              <MenuItem icon={<HiMenuAlt2 className="logo-burger" />} onClick={handleCollapse}></MenuItem>
              <MenuItem icon={<GiPaintBucket />} onClick={handleFloodFill} style={floodFillStyle} />
              <MenuItem icon={<FaUndo />} onClick={() => undoOperations()} />
              <MenuItem icon={<MdScreenRotation />} onClick={rotateMatrix} />
              <MenuItem icon={<Eraser width={35} height={35}></Eraser>} onClick={switchEraser}></MenuItem>
            </main>
          ) : (
            <main className="mainMenu">
              <MenuItem
                icon={<SlWrench />}
                suffix={'Menu'}
                style={styles.header}
                onClick={handleCollapse}
              ></MenuItem>

              <MazeTools dijkstraPoints={dijkstraPoints} />
              <ControlTools
                onClear={onClear}
                onEraser={switchEraser}
                floodFillStyle={floodFillStyle}
              />
              <SubMenu label={'Grid size'} icon={<BsGrid3X3Gap />} defaultOpen={true}>
                <GridSetting />
              </SubMenu>
              <MenuItem onClick={rotateMatrix} icon={<MdScreenRotation />}>ROTATE</MenuItem>
              <MenuItem onClick={handleRotatePallina} icon={<MdScreenRotation />}> ROTATE BEAD</MenuItem>
              <FileSelector handleLoadImage={handleLoadImage}></FileSelector>
              <RandomImageButton handleLoadImage={handleLoadImage}></RandomImageButton>
            </main>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
}

export default LeftSideBar;