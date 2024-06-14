import React , { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { HiMenuAlt2} from "react-icons/hi";
import { SlWrench } from "react-icons/sl";
import { GiPaintBucket } from "react-icons/gi";
import { MdScreenRotation } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { BsGrid3X3Gap } from "react-icons/bs";
import logo from '../../Assets/Eraser_icon.svg';
import GridSetting from './Tools/GridSetting';
import MazeTools from './Tools/MazeTools';
import '../../styles/leftSidebar.css';
import {arrayToImg} from '../../Controller/Utils/imgUtils' 
import ControlTools from './Tools/ControllTools/ControlTools';
import FileSelector from './Tools/ControllTools/FileSelector';


function LeftSideBar({
  onEraser,
  isEraser,
  onRandomImage,
  onChangeStart,
  onSetWalls,
  onFloodFill,
  onPrevState,
  matrix,
  setMatrix, 
  onRotate,
  onClear,
  gridState,
  isWall,
  floodFill,
  operationList,
  changeMatrix,
  dijkstra,
  handleLoadImage,
}) {

    const [collapsed, setCollapsed] = useState(false);               //Sidebar state

    // < input multiple  TO ACCEPT MULTIPLE FILE
    function download(){
        arrayToImg(matrix);
    }

    const floodFillStyle = floodFill?{backgroundColor:"#9f8dc6"}:{};

    const rndImageStyle = {
      display:"none", //CURRENTLY HIDDEN
      background:"conic-gradient(from 45deg,red,yellow,lime,aqua,blue,magenta,red)",
      fontSize:"1.4rem",
      fontWeight:"bolder",
      marginTop:"2rem",
    };
    const styles = {
      sidebarBackground:"rgb(214, 201, 223)",
      header:{textAlign:"center", fontSize:"2rem"},
      level0:{
        fontSize:"1.4rem",
        backgroundColor:'rgb(214, 201, 223)'
      },
      
    };
    const eraser = <img src={logo} alt='Eraser'  width={35} height={35} style={{opacity:isEraser?0.4:1}}onClick={onEraser}/>
  return (
    <div className='container'>
    <Sidebar 
      className="app"  
      style={{ height: "100%",position:"fixed"}} 
      // onMouseEnter={()=>setCollapsed(false)}
      // onMouseLeave={()=>setCollapsed(true)}
      collapsedWidth={"70px"} 
      collapsed={collapsed}
      backgroundColor={styles.sidebarBackground}
      transitionDuration={200}
      >
      
      <Menu menuItemStyles={{
        button: ({ level, active, disabled }) => {
          // only apply styles on first level elements of the tree
          if (level === 0)
            return styles.level0;
          if (level ===1)
            return styles.level0;;
        },
    }}>
      {collapsed ? (<main>
            <MenuItem icon={<HiMenuAlt2 className="logo-burger" />} onClick={()=>setCollapsed(!collapsed)}></MenuItem>
            <MenuItem icon={<GiPaintBucket />} onClick={onFloodFill} style={floodFillStyle}/>
            <MenuItem icon={<FaUndo />} onClick={onPrevState}/>
            <MenuItem icon={<MdScreenRotation />} onClick={onRotate} />
            <MenuItem icon={eraser }></MenuItem>
            </main>
          ) : (
            <main className='mainMenu'>
              <MenuItem  icon={<SlWrench />}
                suffix={"Menu"}
                style={styles.header}
                onClick={()=>setCollapsed(!collapsed)}
              ></MenuItem>

              <MazeTools 
              onChangeStart={onChangeStart} 
              onSetWalls={onSetWalls} 
              gridState={gridState} 
              isWall={isWall}
              
              operationList={operationList}
              changeMatrix={changeMatrix}
              dijkstra={dijkstra}
              matrix={matrix}
              setMatrix={setMatrix}/>
              
             <ControlTools onDownload={()=>download()} 
              onEraser={onEraser} 
              onPrevState={onPrevState} 
              onFloodFill={onFloodFill} 
              floodFill={floodFill} 
              onRotate={onRotate} 
              isEraser={isEraser}
              onClear={onClear}
              floodFillStyle={floodFillStyle}
             ></ControlTools>

              <SubMenu label={"Grid size"} icon={<BsGrid3X3Gap />}defaultOpen={true}>
                <GridSetting matrix={matrix} setMatrix={setMatrix} onRotate={onRotate} onClear={onClear}/>
              </SubMenu>

               <FileSelector handleLoadImage={handleLoadImage}></FileSelector>

              <MenuItem onClick={onRandomImage} style={rndImageStyle} >RandomImage</MenuItem>
            </main>
          )}


      </Menu>
      
    </Sidebar>
  </div>
  )
}

export default LeftSideBar

