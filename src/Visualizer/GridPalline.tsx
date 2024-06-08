import React, {useEffect, useState } from 'react'
import './Grid.css'
//  Palette
import { ColorPicker, IColor, useColor } from "react-color-palette";
import "react-color-palette/css";
//SideBar
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//Svgs
// import { ReactComponent as Eraser } from '../Assets/Eraser_icon.svg';
import  logo from '../Assets/Eraser_icon.svg';
//
import Pallina from './Pallina';
import { Operation } from '../model/Operation';
import { Grid } from '../model/Grid';
import { Node } from '../model/Node';
import { Dijkstra } from '../Algorithm/Dijkstra';
import { RecursiveMaze, orientation } from '../Algorithm/RecursiveMaze';
import { FloodFillAlgorithm } from '../Algorithm/FloodFillAlgorithm';
import ActionButton from './Partials/ActionButton';
//Services
import { getRandomImage } from "../Service/imgService";
import { HiMenuAlt2 } from "react-icons/hi";
// import SideBarTools from '../Components/SideBarTools/SideBarTools';

// const styles = {
//     sideBarHeight: {
//       height: "145vh"
//     },
//     menuIcon: {
//       float: "right",
//       margin: "10px"
//     }
//   };//use with styles.menuIcon

let operations:Operation[] = [];
const enum grid{
    draw=-1,
    start=0,
    finish=1,
    fill=2,
    //eraser
    //setwall
}
const dijkstraPoints ={
    START_NODE_ROW : 10,
    START_NODE_COL : 15, //TO CHECK IN MATRIX
    FINISH_NODE_ROW : 10,
    FINISH_NODE_COL : 25,
}

