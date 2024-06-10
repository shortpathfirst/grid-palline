import React from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { ColorPicker } from "react-color-palette";

function RightSideBar({collapsed,color,setColor,handleMouseEnter,handleMouseLeave,onFixSidebar}) {

  const styles = {
    sidebarWidth:"500px",
    colorPickerHeight:300,
    sideBarStyles:{ height: "100%",position:"fixed",right:"0"},
    sidebarBackgroundColor:"rgb(175, 157, 212, 0.235)",
  }


  return (
    //  className="rightSideBar"
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app2"  
        style={ styles.sideBarStyles} //marginRight:"0px",marginLeft:"auto",float:"right",
        collapsed ={collapsed}
        collapsedWidth={"60px"} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        backgroundColor={styles.sidebarBackgroundColor}
        transitionDuration={200} 
        width={styles.sidebarWidth}
      >
      <Menu>
        {!collapsed ? (
          <div className='colorPicker'>
            <ColorPicker height={styles.colorPickerHeight} color={color} onChange={setColor} />
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