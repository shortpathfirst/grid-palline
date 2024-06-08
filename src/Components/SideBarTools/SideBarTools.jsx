import React , { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { HiMenuAlt2 } from "react-icons/hi";
import ActionButton from '../../Visualizer/Partials/ActionButton';
function SideBarTools({onEraser,onRandomImage,onRotate,onRemoveColumn,onAddColumn,onRemoveLine,onAddLine,onClear,onDijkstra,onChangeStart,onSetWalls,onVisualizeMaze,onFloodFill,onPrevState}) {

    const [collapsed, setCollapsed] = useState(true);               //Sidebar state


  return (
    <div style={{ display: "flex", height: "100vh" }}>
    <Sidebar 
      className="app"  
      style={{ height: "100%", position:"fixed" }} 
      onMouseEnter={()=>setCollapsed(false)}
      onMouseLeave={()=>setCollapsed(true)}
      collapsedWidth={"70px"} 
      collapsed={collapsed}
      backgroundColor={"rgb(214, 201, 223)"}
      transitionDuration={200}
      
      >
      <main>
          <Menu>
      {collapsed ? (
            <MenuItem
              icon={<HiMenuAlt2 className="logo-burger" />}
              onClick={()=>setCollapsed(!collapsed)}
            ></MenuItem>
          ) : (
              <main style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <MenuItem
              suffix={"Hello"}
              onClick={()=>setCollapsed(!collapsed)}
            >
              <div
                style={{
                  padding: "9px",
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: "1px",
                }}
              >

              </div>
            </MenuItem>
              <SubMenu><MenuItem>One</MenuItem></SubMenu>
              <ActionButton name={"Maze game"} onAction={onDijkstra} ></ActionButton>
              
              <ActionButton name={"Set Start and finish"} onAction={onChangeStart} ></ActionButton>
              <ActionButton name={"Set Walls"} onAction={onSetWalls} ></ActionButton>
              <ActionButton name={"MAZE"} onAction={onVisualizeMaze} ></ActionButton>
              <ActionButton name={"FloodFill"} onAction={onFloodFill}></ActionButton>
              <button className='backButton'onClick={onPrevState}>Cancel</button>
              {/* <Eraser onClick={()=>setEraser(!eraser)} width={80} height={80} style={{opacity:eraser?0.4:1}}/> */}
              {/* <img src={logo} alt='Eraser' onClick={onEraser} width={80} height={80} style={{opacity:eraser?0.4:1}}/> */}
              <button className='backButton'onClick={onClear}>Clear</button>
              
              <button className='backButton' onClick={onAddLine}>
                  +1
              </button>
              <button className='backButton' onClick={onRemoveLine}>
                  -1
              </button>
              <button className='backButton' onClick={onAddColumn}>
                  +1 C
              </button>
              <button className='backButton' onClick={onRemoveColumn}>
                  -1 C
              </button>
              <button className='backButton' onClick={onRotate}>
                  ROTATE
              </button>
              <ActionButton name={"RandomImage"} onAction={onRandomImage}></ActionButton>
              
              <ActionButton name={"Eraser"} onAction={onEraser}></ActionButton>
              </main>
          )}


      </Menu>
      </main>
    </Sidebar>
  <div className='rightSidebar'>

  </div>
  </div>
  )
}

export default SideBarTools

