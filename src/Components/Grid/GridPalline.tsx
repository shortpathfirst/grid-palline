import React, { useEffect, useState } from 'react'
import '../../styles/grid.css'

import { IColor, useColor } from "react-color-palette";
import "react-color-palette/css";
import { Grid } from '../../model/Grid';
import { fetchRandomImage } from "../../Service/imgService";
import {loadImg,countColors, rotateMatrix} from '../../Controller/imgUtils';
import ColorStory from '../ColorStory/ColorStory';
import { grid } from '../../model/GridStatus';
import GridComponent from './GridComponent';
import RightSideBar from '../SideBarTools/RightSideBar';
import LeftSideBar from '../SideBarTools/LeftSideBar';
import { OperationOnGrid } from '../../Controller/OperationOnGrid';
import { Node } from '../../model/Node';

let operationList:OperationOnGrid[] = [];

const dijkstraPoints ={
    START_NODE_ROW : 10,
    START_NODE_COL : 15, //TO CHECK IN MATRIX
    FINISH_NODE_ROW : 10,
    FINISH_NODE_COL : 25,
}

export default function GridPalline() {

    const [matrix,setMatrix] = useState(Grid.createNodes(50,18));            //Grid matrix

    const [dijkstra,setPoints] = useState(dijkstraPoints);                   //START AND END FOR MAZE
    const [isSetWall,setWalls] = useState(false);                           // WALL MODE
    const [gridState,setGridState] = useState(grid.draw);                   //Grid state 

    const [color, setColor] = useColor("#561ecb");                          //Palette
    const [colorStory,setColorStory] = useState<IColor[]>([]);              //List of color used
    const [currentImg,setCurrentImg] = useState<string[][]>([[]])

    useEffect(() => {
    },[currentImg])//add listener 1 time only

    function getRandomImg(){
        fetchRandomImage().then(img => {
            setCurrentImg(img.data);
            setColorStory(countColors(img.data));
            setMatrix(loadImg(img.data));
         });
    }

    function changeMatrix(iIndex:number,jIndex:number,value?:string,isWall?:boolean){
        let copy = matrix.map((row,i)=>{
            row.map((n,j)=>{
                if(iIndex===i && jIndex===j){
                    if(value || value ==='')
                        matrix[i][j].value=value;
                    if(!!isWall)
                        matrix[i][j].isWall=isWall;

                    return  matrix[i][j]; // need to make a copy of the node
                }
                return n;
            })
            return row;
        })
        setMatrix(copy);
    }

    const pushColor = (color:IColor) =>{
        if(colorStory.find((c)=>c.hex===color.hex)){
            return;
        }
        setColorStory([...colorStory,color]);
    }
    function rotateImage(){
        setMatrix(rotateMatrix(matrix));
    }
    function floodFill(){
        if(gridState === grid.fill)
            setGridState(grid.draw)
        else
            setGridState(grid.fill)
    }
    function switchEraser(){
        if(gridState === grid.eraser){
            setGridState(grid.draw)

        }
        else{
            setGridState(grid.eraser)
        }
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
                    changeMatrix(el.i,el.j,el.prevColor);//MISSING PROPERTIES
                return;
            }
            let simpleOne = complexOne[0];
            let i = simpleOne.i;
            let j = simpleOne.j
            changeMatrix(i,j,simpleOne.prevColor) //O(10n) with map is O(n)
            count++;
        }

    }

    function handleClear(){
        setMatrix(Grid.createNodes(50,18));
        operationList=[];
    }

    const handlerMatrixState = (data:Node[][]) => {
        setMatrix(data);
    }
    const handlerStartingDijkstra = (points:any)=>{
        setPoints(points);
    }
  return (
    <>
    <div className='container' >
        <LeftSideBar
            onEraser ={()=>switchEraser()}
            isEraser={gridState===grid.eraser}
            onRandomImage ={()=>getRandomImg()}
            onRotate ={() => rotateImage()}
            onClear ={()=>handleClear()}
            operationList={operationList}
            changeMatrix={changeMatrix}
            dijkstra={dijkstra}
            onFloodFill ={()=>floodFill()}
            onPrevState ={()=>handlePrevState()}
            matrix={matrix}
            setMatrix={handlerMatrixState}
            onSetWalls ={()=>setWalls(!isSetWall)}
            onChangeStart ={()=>setGridState(gridState===-1?grid.start:grid.draw)}
            gridState={gridState}
            isWall={isSetWall}
            floodFill={gridState===grid.fill}
            ></LeftSideBar>
   

        <ColorStory colorStory={colorStory} setColorStory={setColorStory} setColor={setColor}></ColorStory>

        <GridComponent 
        matrix={matrix} 
        setMatrix={handlerMatrixState} 
        gridState={gridState} 
        setGridState={setGridState} 
        pushColor={pushColor} 
        color={color} 
        dijkstra={dijkstra} 
        setPoints={handlerStartingDijkstra} 
        isSetWall={isSetWall}
        pushComplexOperation={pushOperation}
        changeMatrix={changeMatrix}
        />

        <RightSideBar  color={color} setColor={setColor} />

    </div>
    </>
  )
}

