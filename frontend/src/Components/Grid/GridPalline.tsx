import { useState } from 'react'
import "react-color-palette/css";
import { IColor, useColor } from "react-color-palette";
import { Grid } from '../../model/Grid';
import { countColors } from '../../Controller/Utils/imgUtils';
import { LoadUtils } from '../../Controller/Utils/LoadUtils';
import ColorStory from '../ColorStory/ColorStory';
import GridComponent from './GridComponent';
import RightSideBar from '../SideBarTools/RightSideBar';
import LeftSideBar from '../SideBarTools/LeftSideBar';
import { useMatrixContext } from '../../hooks/MatrixProvider';
import { useOperationsContext } from '../../hooks/OperationsHook';
import { DijkstraPoints } from '../../model/DijkstraPoint';

const DefaultDijkstraPoints: DijkstraPoints = {
    START_NODE: [10, 15],
    FINISH_NODE: [10, 25],
}

export default function GridPalline() {

    const { setMatrix } = useMatrixContext();
    const { setOperations } = useOperationsContext();
    const [activeColor, setActiveColor] = useColor("#561ecb");                       // Current ColorPalette
    const [colorStory, setColorStory] = useState<IColor[]>([]);                      // List of color used
    const [dijkstraPoints, setDijkstraPoints] = useState(DefaultDijkstraPoints);     // START and END for maze
    const [pallinaOrientation, setPallinaOrientation] = useState(true);              // Pallina Orientation

    function handleLoadImage(img: string[][]) {
        setColorStory(countColors(img));
        setMatrix(LoadUtils.loadImg(img));
    }

    function handleSetDijkstra(s?: [number, number], f?: [number, number]) {
        if (f) {
            setDijkstraPoints({
                ...dijkstraPoints,
                FINISH_NODE: f,
            });
        }
        if (s) {
            setDijkstraPoints({
                ...dijkstraPoints,
                START_NODE: s,
            });
        }
    }
    const rotatePallina = () => setPallinaOrientation(!pallinaOrientation)
    const handleClear = () => {
        setMatrix(Grid.createNodes(50, 18));
        setOperations([]);
    }
    const handleSetColor = (color: IColor) => { setActiveColor(color) };
    const handleAddColor = (color: IColor) => {
        if (colorStory.find((c) => c.hex === color.hex)) {
            return;
        }
        setColorStory([...colorStory, color]);
    }
    const handleRemoveColor = (color: IColor) => {
        setColorStory(prev => prev.filter(item => item !== color));
    };
    return (
        <>
            <div className='container' >
                <LeftSideBar
                    onClear={handleClear}
                    dijkstraPoints={dijkstraPoints}
                    handleLoadImage={handleLoadImage}
                    handleRotatePallina={rotatePallina}
                ></LeftSideBar>


                <ColorStory
                    colorStory={colorStory}
                    handleRemoveColor={handleRemoveColor}
                    handleSetColor={handleSetColor}
                />

                <GridComponent
                    color={activeColor}
                    handleAddColor={handleAddColor}
                    handleSetDijkstra={handleSetDijkstra}
                    isVertical={pallinaOrientation}
                />

                <RightSideBar color={activeColor} handleChangeColor={setActiveColor} />

            </div>
        </>
    )
}
