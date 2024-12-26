import { CSSProperties, useState } from 'react'
import { Sidebar, Menu } from 'react-pro-sidebar';
import { ColorPicker, IColor } from "react-color-palette";
type Props = {
  color: IColor,
  handleChangeColor: (color: IColor) => void
}
function RightSideBar({ color, handleChangeColor }: Props) {

  const styles = {
    sidebarWidth: "500px",
    colorPickerHeight: 300,
    sideBarStyles: { height: "100%", position: "fixed", right: "0" } as CSSProperties,
    sidebarBackgroundColor: "rgb(109, 100, 150, 0.8)",
  }
  const [rightSidebarCollapsed, setRightCollapsed] = useState(true);      //Right Sidebar state
  const [isfixSidebar, setIsfixSidebar] = useState(false);

  const handleFixSidebar = () => setIsfixSidebar(!isfixSidebar);
  return (
    <div>
      <Sidebar
        style={styles.sideBarStyles}
        collapsed={rightSidebarCollapsed}
        collapsedWidth={"60px"}
        onMouseEnter={() => { if (!isfixSidebar) setRightCollapsed(false) }}
        onMouseLeave={() => { if (!isfixSidebar) setRightCollapsed(true) }}
        backgroundColor={styles.sidebarBackgroundColor}
        transitionDuration={200}
        width={styles.sidebarWidth}
      >
        {!rightSidebarCollapsed && <Menu>

          <div className='colorPicker'>
            <ColorPicker
              height={styles.colorPickerHeight}
              color={color}
              onChange={handleChangeColor}
            />
            <button className='fixButton' onClick={handleFixSidebar}>
              FIX
            </button>

          </div>

        </Menu>
        }
      </Sidebar>
    </div>
  )
}

export default RightSideBar