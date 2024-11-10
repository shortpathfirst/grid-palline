import React,{useState} from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { ColorPicker } from "react-color-palette";

function RightSideBar({color,setColor}) {

  const styles = {
    sidebarWidth:"500px",
    colorPickerHeight:300,
    sideBarStyles:{ height: "100%",position:"fixed",right:"0"},
    sidebarBackgroundColor:"rgb(175, 157, 212, 0.235)",
  }
  const [rightSidebarCollapsed, setRightCollapsed] = useState(true);      //Right Sidebar state
  const [fixRightSidebar,setfixRightSidebar] = useState(false);

  return (
    <div>
      <Sidebar
        style={ styles.sideBarStyles} //marginRight:"0px",marginLeft:"auto",float:"right",
        collapsed ={rightSidebarCollapsed}
        collapsedWidth={"60px"} 
        onMouseEnter={()=>{if(!fixRightSidebar)setRightCollapsed(false)}}
        onMouseLeave={()=>{if(!fixRightSidebar)setRightCollapsed(true)}}
        backgroundColor={styles.sidebarBackgroundColor}
        transitionDuration={200} 
        width={styles.sidebarWidth}
      >
      <Menu>
        {!rightSidebarCollapsed ? (
          <div className='colorPicker'>
            <ColorPicker height={styles.colorPickerHeight} color={color} onChange={setColor} />
            <button className='fixButton' onClick={() =>setfixRightSidebar(!fixRightSidebar)}>
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