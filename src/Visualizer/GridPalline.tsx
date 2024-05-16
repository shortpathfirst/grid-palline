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

function GridPalline() {
    // const initMatrix = () => new Grid().matrix; //To not call constructor everytime it render
    // const [matrix,setMatrix] = useState(initMatrix);

    const nodes = ()=>new Grid().nodes;
    const [matrix,setMatrix] = useState(nodes)
    const [isStart,changeStart] = useState(-1);
    const [go,setGo] = useState(false);
    const [color, setColor] = useColor("#561ecb"); //Palette
    const [colorStory,setColorStory] = useState<IColor[]>([]);
    const [eraser,setEraser] = useState(false);

    useEffect(() => {
        window.addEventListener('mouseup', ()=>setGo(false), false); 
    },[])//add listener 1 time only

    function handleHover(i:number,j:number){
        if(go){
            let copy = [...matrix];
            operations.push({i:i,j:j,color:eraser?'':color.hex,prevColor:copy[i][j].value});
            copy[i][j].value=eraser?'':color.hex;
            copy[i][j].isWall=true;
            setMatrix(copy);
        }
      
    }

    function handleRight(e:any,i:number,j:number){
        e.preventDefault();
        setGo(false);
        let copy = [...matrix]
        operations.push({i:i,j:j,color:color.hex,prevColor:copy[i][j].value});
        copy[i][j].isWall=copy[i][j].value!==color.hex?true:false; //if color i paint different than prev 
        copy[i][j].value='';
        setMatrix(copy);
    }
    function handleClick(i:number,j:number){
        if(isStart===0){
            let copy = [...matrix]
            copy[i][j].value='#01ff00';
            Grid.START_NODE_ROW = i;
            Grid.START_NODE_COL = j;
            setMatrix(copy);
            changeStart(1);
            return;
        }else if(isStart===1){
            let copy = [...matrix]
            copy[i][j].value='#fe0000';
            Grid.FINISH_NODE_ROW = i;
            Grid.FINISH_NODE_COL = j;
            setMatrix(copy);
            changeStart(-1);
            return;
        }
        setGo(true);
        if(eraser){
            let copy = [...matrix]
            operations.push({i:i,j:j,color:'',prevColor:copy[i][j].value});
            copy[i][j].value='';
            setMatrix(copy);
            return;
        }
        pushColor(color);
        let copy = [...matrix]
        operations.push({i:i,j:j,color:eraser?'':color.hex,prevColor:copy[i][j].value});
        copy[i][j].isWall=copy[i][j].value!==color.hex?true:false;//if color i paint different than prev 
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
    // let operationCopy = [...operation];
    while(operations.length>0 && (count <10)){
        let lastoperation:Operation = operations.pop()!;
        let i = lastoperation.i;
        let j = lastoperation.j
        copy[i][j].value=lastoperation.prevColor;
        count++;
    }
    // setOperation(operationCopy);
    setMatrix(copy);
   }
   function handleClear(){
    setMatrix(new Grid().nodes);
    // setOperation([]);
    operations=[];
   }
function animateDijkstra(visitedNodes:Node[],nodesInshortestPath:Node[]){
    for (let i = 0; i < visitedNodes.length; i++) {
        if (i === visitedNodes.length-1) {
          setTimeout(() => {
            animateShortestPath(nodesInshortestPath);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          const node = visitedNodes[i];
          let copy = [...matrix];
          copy[node.row][node.col].value=color.hex;
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
    const grid = [...matrix]
    const startNode = grid[Grid.START_NODE_ROW][Grid.START_NODE_COL];
    const finishNode = grid[Grid.FINISH_NODE_ROW][Grid.FINISH_NODE_COL];
    const algorithm = new Dijkstra();
    const visitedNodes = algorithm.dijkstra(grid,startNode,finishNode);
    const nodesInshortestPath = algorithm.getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodes!,nodesInshortestPath); //DO NOT FORCE !

}   

  return (
    <>
    <div className='container' key={'c'}>
        <div className='prevColorBox'>
        {
            colorStory.map((el)=>{
                return <div className='prevColor'><button className='colorBox' 
                key={`color ${el.hex}`}
                onClick={()=>setColor(el)} 
                onContextMenu={(e)=>{
                    e.preventDefault();
                    setColorStory(colorStory.filter(item => item !== el));
                }}
                style={{backgroundColor:el.hex}}>
                </button>{el.hex}</div>
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
                                onPointerUp={()=>setGo(false)}
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
            <button className='backButton' onClick={() => visualizeDijkstra()}>
            Maze game
            </button>
            <button className='backButton' onClick={() => changeStart(0)}>
             Set Start and finish
            </button>
        </div>
        </div>
        
    </div>
    </>
  )
}

export default GridPalline
