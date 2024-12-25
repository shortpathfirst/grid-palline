import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { AiOutlineControl } from "react-icons/ai";
import { MdDownload } from "react-icons/md";
import { GiPaintBucket } from "react-icons/gi";
import { FaUndo } from "react-icons/fa";
import ClearDialog from './ClearDialog';
import logo from '../../../../Assets/Eraser_icon.svg';
import { useGridState } from '../../../../hooks/GridStateHook';
import { grid } from '../../../../model/GridStatus';


function ControlTools({ floodFillStyle, onPrevState, onDownload, onClear }) {

  const {gridState,setGridState} = useGridState();
  function handleFloodFill() {
    setGridState(prev => prev === grid.fill ? grid.draw : grid.fill)
  }
  function switchEraser() {
    setGridState(prev => prev === grid.eraser ? grid.draw : grid.eraser)
  }
  const eraser = <img src={logo} alt='Eraser' width={40} height={40} style={{ opacity: gridState===grid.eraser ? 0.4 : 1 }} />;
  const controlTools = [
    { name: 'FloodFill', icon: <GiPaintBucket />, action: handleFloodFill },
    { name: 'Undo', icon: <FaUndo />, action: onPrevState },
    // { name: 'Clear', icon: <GrClear />, action: onClear },
    { name: 'ERASER', icon: eraser, action: switchEraser },
    { name: 'DOWNLOAD', icon: <MdDownload />, action: onDownload },
  ]

  return (
    <SubMenu label={"Controls"} icon={<AiOutlineControl />} defaultOpen={true} >
      {/* <MenuItem onClick={onFloodFill} icon={<GiPaintBucket />} style={floodFillStyle}>FloodFill</MenuItem> */}
      {controlTools.map((tool, i) => (
        <MenuItem key={i} icon={tool.icon} onClick={tool.action}>{tool.name}</MenuItem>
      ))}
      <ClearDialog onClear={onClear}></ClearDialog>
    </SubMenu>
  )
}

export default ControlTools