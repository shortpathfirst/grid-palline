import {  useState } from 'react'
import '../../styles/grid.css'
import { IColor, useColor } from "react-color-palette";
import "react-color-palette/css";
import { Grid } from '../../model/Grid';
import {countColors} from '../../Controller/Utils/imgUtils';
import { LoadUtils } from '../../Controller/Utils/LoadUtils';
import ColorStory from '../ColorStory/ColorStory';
import GridComponent from './GridComponent';
import RightSideBar from '../SideBarTools/RightSideBar';
import LeftSideBar from '../SideBarTools/LeftSideBar';
import { OperationOnGrid } from '../../Controller/OperationOnGrid';
import { useMatrixContext } from '../../hooks/MatrixProvider';
import { changeMatrix } from '../../Service/MatrixService';

let operationList:OperationOnGrid[] = [];

const dijkstraPoints ={
    START_NODE_ROW : 10,
    START_NODE_COL : 15, //TO CHECK IN MATRIX
    FINISH_NODE_ROW : 10,
    FINISH_NODE_COL : 25,
}

export default function GridPalline() {

    const {matrix,setMatrix} = useMatrixContext();

    const [color, setColor] = useColor("#561ecb");                          //Palette
    const [colorStory,setColorStory] = useState<IColor[]>([]);              //List of color used

    const [dijkstra,setPoints] = useState(dijkstraPoints);                   //START AND END FOR MAZE
    const [isSetWall,setWalls] = useState(false);                           // WALL MODE
    const [pallinaOrientation,setPallinaOrientation] = useState(true);

    function handleLoadImage(img:string[][]){
        setColorStory(countColors(img));
        setMatrix(LoadUtils.loadImg(img));
    }

    function handleSetDijkstra(s?:number[],f?:number[]){
        if(f){
        setPoints({
            ...dijkstra, 
            FINISH_NODE_ROW: f[0],
            FINISH_NODE_COL: f[1] 
          });
        }
        if(s){
        setPoints({
            ...dijkstra, 
            START_NODE_ROW: s[0],
            START_NODE_COL: s[1]
            });
        }
    }

    const pushColor = (color:IColor) =>{
        if(colorStory.find((c)=>c.hex===color.hex)){
            return;
        }
        setColorStory([...colorStory,color]);
    }
 

////////////////////////////////////////////////////////
////////////      operations      //////////////////////
    function pushOperation(operation:OperationOnGrid){ 
        operationList.push(operation);
}
    function handlePrevState(){
        let count=0;
        while(operationList.length>0 && (count <10)){
            let lastoperation:OperationOnGrid = operationList.pop()!;
            let complexOne = lastoperation.undoOperation();
            if(complexOne.length>1){
                for(let el of complexOne)
                    setMatrix(changeMatrix(matrix,el.i,el.j,el.prevColor));//MISSING PROPERTIES
                return;
            }
            let simpleOne = complexOne[0];
            let i = simpleOne.i;
            let j = simpleOne.j
            setMatrix(changeMatrix(matrix,i,j,simpleOne.prevColor,false)) //O(10n) with map is O(n)
            count++;
        }

    }

    function handleClear(){
        setMatrix(Grid.createNodes(50,18));
        operationList=[];
    }

  return (
    <>
    <div className='container' >
        <LeftSideBar
            onClear ={()=>handleClear()}
            operationList={operationList}
            dijkstra={dijkstra}
            onPrevState ={()=>handlePrevState()}
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
        pushComplexOperation={pushOperation}
        isVertical={pallinaOrientation}
        />
        <RightSideBar  color={color} setColor={setColor} />

    </div>
    </>
  )
}
