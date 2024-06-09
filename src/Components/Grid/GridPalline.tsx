import React, { useEffect, useState } from 'react'
import '../../styles/grid.css'
//  Palette
import { IColor, useColor } from "react-color-palette";
import "react-color-palette/css";
import { Grid } from '../../model/Grid';
import { Node } from '../../model/Node';
import { Dijkstra } from '../../Algorithm/Dijkstra';
import { fetchRandomImage } from "../../Service/imgService";
import {loadImg,countColors, rotateMatrix} from '../../Controller/imgUtils' 
import ColorStory from '../ColorStory/ColorStory';
import { grid } from '../../model/GridStatus';
import GridComponent from './GridComponent';
import RightSideBar from '../SideBarTools/RightSideBar';
import LeftSideBar from '../SideBarTools/LeftSideBar';
import { OperationOnGrid } from '../../Controller/OperationOnGrid';
import { dijkstraOperation } from '../../Controller/dijkstraOperation';


// import MazeGame from './Partials/MazeGame';

// const styles = {
//     sideBarHeight: {
//       height: "145vh"
//     },
//     menuIcon: {
//       float: "right",
//       margin: "10px"
//     }
//   };//use with styles.menuIcon

let operationList:OperationOnGrid[] = [];

const dijkstraPoints ={
    START_NODE_ROW : 10,
    START_NODE_COL : 15, //TO CHECK IN MATRIX
    FINISH_NODE_ROW : 10,
    FINISH_NODE_COL : 25,
}

export default function GridPalline() {

    const [matrix,setMatrix] = useState(Grid.createNodes(50,18));            //Grid matrix

    const [dijkstra,setPoints] = useState(dijkstraPoints);
    const [isSetWall,setWalls] = useState(false);
    const [gridState,setGridState] = useState(grid.draw);                   //Grid state //USE REDUCER//USE REDUCER//USE REDUCER//USE REDUCER

    const [color, setColor] = useColor("#561ecb");                          //Palette
    const [colorStory,setColorStory] = useState<IColor[]>([]);              //List of color used

    const [rightSidebarCollapsed, setRightCollapsed] = useState(true);      //Right Sidebar state
    const [fixRightSidebar,setfixRightSidebar] = useState(false);

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
    function resetParams(){
        let copy = matrix.map((row,i)=>{
            row.map((n,j)=>{
                matrix[i][j].isVisited=false;
                matrix[i][j].distance = Infinity;
                //@ts-ignore
                matrix[i][j].previousNode=undefined; //setting undefined
                matrix[i][j].isStart = false;
                matrix[i][j].isFinish = false;
                return  matrix[i][j];
            })
            return row;
        });
            setMatrix(copy);
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
////////////////////////////////////////////////////////
////////////     DIJKSTRA         //////////////////////

    function animateDijkstra(visitedNodes:Node[],nodesInshortestPath:Node[]){
        let dijkstraOperationList = new dijkstraOperation();
        for (let i = 0; i < visitedNodes.length; i++) {
            if (i === visitedNodes.length-1) { //Wait animation
                setTimeout(() => {
                    animateShortestPath(nodesInshortestPath);
                }, 10 * i);
                break;
            }
            const node = visitedNodes[i];
            setTimeout(() => {
                changeMatrix(node.row,node.col,"#aee4ac");
            }, 10 * i);
            dijkstraOperationList.addOperation({
                i:node.row,
                j:node.col,
                color:'dijkstra',
                prevColor:matrix[node.row][node.col].value});
        }
        operationList.push(dijkstraOperationList);
        resetParams();
    }
    function animateShortestPath(nodesInshortestPath:Node[]) {
        let dijkstraOperationList = new dijkstraOperation();
        for (let i = 0; i < nodesInshortestPath.length; i++) {
        const node = nodesInshortestPath[i];
        setTimeout(() => {
            changeMatrix(node.row,node.col,'#cb4d1e')
        }, 50 * i);
        dijkstraOperationList.addOperation({
            i:node.row,
            j:node.col,
            color:'dijkstra',
            prevColor:matrix[node.row][node.col].value});
        }
        operationList.push(dijkstraOperationList);
    }
    function visualizeDijkstra(){
        const startNode = matrix[dijkstra.START_NODE_ROW][dijkstra.START_NODE_COL];
        const finishNode = matrix[dijkstra.FINISH_NODE_ROW][dijkstra.FINISH_NODE_COL];
        const algorithm = new Dijkstra();
        const visitedNodes = algorithm.dijkstra(matrix,startNode,finishNode); //NEED TO RESET THE NODES OF THE MATRIX
        const nodesInshortestPath = algorithm.getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodes!,nodesInshortestPath); //DO NOT FORCE !
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

  return (
    <>
    <div className='container' >
        <LeftSideBar
            onEraser ={()=>switchEraser()}
            isEraser={gridState===grid.eraser}
            onRandomImage ={()=>getRandomImg()}
            onRotate ={() => rotateImage()}
            onClear ={()=>handleClear()}

            onDijkstra ={()=>visualizeDijkstra()}
            onChangeStart ={()=>setGridState(gridState===-1?grid.start:grid.draw)}
            onSetWalls ={()=>setWalls(!isSetWall)}

            onFloodFill ={()=>floodFill()}
            onPrevState ={()=>handlePrevState()}
            matrix={matrix}
            setMatrix={setMatrix}
            gridState={gridState}
            isWall={isSetWall}
            floodFill={gridState===grid.fill}
            ></LeftSideBar>
   

        <ColorStory colorStory={colorStory} setColorStory={setColorStory} setColor={setColor}></ColorStory>

        <GridComponent 
        matrix={matrix} 
        gridState={gridState} 
        setGridState={setGridState} 
        setMatrix={setMatrix} 
        pushColor={pushColor} 
        setPoints={setPoints} 
        color={color} 
        dijkstra={dijkstra} 
        isSetWall={isSetWall}
        pushComplexOperation={pushOperation}
        changeMatrix={changeMatrix}
        />

        <RightSideBar 
            collapsed={rightSidebarCollapsed} 
            color={color} setColor={setColor} 
            handleMouseEnter={()=>{if(!fixRightSidebar)setRightCollapsed(false)}} 
            handleMouseLeave={()=>{if(!fixRightSidebar)setRightCollapsed(true)}}
            onFixSidebar={() =>setfixRightSidebar(!fixRightSidebar)}/>

    </div>
    </>
  )
}

