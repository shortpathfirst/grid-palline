import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { AiOutlineControl } from "react-icons/ai";
import { MdDownload } from "react-icons/md";
import { GiPaintBucket } from "react-icons/gi";
import { FaUndo } from "react-icons/fa";
import ClearDialog from './ClearDialog';
import { useGridState } from '../../../../hooks/GridStateHook';
import { grid } from '../../../../model/GridStatus';
import { arrayToImg } from '../../../../Controller/Utils/imgUtils';
import { useMatrixContext } from '../../../../hooks/MatrixProvider';
import { CSSProperties } from 'react';
import { useOperationsContext } from '../../../../hooks/OperationsHook';
import Eraser from '../Eraser';

type Props = {
  floodFillStyle: CSSProperties,
  onEraser:()=>void
  onClear: ()=>void,
}
function ControlTools({ floodFillStyle, onClear , onEraser }: Props) {
  const { matrix } = useMatrixContext();
  const { setGridState } = useGridState();
  const {undoOperations} = useOperationsContext();
  
  function handleFloodFill() {
    setGridState(prev => prev === grid.fill ? grid.draw : grid.fill)
  }

  const download = () => {
    arrayToImg(matrix);
  }

  return (
    <SubMenu label={"Controls"} icon={<AiOutlineControl />} defaultOpen={true} >
      <MenuItem icon={<GiPaintBucket />} onClick={handleFloodFill} style={floodFillStyle}>FloodFill</MenuItem>
      <MenuItem icon={<FaUndo />} onClick={()=>undoOperations()} >Undo</MenuItem>
      <ClearDialog onClear={onClear}></ClearDialog>
      <MenuItem icon={<Eraser width={40} height={40}></Eraser>} onClick={()=>onEraser()} >ERASER</MenuItem>
      <MenuItem icon={<MdDownload />} onClick={download} >DOWNLOAD</MenuItem>
    </SubMenu>
  )
}

export default ControlTools