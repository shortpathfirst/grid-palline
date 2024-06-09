import React , { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { HiMenuAlt2} from "react-icons/hi";
import { SlWrench } from "react-icons/sl";
import { GiPaintBucket } from "react-icons/gi";
import { AiOutlineControl } from "react-icons/ai";
import { MdScreenRotation } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { BsGrid3X3Gap } from "react-icons/bs";
import logo from '../../../Assets/Eraser_icon.svg';
import ClearDialog from './Tools/ClearDialog';
import GridSetting from './Tools/GridSetting';
import MazeTools from './Tools/MazeTools';

function LeftSideBar({
  onEraser,
  isEraser,
  onRandomImage,
  onDijkstra,
  onChangeStart,
  onSetWalls,
  onFloodFill,
  onPrevState,
  matrix,//TO REMOVE
  setMatrix, // TO REMOVE
  onRotate,
  onClear,
  gridState,
  isWall,
  floodFill,
}) {

    const [collapsed, setCollapsed] = useState(false);               //Sidebar state


    const setFloodFillStyle = floodFill?{backgroundColor:"#9f8dc6"}:{}

    const rndImageStyle = {
      background:"conic-gradient(from 45deg,red,yellow,lime,aqua,blue,magenta,red)",
      fontSize:"1.4rem",
      fontWeight:"bolder",
      marginTop:"2rem",

    }
  return (
    <div style={{ display: "flex", height: "100vh",userSelect:"none"}}>
    <Sidebar 
      className="app"  
      style={{ height: "100%", position:"fixed"}} 
      // onMouseEnter={()=>setCollapsed(false)}
      // onMouseLeave={()=>setCollapsed(true)}
      collapsedWidth={"70px"} 
      collapsed={collapsed}
      backgroundColor={"rgb(214, 201, 223)"}
      transitionDuration={200}
      >
      
      <Menu menuItemStyles={{
        button: ({ level, active, disabled }) => {
          // only apply styles on first level elements of the tree
          if (level === 0)
            return {
              fontSize:"1.4rem",
              backgroundColor:  'rgb(214, 201, 223)', 
            };
          if (level ===1)
            return{
              fontSize:"1.4rem",
              backgroundColor:  'rgb(214, 201, 223)', 
          };
        },
    }}>
      {collapsed ? (<main>
            <MenuItem
              icon={<HiMenuAlt2 className="logo-burger" />}
              onClick={()=>setCollapsed(!collapsed)}
            ></MenuItem>

            <MenuItem onClick={onFloodFill} icon={<GiPaintBucket />} style={setFloodFillStyle}/>
            <MenuItem icon={<FaUndo />} onClick={onPrevState}/>
            <MenuItem onClick={onRotate} icon={<MdScreenRotation />}/>
            </main>
          ) : (
              <main style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <MenuItem
              suffix={"Menu"}
              icon={<SlWrench />}
              style={{textAlign:"center", fontSize:"2rem"}}
              onClick={()=>setCollapsed(!collapsed)}
            >
            </MenuItem>
            {/* MAZE TOOLS */}
            <MazeTools onChangeStart={onChangeStart} onDijkstra={onDijkstra} onSetWalls={onSetWalls} gridState={gridState} isWall={isWall}/>
            
            <SubMenu label={"Controls"} icon={<AiOutlineControl />} defaultOpen={true} >
            <MenuItem onClick={onFloodFill} icon={<GiPaintBucket />} style={setFloodFillStyle}>FloodFill</MenuItem>
            <MenuItem icon={<FaUndo />} onClick={onPrevState}>Undo</MenuItem>
            {/* CLEAR  */}
            <ClearDialog onClear = {onClear}></ClearDialog>

            <MenuItem onClick={onRotate} icon={<MdScreenRotation />}>ROTATE</MenuItem>
            </SubMenu>

              <img src={logo} alt='Eraser' onClick={onEraser} width={80} height={80} style={{opacity:isEraser?0.4:1}}/>

            <SubMenu label={"Grid size"} icon={<BsGrid3X3Gap />}defaultOpen={true}>
              <GridSetting matrix={matrix} setMatrix={setMatrix} onRotate={onRotate} onClear={onClear}/>
            </SubMenu>

              
              
              <MenuItem onClick={onRandomImage} className='randomImg' 
                  style={rndImageStyle}>RandomImage</MenuItem>
              </main>
          )}


      </Menu>
      
    </Sidebar>
  </div>
  )
}

export default LeftSideBar

