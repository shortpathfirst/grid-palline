import { Node } from "../model/Node"
export class RecursiveMaze{
    // // Write the color of the maze inside the node
    // // mark it as Wall
    // constructor(public start:Node,public finish:Node){
        
    // }
    // maze(){ return undefined}

    // recursiveDivisionMaze(
    //     board:Node[][],
    //     rowStart:number, rowEnd:number, 
    //     colStart:number, colEnd:number, 
    //     orient:orientation, surroundingWalls:boolean, 
    //     isWall:boolean){

    //     if (rowEnd < rowStart || colEnd < colStart) {
    //         return;
    //     }
    //     if(!surroundingWalls){
    //         // let relevantIds = [this.start, this.finish ]
    //         board.map((row,i)=>{
    //             row.map((node,j)=>{
    //                 // if(!relevantIds.includes(node)){
    //                     if (i === 0 || j === 0 || i === board.length - 1 || j === board[0].length - 1) {
    //                         // board.wallsToAnimate.push(currentHTMLNode);
    //                         if (isWall) {
    //                             node.isWall = true;
    //                             node.value = "#2b3456"
    //                             node.distance = 0;
    //                           } else {
    //                             node.isVisited = false;
    //                             node.distance = 15;
    //                           }
    //                     }
    //                 // }
    //             })
    //         });
    //         surroundingWalls = true;
    //     }
    //     if(orient ===orientation.horizontal){
    //         let possibleRows = [];
    //         for (let number = rowStart; number <= rowEnd; number += 2) {
    //             possibleRows.push(number);
    //         }
    //         let possibleCols = [];
    //         for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
    //             possibleCols.push(number);
    //         }
    //         let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    //         let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    //         let currentRow = possibleRows[randomRowIndex];
    //         let colRandom = possibleCols[randomColIndex];
    //         board.map((row,i)=>{
    //             row.map((node,j)=>{
                    
    //                 if (i === currentRow && j !== colRandom && j >= colStart - 1 && j <= colEnd + 1)  {
    //                     // board.wallsToAnimate.push(currentHTMLNode);
    //                     if(node.value !== "start" && node.value !== "end")
    //                         if (isWall) {
    //                             node.isWall = true;
    //                             node.value = "#2b3456"
    //                             node.distance = 0;
    //                             } else {
    //                                 node.isVisited = false;
    //                                 node.distance = 15;
    //                         }
    //                 }
                    
    //             });
    //         });
     
    //         if (currentRow - 2 - rowStart > colEnd - colStart) {
    //         this.recursiveDivisionMaze(board, rowStart, currentRow - 2, colStart, colEnd, orient, surroundingWalls, isWall);
    //         } else {
    //         this.recursiveDivisionMaze(board, rowStart, currentRow - 2, colStart, colEnd, orientation.vertical, surroundingWalls, isWall);
    //         }
    //         if (rowEnd - (currentRow + 2) > colEnd - colStart) {
    //         this.recursiveDivisionMaze(board, currentRow + 2, rowEnd, colStart, colEnd, orient, surroundingWalls, isWall);
    //         } else {
    //         this.recursiveDivisionMaze(board, currentRow + 2, rowEnd, colStart, colEnd, orientation.vertical, surroundingWalls, isWall);
    //         }
            
    //     }else{
    //         let possibleRows = [];
    //         for (let number = colStart; number <= colEnd; number += 2) {
    //             possibleRows.push(number);
    //         }
    //         let possibleCols = [];
    //         for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
    //             possibleCols.push(number);
    //         }
    //         let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    //         let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    //         let currentCol = possibleCols[randomColIndex];
    //         let rowRandom = possibleRows[randomRowIndex];
    //         board.map((row,i)=>{
    //             row.map((node,j)=>{
                    
    //                 if (j === currentCol && i !== rowRandom && i >= rowStart - 1 && i <= rowEnd + 1)  {
    //                     // board.wallsToAnimate.push(currentHTMLNode);
    //                     if(node.value !== "start" && node.value !== "end")
    //                         if (isWall) {
    //                             node.isWall = true;
    //                             node.value = "#2b3456"
    //                             node.distance = 0;
    //                             } else {
    //                                 node.isVisited = false;
    //                                 node.distance = 15;
    //                         }
    //                 }
                    
    //             });
    //         });
     
    //         if (rowEnd - rowStart > currentCol - 2 - colStart) {
    //             this.recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currentCol - 2, orientation.horizontal, surroundingWalls, isWall);
    //         } else {
    //             this.recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currentCol - 2, orient, surroundingWalls, isWall);
    //         }
    //         if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
    //             this.recursiveDivisionMaze(board, rowStart, rowEnd, currentCol + 2, colEnd, orientation.horizontal, surroundingWalls, isWall);
    //         } else {
    //             this.recursiveDivisionMaze(board, rowStart, rowEnd, currentCol + 2, colEnd, orient, surroundingWalls, isWall);
    //         }
    //     }


    // }
   
}
// export enum orientation{
//     vertical="vertical",
//     horizontal="horizontal"
// }