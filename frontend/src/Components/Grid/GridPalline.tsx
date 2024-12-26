import {  useState } from 'react'
import '../../styles/grid.css'
import "react-color-palette/css";
import { IColor, useColor } from "react-color-palette";
import { Grid } from '../../model/Grid';
import {countColors} from '../../Controller/Utils/imgUtils';
import { LoadUtils } from '../../Controller/Utils/LoadUtils';
import ColorStory from '../ColorStory/ColorStory';
import GridComponent from './GridComponent';
import RightSideBar from '../SideBarTools/RightSideBar';
import LeftSideBar from '../SideBarTools/LeftSideBar';
import { useMatrixContext } from '../../hooks/MatrixProvider';
import { useOperationsContext } from '../../hooks/OperationsHook';

type DijkstraPoints = {
    START_NODE:[number,number],
    FINISH_NODE:[number,number],
}
const DefaultDijkstraPoints:DijkstraPoints ={
    START_NODE : [10,15],
    FINISH_NODE :[10,25], 
}

export default function GridPalline() {

    const {setMatrix} = useMatrixContext();
    const {setOperations} = useOperationsContext();
    const [color, setColor] = useColor("#561ecb");                                  // Current ColorPalette
    const [colorStory,setColorStory] = useState<IColor[]>([]);                      // List of color used

    const [dijkstraPoints,setDijkstraPoints] = useState(DefaultDijkstraPoints);     // START AND END FOR MAZE
    const [isSetWall,setWalls] = useState(false);                                   // WALL MODE
    const [pallinaOrientation,setPallinaOrientation] = useState(true);              // Pallina Orientation

    function handleLoadImage(img:string[][]){
        setColorStory(countColors(img));
        setMatrix(LoadUtils.loadImg(img));
    }

    function handleSetDijkstra(s?:[number,number],f?:[number,number]){
        if(f){
            setDijkstraPoints({
            ...dijkstraPoints, 
            FINISH_NODE: f,
          });
        }
        if(s){
            setDijkstraPoints({
            ...dijkstraPoints, 
            START_NODE: s,
            });
        }
    }

    const pushColor = (color:IColor) =>{
        if(colorStory.find((c)=>c.hex===color.hex)){
            return;
        }
        setColorStory([...colorStory,color]);
    }


    function handleClear(){
        setMatrix(Grid.createNodes(50,18));
        setOperations([]);
    }

  return (
    <>
    <div className='container' >
        <LeftSideBar
            onClear ={()=>handleClear()}
            dijkstraPoints={dijkstraPoints}
            onSetWalls ={()=>setWalls(!isSetWall)}
            isWall={isSetWall}
            handleLoadImage={handleLoadImage}
            handleRotatePallina = {()=>setPallinaOrientation(!pallinaOrientation)}
            ></LeftSideBar>
   

        <ColorStory colorStory={colorStory} setColorStory={setColorStory} setColor={setColor}></ColorStory>

        <GridComponent 
        pushColor={pushColor} 
        color={color} 
        handleSetDijkstra={handleSetDijkstra} 
        isSetWall={isSetWall}
        isVertical={pallinaOrientation}
        />
        <RightSideBar  color={color} setColor={setColor} />

    </div>
    </>
  )
}
