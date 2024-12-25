import { Node } from "../model/Node";

export function changeMatrix(matrix:Node[][], iIndex:number,jIndex:number,value?:string,isWall?:boolean){
    let copy = matrix.map((row,i)=>{
        row.map((n,j)=>{
            if(iIndex===i && jIndex===j){
                if(value || value ==='')
                    matrix[i][j].value=value;
                
                    matrix[i][j].isWall=isWall!; //may cause error

                return  matrix[i][j]; // need to make a copy of the node
            }
            return n;
        })
        return row;
    })
    return copy;
}