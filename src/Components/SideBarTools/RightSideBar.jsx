import React,{useState} from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { ColorPicker } from "react-color-palette";
import '../../styles/sidebars.css'

// No need for a Sidebar, just hover a div element

function RightSideBar({color,setColor}) {

  const styles = {
    sidebarWidth:"500px",
    colorPickerHeight:300,
    sidebarBackgroundColor:"rgb(175, 157, 212, 0.8)",
  }
  const [rightSidebarCollapsed, setRightCollapsed] = useState(true);      //Right Sidebar state
  const [fixRightSidebar,setfixRightSidebar] = useState(false);

  return (

    <div className='rightSidebarContainer'>
      <Sidebar 
        className='rightSidebar' 
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
        )
        :<MenuItem/>
        }
      </Menu>
      </Sidebar>
    </div>
  )
}

export default RightSideBar