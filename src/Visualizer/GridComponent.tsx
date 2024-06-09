import React, { useEffect, useState } from 'react'
import { Operation } from '../model/Operation';
import { IColor } from 'react-color-palette';
import { Node } from '../model/Node';
import { grid } from '../model/GridStatus';
import { FloodFillAlgorithm } from '../Algorithm/FloodFillAlgorithm';
import Pallina from './Pallina';
import { SimpleOperation } from '../gridController/SimpleOperation';
import { FloodFillOperation } from '../gridController/FloodFillOperation';


interface GridProps{
    matrix:Node[][];    //MATRIX
    gridState:grid;     //state
    color:IColor;       //Color to use
    dijkstra:any;       //dijkstra operating the grid   <-----
    isSetWall:boolean;  //Setting walls

    setGridState:Function;  //Make it handler
    setMatrix:Function;     //For fill matrix
    changeMatrix:Function; 
    pushColor:Function;     //use callback
    setPoints:Function;     //use callback
    pushComplexOperation:Function;  //use callback
    
}

function GridComponent({matrix,gridState,setGridState,setMatrix,pushColor,setPoints,pushComplexOperation,color,dijkstra,isSetWall,changeMatrix}:GridProps) {
    const [draw,setDraw] = useState(false);           //Activate pen mouse up and mouse down

    useEffect(() => {
        window.addEventListener('mouseup', ()=>{setDraw(false);}, false);
    },[])//add listener 1 time only

    function addSimpleOperation(operation:Operation){
        let myOperation = new SimpleOperation(operation);
        pushComplexOperation(myOperation);
    }

    function handleClick(e:any,i:number,j:number){
        if(gridState===grid.fill){
            let alg = new FloodFillAlgorithm();
            let [filledMatrix,oper] = alg.bfs(matrix.length,matrix[0].length,[...matrix],i,j,color.hex,isSetWall);

            let complexOperation = new FloodFillOperation();
            complexOperation.addListOperations(oper);
            pushComplexOperation(complexOperation);

            pushColor(color);
            setMatrix(filledMatrix);
            return;
        }
        if(e.button === 2){ //if RIGHT CLICK
            setGridState(grid.eraser);
        }
        if(gridState === grid.start){
            addSimpleOperation({i:i,j:j,color:"start",prevColor:matrix[i][j].value});
            changeMatrix(i,j,'#01ff00')
            setPoints({
                ...dijkstra, 
                START_NODE_ROW:i,
                START_NODE_COL: j 
              });
            setGridState(grid.finish);
            return;
        }
        if(gridState === grid.finish){
            addSimpleOperation({i:i,j:j,color:"finish",prevColor:matrix[i][j].value});
            changeMatrix(i,j,'#fe0000')
            setPoints({
                ...dijkstra, 
                FINISH_NODE_ROW:i,
                FINISH_NODE_COL: j 
              });
            setGridState(grid.draw);
            return;
        }
        setDraw(true);

        if(gridState === grid.draw) pushColor(color);

        addSimpleOperation({i:i,j:j,color:gridState === grid.eraser?'':color.hex,prevColor:matrix[i][j].value});
        let value = gridState === grid.eraser?'':color.hex;
        let isWall = gridState === grid.draw && isSetWall;
        changeMatrix(i,j,value,isWall);

    }

    
    function handleRight(e:Event,i:number,j:number){
        e.preventDefault();
        setDraw(false);
        addSimpleOperation({
            i:i,
            j:j,
            color:'',
            prevColor:matrix[i][j].value})

        changeMatrix(i,j,'',false)
    }

    function handleHover(iClicked:number,jClicked:number){
        if(draw){
            addSimpleOperation({
                i:iClicked, 
                j:jClicked,
                color:gridState === grid.eraser?'':color.hex,
                prevColor:matrix[iClicked][jClicked].value});

            let value:string = gridState === grid.eraser?'':color.hex;
            let isWall:boolean = (matrix[iClicked][jClicked].value===color.hex || gridState === grid.draw)&& isSetWall;
            changeMatrix(iClicked,jClicked,value,isWall);
        }   
    }

  return (
    <div className='grid'>
        {   
            matrix.map((el,i)=>{
                    
                return <div className='rows' key={`row ${i}`}> {el.map((val,j)=>{

                    return (
                        <Pallina key={`node-${i}-${j}`}
                        row={i}
                        col={j}
                        onContextMenu={(e:any)=>{handleRight(e,i,j)}} 
                        onMouseEnter={()=>handleHover(i,j)} 
                        onPointerDown={(e:any)=>handleClick(e,i,j)} 
                        onPointerUp={()=>setDraw(false)}
                        color={(matrix[i][j].value==='')?'':matrix[i][j].value}
                        opacity={matrix[i][j].isWall || !isSetWall?1:0.4}
                        />
                    )
                })} 
                </div>
            })
        }
    </div>
  )
}

export default GridComponent