export default function GridPalline() {

    const [matrix,setMatrix] = useState(Grid.createNodes(50,18));   //Grid matrix
    
    //USE REDUCER
    const [dijkstra,setPoints] = useState(dijkstraPoints);
    const [isSetWall,setWalls] = useState(false);
    const [gridState,setGridState] = useState(grid.draw);              //Maze start & finish
    const [draw,setDraw] = useState(false);                         //Activate pen
    const [eraser,setEraser] = useState(false);                     //Eraser
                    //FloodFill state

    const [color, setColor] = useColor("#561ecb");                  //Palette
    const [colorStory,setColorStory] = useState<IColor[]>([]);      //List of color used
    const [collapsed, setCollapsed] = useState(true);               //Sidebar state
    const [collapsed2, setCollapsed2] = useState(false);             //Sidebar state RIGHT SIDE
    const [currentImg,setCurrentImg] = useState<string[][]>([[]])
    const [fixSidebar,setfixSidebar] = useState(false);
    useEffect(() => {
        window.addEventListener('mouseup', ()=>{setDraw(false);}, false);  //setEraser(false) ???????
    },[currentImg])//add listener 1 time only

    function getRandomImg(){
        getRandomImage().then(img => {
            setCurrentImg(img.data);
            loadImg(img.data);
         });
    }
    const loadImg = (img:string[][])=>{
        let newMatrix:Node[][]= []
        // let width = matrix[0].length > img.data[0].length ? matrix[0].length : img.data[0].length;
        // let heigth = matrix.length > img.data.length ? matrix.length : img.data.length ;
        let width = img[0].length;
        let heigth = img.length;
        for(let i=0;i<heigth;i++){
            let currentRow:Node[]= [];
            for(let j=0;j<width;j++){
                let a = new Node(i,j);
                if(i<img.length&&j<img[0].length)
                    a.value = img[i][j];
                currentRow.push(a);
            }
            newMatrix.push(currentRow);
        }
        countColors(img);
        setMatrix(newMatrix);
    }
    function countColors(img:string[][]){
        let rgbs = new Set<string>();
        for(let i=0; i<img.length;i++){
            for(let j=0; j<img[0].length; j++)
            rgbs.add( img[i][j]);   
        }
        let colorList:IColor[] = [];
        for(let value of Array.from(rgbs)){
            var convert = require('color-convert');
            let rgb = convert.hex.rgb(value);
            let hsv = convert.hex.hsv(value);

            colorList.push({hex:value,rgb:{r:rgb[0],g:rgb[1],b:rgb[2],a:1},hsv:{h:hsv[0],s:hsv[1],v:hsv[2],a:1}});
        }
        setColorStory(colorList);
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
            let isWall:boolean = (matrix[iClicked][jClicked].value===color.hex || !eraser)&& isSetWall;
            changeMatrix(iClicked,jClicked,value,isWall);
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
        if(gridState===grid.fill){
            let alg = new FloodFillAlgorithm();
            let [filledMatrix,oper] = alg.bfs(matrix.length,matrix[0].length,[...matrix],i,j,color.hex,isSetWall);
            operations = operations.concat(oper);//CONCAT OPERATION FILL THAT CONTAIN LIST OF OPERATIONS
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
        if(gridState === grid.start){
            operations.push({i:i,j:j,color:"start",prevColor:matrix[i][j].value});
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
            operations.push({i:i,j:j,color:"finish",prevColor:matrix[i][j].value});
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

        if(!eraser) pushColor(color);

        operations.push({i:i,j:j,color:eraser?'':color.hex,prevColor:matrix[i][j].value});
        let value = eraser?'':color.hex;
        let isWall = !eraser && isSetWall;
        changeMatrix(i,j,value,isWall);

    }
    const pushColor = (color:IColor) =>{
        if(colorStory.indexOf(color) === -1) {
            // setColorStory([...colorStory,color]);
            colorStory.push(color);
        }
    }
    //Clear fill and dijkstra
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
        setMatrix(Grid.createNodes(75,18));
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
            const node = visitedNodes[i];
            setTimeout(() => {
                changeMatrix(node.row,node.col,"#aee4ac");
            }, 10 * i);
            operations.push({
                i:node.row,
                j:node.col,
                color:'dijkstra',
                prevColor:matrix[node.row][node.col].value});
        }
    }
    function animateShortestPath(nodesInshortestPath:Node[]) {
        for (let i = 0; i < nodesInshortestPath.length; i++) {
        const node = nodesInshortestPath[i];
        setTimeout(() => {
            changeMatrix(node.row,node.col,'#cb4d1e')
        }, 50 * i);
        operations.push({
            i:node.row,
            j:node.col,
            color:'dijkstra',
            prevColor:matrix[node.row][node.col].value});
        }
    }
    function visualizeDijkstra(){
        const startNode = matrix[dijkstra.START_NODE_ROW][dijkstra.START_NODE_COL];
        const finishNode = matrix[dijkstra.FINISH_NODE_ROW][dijkstra.FINISH_NODE_COL];
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
        const algorithm = new RecursiveMaze(
            matrix[dijkstra.START_NODE_ROW][dijkstra.FINISH_NODE_COL],
            matrix[dijkstra.FINISH_NODE_ROW][dijkstra.FINISH_NODE_COL]);
        let copy  = [...matrix];
        algorithm.recursiveDivisionMaze(copy,2,matrix.length-2,2,matrix[0].length-3,orientation.horizontal,false,true)
        setMatrix(copy);
    }
    function addLine(){
        let newMatrix:Node[]= []

        for(let j=0;j<matrix[0].length;j++){
            let a = new Node(matrix.length,j);
            newMatrix.push(a);
        }
        setMatrix([...matrix,newMatrix]);
        // setMatrix(matrix.concat([newMatrix]));
    }
    function removeLine(){
        setMatrix(matrix.slice(0,matrix.length-1))
    }
    function addColumn(){
        let copy  = [...matrix];
        for(let i=0;i<matrix.length;i++){
            let a = new Node(i,matrix[0].length);
            copy[i].push(a);
        }
        setMatrix(copy);
        
    }
    function removeColumn(){
        let copy  = [...matrix];
        for(let i=0;i<matrix.length;i++){
            copy[i].pop();
        }
        setMatrix(copy);
    }
    function floodFill(){
        if(gridState===grid.fill)
           setGridState(grid.draw);
        else 
            setGridState(grid.fill)
    }
    function rotate(){
        let newMatrix:Node[][]= []
        if(currentImg.length>1 && matrix.length === currentImg.length){
        
            let heigth = currentImg[0].length;
            let width = currentImg.length ;     
                
            for(let i=0;i<heigth;i++){
                let currentRow:Node[]= [];
                for(let j=0;j<width;j++){
                    let a = new Node(i,j);
                    a.value = currentImg[currentImg.length-1-j][i];
                    currentRow.push(a);
                }
                newMatrix.push(currentRow);
            }
            setMatrix(newMatrix);
            return;
        }
        if(currentImg.length>1)
            loadImg(currentImg);
    
    }
    



  return (
    <>
    <div className='container' >
        {/* <SideBarTools
            onEraser ={()=>setEraser(!eraser)}
            onRandomImage ={()=>getRandomImg()}
            onRotate ={() => rotate()}
            onRemoveColumn ={() => removeColumn()}
            onAddColumn ={() => addColumn()}
            onRemoveLine ={() => removeLine()}
            onAddLine ={() => addLine()}
            onClear ={()=>handleClear()}
            onDijkstra ={()=>visualizeDijkstra()}
            onChangeStart ={()=>setGridState(gridState===-1?grid.start:grid.draw)}
            onSetWalls ={()=>setWalls(!isSetWall)}
            onVisualizeMaze ={()=>visualizeMaze()}
            onFloodFill ={()=>floodFill()}
            onPrevState ={()=>handlePrevState()}
            ></SideBarTools> */}
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar 
        className="app"  
        style={{ height: "100%", position:"fixed" }} 
        onMouseEnter={()=>setCollapsed(false)}
        onMouseLeave={()=>setCollapsed(true)}
        collapsedWidth={"70px"} 
        collapsed={collapsed}
        backgroundColor={"rgb(214, 201, 223)"}
        transitionDuration={200}
        
        >
        <main>
            <Menu>
        {collapsed ? (
              <MenuItem
                icon={<HiMenuAlt2 className="logo-burger" />}
                onClick={()=>setCollapsed(!collapsed)}
              ></MenuItem>
            ) : (
                <main style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <MenuItem
                icon={<img src={logo} alt='Eraser' width={80} height={80}/>}
                suffix={"Hello"}
                onClick={()=>setCollapsed(!collapsed)}
              >
                <div
                  style={{
                    padding: "9px",
                    fontWeight: "bold",
                    fontSize: 14,
                    letterSpacing: "1px",
                  }}
                >

                </div>
              </MenuItem>
                <SubMenu><MenuItem>One</MenuItem></SubMenu>
                <ActionButton name={"Maze game"} onAction={()=>visualizeDijkstra()} isActive={false}></ActionButton>
                <ActionButton name={"Set Start and finish"} onAction={()=>setGridState(gridState===-1?grid.start:grid.draw)} isActive={false}></ActionButton>
                <ActionButton name={"Set Walls"} onAction={()=>setWalls(!isSetWall)} isActive={false}></ActionButton>
                <ActionButton name={"MAZE"} onAction={()=>visualizeMaze()} isActive={false}></ActionButton>
                <ActionButton name={"FloodFill"} onAction={()=>floodFill()} isActive={false}></ActionButton>
                <button className='backButton'onClick={()=>handlePrevState()}>Cancel</button>
                {/* <Eraser onClick={()=>setEraser(!eraser)} width={80} height={80} style={{opacity:eraser?0.4:1}}/> */}
                <img src={logo} alt='Eraser' onClick={()=>setEraser(!eraser)} width={80} height={80} style={{opacity:eraser?0.4:1}}/>
                <button className='backButton'onClick={()=>handleClear()}>Clear</button>
    
                <button className='backButton' onClick={() => addLine()}>
                    +1
                </button>
                <button className='backButton' onClick={() => removeLine()}>
                    -1
                </button>
                <button className='backButton' onClick={() => addColumn()}>
                    +1 C
                </button>
                <button className='backButton' onClick={() => removeColumn()}>
                    -1 C
                </button>
                <button className='backButton' onClick={() => rotate()}>
                    ROTATE
                </button>
                <ActionButton name={"RandomImage"} onAction={()=>getRandomImg()} isActive={false}></ActionButton>
    
                <ActionButton name={"Eraser"} onAction={()=>setEraser(!eraser)} isActive={eraser}></ActionButton>
                </main>
            )}


        </Menu>
        </main>
      </Sidebar>
    <div className='rightSidebar'>

    </div>
    </div>
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
                                opacity={matrix[i][j].isWall || !isSetWall?1:0.4}
                                />
                            )
                        })} 
                        </div>
                    })
                }
            </div>
        }
        
        

       
        <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar className="app2"  
        style={{ height: "100%",position:"fixed",right:"0"} } //marginRight:"0px",marginLeft:"auto",float:"right",
        collapsed ={collapsed2}
        collapsedWidth={"20px"} 
        onMouseEnter={()=>{if(!fixSidebar)setCollapsed2(false)}}
        onMouseLeave={()=>{if(!fixSidebar)setCollapsed2(true)}}
        backgroundColor={"rgb(175, 157, 212, 0.235)"}
        transitionDuration={200} 
        width='550px'
        
          >
        <Menu>
        {!collapsed2 ? (
        <div className='colorPicker'>
                <ColorPicker color={color} onChange={setColor} />
                <button className='backButton' onClick={() =>setfixSidebar(!fixSidebar)}>
                    FIX
                </button>
                
        </div>
            
        ):(<MenuItem
                onClick={()=>setCollapsed2(!collapsed)}
              ></MenuItem>
              )}
            </Menu>
        </Sidebar>
        </div>
    </div>
    </>
  )
}

