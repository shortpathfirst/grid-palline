import React from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { ColorPicker } from "react-color-palette";

function RightSideBar({collapsed,color,setColor,handleMouseEnter,handleMouseLeave,onFixSidebar}) {

  return (
    //  className="rightSideBar"
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app2"  
        style={{ height: "100%",position:"fixed",right:"0"} } //marginRight:"0px",marginLeft:"auto",float:"right",
        collapsed ={collapsed}
        collapsedWidth={"20px"} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        backgroundColor={"rgb(175, 157, 212, 0.235)"}
        transitionDuration={200} 
        width='550px'
      >
      <Menu>
        {!collapsed ? (
          <div className='colorPicker'>
            <ColorPicker color={color} onChange={setColor} />
            <button className='fixButton' onClick={onFixSidebar}>
                FIX
            </button>
                  
          </div>
        ):(<MenuItem></MenuItem>)
        }
      </Menu>
      </Sidebar>
    </div>
  )
}

export default RightSideBar