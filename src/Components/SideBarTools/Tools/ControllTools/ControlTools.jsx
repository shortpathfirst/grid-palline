import React from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { AiOutlineControl } from "react-icons/ai";
import { MdDownload } from "react-icons/md";
import { MdScreenRotation } from "react-icons/md";
import { GiPaintBucket } from "react-icons/gi";
import { FaUndo } from "react-icons/fa";
import ClearDialog from './ClearDialog';
import logo from '../../../../Assets/Eraser_icon.svg';



function ControlTools({onFloodFill,floodFillStyle,onPrevState,onRotate,onEraser,onDownload,isEraser,onClear}) {

    
    const eraser = <img src={logo} alt='Eraser' width={40} height={40} style={{opacity:isEraser?0.4:1}}/>;
    
  return (
    <SubMenu label={"Controls"} icon={<AiOutlineControl />} defaultOpen={true} >
        <MenuItem onClick={onFloodFill} icon={<GiPaintBucket />} style={floodFillStyle}>FloodFill</MenuItem>
        <MenuItem icon={<FaUndo />} onClick={onPrevState}>Undo</MenuItem>

        <ClearDialog onClear = {onClear}></ClearDialog>

        <MenuItem onClick={onRotate} icon={<MdScreenRotation />}>ROTATE</MenuItem>
        <MenuItem onClick={onEraser} icon={eraser}>ERASER</MenuItem>
        <MenuItem onClick={onDownload} icon={<MdDownload />}>DOWNLOAD</MenuItem>
  </SubMenu>
  )
}

export default ControlTools