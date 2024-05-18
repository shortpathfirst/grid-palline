import React, {useEffect, useState } from 'react'
import './Grid.css'
import { ColorPicker, IColor, useColor } from "react-color-palette";
import "react-color-palette/css";
import Pallina from './Pallina';
import { Operation } from '../model/Operation';
import { Grid } from '../model/Grid';
import { ReactComponent as Eraser } from '../Assets/Eraser_icon.svg';
import { Node } from '../model/Grid';
import { Dijkstra } from '../Algorithm/Dijkstra';

let operations:Operation[] = [];
const enum grid{
    draw=-1,
    start=0,
    finish=1,
}
function GridPalline() {

    const nodes = ()=>new Grid().nodes;                         //To not call constructor everytime it render
    const [matrix,setMatrix] = useState(nodes);                 //Grid matrix
    const [isStart,changeStart] = useState(grid.draw);          //Maze start & finish
    const [draw,setDraw] = useState(false);                     //Activate pen
    const [color, setColor] = useColor("#561ecb");              //Palette
    const [colorStory,setColorStory] = useState<IColor[]>([]);  //List of color used
    const [eraser,setEraser] = useState(false);                 //Eraser

    useEffect(() => {
        window.addEventListener('mouseup', ()=>setDraw(false), false); 
    },[])//add listener 1 time only

    function handleHover(i:number,j:number){
        if(draw){
            let copy = [...matrix];
            operations.push({
                i:i,
                j:j,
                color:eraser?'':color.hex,
                prevColor:copy[i][j].value});
            copy[i][j].value=eraser?'':color.hex;
            copy[i][j].isWall=copy[i][j].value===color.hex || !eraser?true:false;//if color i paint different than prev
            setMatrix(copy);
        }
    }

    function handleRight(e:any,i:number,j:number){
        e.preventDefault();
        setDraw(false);
        let copy = [...matrix]
        operations.push({
            i:i,
            j:j,
            color:color.hex,
            prevColor:copy[i][j].value});
            copy[i][j].isWall=copy[i][j].value===color.hex || !eraser?true:false; //if color i paint different than prev 
        copy[i][j].value='';
        setMatrix(copy);
    }
    function handleClick(i:number,j:number){
        let copy = [...matrix];
        if(isStart === grid.start){
            copy[i][j].value='#01ff00';
            Grid.START_NODE_ROW = i;
            Grid.START_NODE_COL = j;
            changeStart(grid.finish);
            setMatrix(copy);
            return;
        }
        if(isStart === grid.finish){
            copy[i][j].value='#fe0000';
            Grid.FINISH_NODE_ROW = i;
            Grid.FINISH_NODE_COL = j;
            changeStart(grid.draw);
            setMatrix(copy);
            return;
        }
        setDraw(true);
        if(!eraser) pushColor(color);
        operations.push({i:i,j:j,color:eraser?'':color.hex,prevColor:copy[i][j].value});
        copy[i][j].isWall=eraser?false:true;
        copy[i][j].value = eraser?'':color.hex;
        setMatrix(copy);
    }
    const pushColor = (color:IColor) =>{
        if(colorStory.indexOf(color) === -1) {
            setColorStory([...colorStory,color]);
        }
    }

    function handlePrevState(){
    let count=0;
    let copy = [...matrix];
    while(operations.length>0 && (count <10)){
        let lastoperation:Operation = operations.pop()!;
        let i = lastoperation.i;
        let j = lastoperation.j
        copy[i][j].value=lastoperation.prevColor;
        count++;
    }
    setMatrix(copy);
    }
    function handleClear(){
        setMatrix(new Grid().nodes);
        operations=[];
    }
    function animateDijkstra(visitedNodes:Node[],nodesInshortestPath:Node[]){
        for (let i = 0; i < visitedNodes.length; i++) {
            if (i === visitedNodes.length-1) { //Wait animation
            setTimeout(() => {
                animateShortestPath(nodesInshortestPath);
            }, 10 * i);
            return;
            }
            setTimeout(() => {
            const node = visitedNodes[i];
            let copy = [...matrix];
            copy[node.row][node.col].value="#aee4ac";
            setMatrix(copy);
            }, 10 * i);
        }

    }
    function animateShortestPath(nodesInshortestPath:Node[]) {
        for (let i = 0; i < nodesInshortestPath.length; i++) {
        setTimeout(() => {
            const node = nodesInshortestPath[i];
            let copy = [...matrix];
            copy[node.row][node.col].value='#cb4d1e';
            setMatrix(copy);
        }, 50 * i);
        }
    }
    function visualizeDijkstra(){
        const grid =matrix;
        const startNode = grid[Grid.START_NODE_ROW][Grid.START_NODE_COL];
        const finishNode = grid[Grid.FINISH_NODE_ROW][Grid.FINISH_NODE_COL];
        const algorithm = new Dijkstra();
        const visitedNodes = algorithm.dijkstra(grid,startNode,finishNode);
        const nodesInshortestPath = algorithm.getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodes!,nodesInshortestPath); //DO NOT FORCE !
        
    }   
    function addLine(){
        let width=matrix[0].length;
        let heigth=matrix.length+1;
        const init = new Grid(width,heigth);
        setMatrix(init.nodes);

    }
    function removeLine(){
    let width=matrix[0].length;
    let heigth=matrix.length-1;
    const init = new Grid(width,heigth);
    setMatrix(init.nodes);
}

  return (
    <>
    <div className='container' >
        <div className='prevColorBox'>
        {
            colorStory.map((el)=>{
                return <div key={`div ${el.hex}`} className='prevColor'><button className='colorBox' 
                key={`color ${el.hex}`}
                onClick={()=>setColor(el)} 
                onContextMenu={(e)=>{
                    e.preventDefault();
                    setColorStory(colorStory.filter(item => item !== el));
                }}
                style={{backgroundColor:el.hex}}>
                </button >{el.hex}</div>
            })
        }
        </div>
        {
            <div className='grid'>
                {   
                    matrix.map((el,i)=>{
                            
                        return <div className='rows' key={`row ${i}`}> {el.map((val,j)=>{

                            return (
                                <Pallina key={`node-${i}-${j}`}
                                row={i}
                                col={j}
                                onContextMenu={(e: any)=>{handleRight(e,i,j)}} 
                                onMouseEnter={()=>handleHover(i,j)} 
                                onPointerDown={()=>handleClick(i,j)} 
                                onPointerUp={()=>setDraw(false)}
                                color={(matrix[i][j].value==='')?'':matrix[i][j].value}
                                />
                            )
                        })} 
                        </div>
                    })
                }
            </div>
        }
        

        <div className='colorPicker'>
        <ColorPicker color={color} onChange={setColor} />
        <div className='actionButtons'>
            <button className='backButton'onClick={()=>handlePrevState()}>Cancel</button>
            <Eraser onClick={()=>setEraser(!eraser)} width={80} height={80} style={{opacity:eraser?0.4:1}}/>
            <button className='backButton'onClick={()=>handleClear()}>Clear</button>
            <button className='backButton' onClick={() =>visualizeDijkstra()}>
            Maze game
            </button>
            <button className='backButton' onClick={() => changeStart(grid.start)}>
             Set Start and finish
            </button>
            <button className='backButton' onClick={() => addLine()}>
             +1
            </button>
            <button className='backButton' onClick={() => removeLine()}>
            -1
            </button>
        </div>
        </div>
        
    </div>
    </>
  )
}

export default GridPalline;
