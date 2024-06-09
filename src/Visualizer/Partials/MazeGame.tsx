import React from 'react'
import { Node } from '../../model/Node';
import { Operation } from '../../model/Operation';
import { Dijkstra } from '../../Algorithm/Dijkstra';

let operations:Operation[] = []; //MAKE IT HANDLER PUSH OPERATION

function MazeGame({matrix,changeMatrix,dijkstraPoints}:{matrix:Node[][],changeMatrix:Function,dijkstraPoints:any}) {

    
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
        const startNode = matrix[dijkstraPoints.START_NODE_ROW][dijkstraPoints.START_NODE_COL];
        const finishNode = matrix[dijkstraPoints.FINISH_NODE_ROW][dijkstraPoints.FINISH_NODE_COL];
        const algorithm = new Dijkstra();
        const visitedNodes = algorithm.dijkstra(matrix,startNode,finishNode); //NEED TO RESET THE NODES OF THE MATRIX
        const nodesInshortestPath = algorithm.getNodesInShortestPathOrder(finishNode);
        // clear("dijkstra");
        animateDijkstra(visitedNodes!,nodesInshortestPath); //DO NOT FORCE !

    }   
    /////////////////
    ///     MAZE
    /////////////////
    // function visualizeMaze(){
    //     // for(let i=0; i<matrix.length; i++){
    //     //     for(let j=0; j<matrix[0].length; j++){
    //     //         matrix[i][j].setDefaultParam();
    //     //     }
    //     // }
    //     const algorithm = new RecursiveMaze(
    //         matrix[dijkstraPoints.START_NODE_ROW][dijkstraPoints.FINISH_NODE_COL],
    //         matrix[dijkstraPoints.FINISH_NODE_ROW][dijkstraPoints.FINISH_NODE_COL]);
    //     let copy  = [...matrix];
    //     algorithm.recursiveDivisionMaze(copy,2,matrix.length-2,2,matrix[0].length-3,orientation.horizontal,false,true)
    //     // setMatrix(copy);
    // }

  return (<></>
    // <ActionButton name={"Maze game"} onAction={()=>visualizeDijkstra()} isActive={false}></ActionButton>
  )
}

export default MazeGame