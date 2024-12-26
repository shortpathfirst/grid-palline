import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { AiOutlineControl } from "react-icons/ai";
import { MdDownload } from "react-icons/md";
import { GiPaintBucket } from "react-icons/gi";
import { FaUndo } from "react-icons/fa";
import ClearDialog from './ClearDialog';
import logo from '../../../../Assets/Eraser_icon.svg';
import { useGridState } from '../../../../hooks/GridStateHook';
import { grid } from '../../../../model/GridStatus';
import { arrayToImg } from '../../../../Controller/Utils/imgUtils';
import { useMatrixContext } from '../../../../hooks/MatrixProvider';
import { CSSProperties } from 'react';
import { useOperationsContext } from '../../../../hooks/OperationsHook';

type Props = {
  floodFillStyle: CSSProperties,
  onClear: ()=>void,
}
function ControlTools({ floodFillStyle, onClear }: Props) {
  const { matrix } = useMatrixContext();
  const { gridState, setGridState } = useGridState();
  const {undoOperations} = useOperationsContext();
  
  function handleFloodFill() {
    setGridState(prev => prev === grid.fill ? grid.draw : grid.fill)
  }
  function switchEraser() {
    setGridState(prev => prev === grid.eraser ? grid.draw : grid.eraser)
  }

  const download = () => {
    arrayToImg(matrix);
  }

  const eraser = <img src={logo} alt='Eraser' width={40} height={40} style={{ opacity: gridState === grid.eraser ? 0.4 : 1 }} />;

  return (
    <SubMenu label={"Controls"} icon={<AiOutlineControl />} defaultOpen={true} >
      <MenuItem icon={<GiPaintBucket />} onClick={handleFloodFill} style={floodFillStyle}>FloodFill</MenuItem>
      <MenuItem icon={<FaUndo />} onClick={()=>undoOperations()} >Undo</MenuItem>
      <ClearDialog onClear={onClear}></ClearDialog>
      <MenuItem icon={eraser} onClick={switchEraser} >ERASER</MenuItem>
      <MenuItem icon={<MdDownload />} onClick={download} >DOWNLOAD</MenuItem>
    </SubMenu>
  )
}

export default ControlTools