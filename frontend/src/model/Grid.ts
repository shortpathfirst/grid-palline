import { GridNode } from "./GridNode";

export class Grid{ 
    // static readonly width = 75;
    // static readonly heigth = 18;
    
    //TO CHANGE IN NODE
    static  START_NODE_ROW = 10;
    static  START_NODE_COL = 15;
    static  FINISH_NODE_ROW = 10;
    static  FINISH_NODE_COL = 25; 
    
    static createNodes(_width?:number,_heigth?:number):GridNode[][]{
        if(!_width)
            _width=75;
        if(!_heigth)
            _heigth=18;

        let nodes:GridNode[][] =[];

        for(let i=0;i<_heigth;i++){
            let currentRow:GridNode[]= [];
            for(let j=0;j<_width;j++){
                let a = new GridNode(i,j);
                currentRow.push(a);
            }
           nodes.push(currentRow);
        }
        return nodes;

    }
    static resetNodes(matrix:GridNode[][]){
        for(let nodeRow of matrix){
            for(let node of nodeRow){
                node.setDefaultParam();
            }
        }
    }
}

