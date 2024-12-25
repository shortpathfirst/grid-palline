import React from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { GiMaze } from "react-icons/gi";
import { FiPlay } from "react-icons/fi";
import { PiWallLight } from "react-icons/pi";
import { Bs1Circle } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa6";
import { FaFontAwesomeFlag } from "react-icons/fa";
import { dijkstraOperation } from '../../../Controller/dijkstraOperation';
import { Dijkstra } from '../../../Algorithm/Dijkstra';
import { useMatrixContext } from '../../../hooks/MatrixProvider';
import { changeMatrix } from '../../../Service/MatrixService';
import { useGridState } from '../../../hooks/GridStateHook';
import { grid } from '../../../model/GridStatus';

function MazeTools({
  onSetWalls,//state
  isWall,//state
  dijkstraPoints,
  operationList,
}) {
    const {matrix,setMatrix} = useMatrixContext();
    const {gridState,setGridState} = useGridState();
    const onChangeStart =()=>setGridState(gridState===-1?grid.start:grid.draw)

    const styles = {
      dijkstraColor :"#aee4ac",
      dijkstraPath : '#cb4d1e',
      WallStyle:isWall?{backgroundColor:"#9f8dc6"}:{},
      startstyle : gridState===0?<Bs1Circle />:
      gridState===1?<FaFlagCheckered />:<FaFontAwesomeFlag />,
    };

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

    function animateDijkstra(visitedNodes,nodesInshortestPath){
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
              setMatrix(changeMatrix(matrix,node.row,node.col,styles.dijkstraColor));
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
  function animateShortestPath(nodesInshortestPath) {
      let dijkstraOperationList = new dijkstraOperation();
      for (let i = 0; i < nodesInshortestPath.length; i++) {
      const node = nodesInshortestPath[i];
      setTimeout(() => {
        setMatrix(changeMatrix(matrix,node.row,node.col,styles.dijkstraPath));
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
      const startNode = matrix[dijkstraPoints.START_NODE[0]][dijkstraPoints.START_NODE[1]];
      const finishNode = matrix[dijkstraPoints.FINISH_NODE[0]][dijkstraPoints.FINISH_NODE[1]];
      const algorithm = new Dijkstra();
      const visitedNodes = algorithm.dijkstra(matrix,startNode,finishNode); //NEED TO RESET THE NODES OF THE MATRIX
      const nodesInshortestPath = algorithm.getNodesInShortestPathOrder(finishNode);
      animateDijkstra(visitedNodes,nodesInshortestPath); //DO NOT FORCE !
  }   




  return (
    <SubMenu label={"Maze Game"} icon={<GiMaze/>} defaultOpen={false} >
    <MenuItem onClick={onChangeStart}icon={styles.startstyle}>Set Start and finish</MenuItem>
    <MenuItem onClick={()=>visualizeDijkstra()} icon={<FiPlay />} > Maze</MenuItem>
    <MenuItem onClick={onSetWalls} style={styles.WallStyle} icon={<PiWallLight style={{color:"black"}}/>}>Set Walls</MenuItem>
  </SubMenu>
  )
}

export default MazeTools