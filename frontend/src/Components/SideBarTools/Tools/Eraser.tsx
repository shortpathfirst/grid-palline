import { useGridState } from "../../../hooks/GridStateHook";
import logo from '../../../Assets/Eraser_icon.svg';
import { grid } from "../../../model/GridStatus";
type Props = {
    width: number,
    height: number,
}
function Eraser({ width, height }: Props) {
    const { gridState } = useGridState();

    return (
        <img src={logo} alt='Eraser' width={width} height={height} style={{ opacity: gridState === grid.eraser ? 0.4 : 1 }} />
    )
}

export default Eraser