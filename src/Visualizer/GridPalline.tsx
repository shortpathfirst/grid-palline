import React, {useEffect, useState } from 'react'
import './Grid.css'
import { ColorPicker, IColor, useColor } from "react-color-palette";
import "react-color-palette/css";
import Pallina from './Pallina';
import { Operation } from '../model/Operation';
import { Grid } from '../model/Grid';
// import { ReactComponent as Eraser } from '../Assets/Eraser_icon.svg';
import  logo from '../Assets/Eraser_icon.svg';
import { Node } from '../model/Node';
import { Dijkstra } from '../Algorithm/Dijkstra';
import { RecursiveMaze, orientation } from '../Algorithm/RecursiveMaze';
import { FloodFillAlgorithm } from '../Algorithm/FloodFillAlgorithm';
import ActionButton from './Partials/ActionButton';
import { getRandomImage } from "../Service/imgService";

let operations:Operation[] = [];
const enum grid{
    draw=-1,
    start=0,
    finish=1,
}
export default function GridPalline() {

    const nodes = ()=>new Grid().nodes;                         //To not call constructor everytime it render
    const [matrix,setMatrix] = useState(nodes);                 //Grid matrix
    const [isStart,changeStart] = useState(grid.draw);          //Maze start & finish
    const [draw,setDraw] = useState(false);                     //Activate pen
    const [color, setColor] = useColor("#561ecb");              //Palette
    const [colorStory,setColorStory] = useState<IColor[]>([]);  //List of color used
    const [eraser,setEraser] = useState(false);                 //Eraser
    const [fill,setFill] = useState(false);                     //FloodFill state

    useEffect(() => {
        window.addEventListener('mouseup', ()=>{setDraw(false);}, false);  //setEraser(false) ???????
    },[])//add listener 1 time only

    function getRandomImg(){
        getRandomImage().then(img => {
            let newMatrix:Node[][]= []
            for(let i=0;i<Grid.heigth;i++){
                let currentRow:Node[]= [];
                for(let j=0;j<Grid.width;j++){
                    let a = new Node(i,j);
                    a.value = img.data[i][j];
                    currentRow.push(a);
                }
                newMatrix.push(currentRow);
            }
            setMatrix(newMatrix);
         });
    }

    function changeMatrix(iIndex:number,jIndex:number,value?:string,isWall?:boolean,isVisited?:boolean,previousNode?:Node){
        let copy = matrix.map((row,i)=>{
            row.map((n,j)=>{
                if(iIndex===i && jIndex===j){
                    if(value || value ==='')
                        matrix[i][j].value=value;
                    if(!!isWall)
                        matrix[i][j].isWall=isWall;
                    if(!!isVisited)
                        matrix[i][j].isVisited=isVisited;
                    if(previousNode)
                        matrix[i][j].previousNode=previousNode;

                    return  matrix[i][j]; // need to make a copy of the node
                }
                return n;
            })
            return row;
        })
        setMatrix(copy);
    }
    function handleHover(iClicked:number,jClicked:number){
        if(draw){
            operations.push({
                i:iClicked,
                j:jClicked,
                color:eraser?'':color.hex,
                prevColor:matrix[iClicked][jClicked].value});
            let value:string = eraser?'':color.hex;
            let isWall:boolean = matrix[iClicked][jClicked].value===color.hex || !eraser?true:false;//if color i paint different than prev
            changeMatrix(iClicked,jClicked,value,isWall)
        }
    }

    function handleRight(e:Event,i:number,j:number){
        e.preventDefault();
        setDraw(false);

        operations.push({
            i:i,
            j:j,
            color:'',
            prevColor:matrix[i][j].value});

        changeMatrix(i,j,'',false)
    }
    function handleClick(e:any,i:number,j:number){
        if(fill){
            let alg = new FloodFillAlgorithm();
            let [filledMatrix,oper] = alg.bfs(matrix.length,matrix[0].length,[...matrix],i,j,color.hex);
            operations = operations.concat(oper);
            pushColor(color);
            setMatrix(filledMatrix)
            return;
        }
        if(operations.length>0 && operations[operations.length-1].color ==="dijkstra"){ //pop operation untill !=
            clear("dijkstra");
            return;
        }
        if(e.button === 2){ //if Eraser
             setEraser(true);
        }
        if(isStart === grid.start){
            operations.push({i:i,j:j,color:"start",prevColor:matrix[i][j].value});
            changeMatrix(i,j,'#01ff00')
            Grid.START_NODE_ROW = i; //NON VIENE SALVATO IN NESSUN OSTATO CAMBIA METODO STATICO
            Grid.START_NODE_COL = j;
            changeStart(grid.finish);
            return;
        }
        if(isStart === grid.finish){
            operations.push({i:i,j:j,color:"finish",prevColor:matrix[i][j].value});
            changeMatrix(i,j,'#fe0000')
            Grid.FINISH_NODE_ROW = i;
            Grid.FINISH_NODE_COL = j;
            changeStart(grid.draw);
            return;
        }
        setDraw(true);

        if(!eraser) pushColor(color);

        operations.push({i:i,j:j,color:eraser?'':color.hex,prevColor:matrix[i][j].value});
        let value = eraser?'':color.hex;
        let isWall = eraser?false:true;
        changeMatrix(i,j,value,isWall);

    }
    const pushColor = (color:IColor) =>{
        if(colorStory.indexOf(color) === -1) {
            setColorStory([...colorStory,color]);
        }
    }
    function clear(name:string){ 
        while(operations.length>0 && operations[operations.length-1].color ===name){
            let lastoperation:Operation = operations.pop()!;
            let i = lastoperation.i;
            let j = lastoperation.j
            changeMatrix(i,j,lastoperation.prevColor);
        }
    }

    function handlePrevState(){
        let count=0;
        while(operations.length>0 && (count <10)){
            if(operations[operations.length-1].color === 'fill'){
                clear('fill');
                continue;
            }
            let lastoperation:Operation = operations.pop()!;
            let i = lastoperation.i;
            let j = lastoperation.j
            changeMatrix(i,j,lastoperation.prevColor) //O(10n) with map is O(n)
            count++;
        }

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

            operations.push({
                i:node.row,
                j:node.col,
                color:'dijkstra',
                prevColor:matrix[node.row][node.col].value});

            changeMatrix(node.row,node.col,"#aee4ac");
            }, 10 * i);
        }

    }
    function animateShortestPath(nodesInshortestPath:Node[]) {
        for (let i = 0; i < nodesInshortestPath.length; i++) {
        setTimeout(() => {
            const node = nodesInshortestPath[i];

            operations.push({
                i:node.row,
                j:node.col,
                color:'dijkstra',
                prevColor:matrix[node.row][node.col].value});

            changeMatrix(node.row,node.col,'#cb4d1e')
        }, 50 * i);
        }
    }
    function visualizeDijkstra(){
        const startNode = matrix[Grid.START_NODE_ROW][Grid.START_NODE_COL];
        const finishNode = matrix[Grid.FINISH_NODE_ROW][Grid.FINISH_NODE_COL];
        const algorithm = new Dijkstra();
        const visitedNodes = algorithm.dijkstra(matrix,startNode,finishNode); //NEED TO RESET THE NODES OF THE MATRIX
        const nodesInshortestPath = algorithm.getNodesInShortestPathOrder(finishNode);
        clear("dijkstra");
        animateDijkstra(visitedNodes!,nodesInshortestPath); //DO NOT FORCE !

    }   
    /////////////////
    ///     MAZE
    /////////////////
    function visualizeMaze(){
        // for(let i=0; i<matrix.length; i++){
        //     for(let j=0; j<matrix[0].length; j++){
        //         matrix[i][j].setDefaultParam();
        //     }
        // }
        const algorithm = new RecursiveMaze(matrix[Grid.START_NODE_ROW][Grid.START_NODE_COL],matrix[Grid.FINISH_NODE_ROW][Grid.FINISH_NODE_COL]);
        let copy  = [...matrix];
        algorithm.recursiveDivisionMaze(copy,2,matrix.length-2,2,matrix[0].length-3,orientation.horizontal,false,true)
        setMatrix(copy);
    }
    function addLine(){
        let width=matrix[0].length;
        let heigth=matrix.length+1;
        const init = new Grid(width,heigth);
        for(let i=0; i<matrix.length; i++){
            for(let j=0; j<matrix[0].length; j++){
                init.nodes[i][j] = JSON.parse(JSON.stringify(matrix[i][j]));
            }
        }
        setMatrix(init.nodes);

    }
    function removeLine(){
        let width=matrix[0].length;
        let heigth=matrix.length-1;
        const init = new Grid(width,heigth);
        for(let i=0; i<heigth; i++){
            for(let j=0; j<width; j++){
                init.nodes[i][j] = JSON.parse(JSON.stringify(matrix[i][j]));
            }
        }
        setMatrix(init.nodes);
    }
    function floodFill(){
        setFill(!fill);
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
                                onContextMenu={(e:any)=>{handleRight(e,i,j)}} 
                                onMouseEnter={()=>handleHover(i,j)} 
                                onPointerDown={(e:any)=>handleClick(e,i,j)} 
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
            {/* <Eraser onClick={()=>setEraser(!eraser)} width={80} height={80} style={{opacity:eraser?0.4:1}}/> */}
            <img src={logo} alt='Eraser' onClick={()=>setEraser(!eraser)} width={80} height={80} style={{opacity:eraser?0.4:1}}/>
            <button className='backButton'onClick={()=>handleClear()}>Clear</button>

            <button className='backButton' onClick={() => addLine()}>
             +1
            </button>
            <ActionButton name={"RandomImage"} onAction={()=>getRandomImg()} isActive={false}></ActionButton>

            <ActionButton name={"Eraser"} onAction={()=>setEraser(!eraser)} isActive={eraser}></ActionButton>
            
        </div>
        </div>

        <ActionButton name={"Maze game"} onAction={()=>visualizeDijkstra()} isActive={false}></ActionButton>
        <ActionButton name={"Set Start and finish"} onAction={()=>changeStart(grid.start)} isActive={false}></ActionButton>
        <ActionButton name={"MAZE"} onAction={()=>visualizeMaze()} isActive={false}></ActionButton>
        <ActionButton name={"FloodFill"} onAction={()=>floodFill()} isActive={false}></ActionButton>

    </div>
    </>
  )
}

