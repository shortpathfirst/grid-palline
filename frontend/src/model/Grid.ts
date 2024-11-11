import { Node } from "./Node";

export class Grid{ 
    // static readonly width = 75;
    // static readonly heigth = 18;
    
    //TO CHANGE IN NODE
    static  START_NODE_ROW = 10;
    static  START_NODE_COL = 15;
    static  FINISH_NODE_ROW = 10;
    static  FINISH_NODE_COL = 25; 
    
    static createNodes(_width?:number,_heigth?:number):Node[][]{
        if(!_width)
            _width=75;
        if(!_heigth)
            _heigth=18;

        let nodes:Node[][] =[];

        for(let i=0;i<_heigth;i++){
            let currentRow:Node[]= [];
            for(let j=0;j<_width;j++){
                let a = new Node(i,j);
                currentRow.push(a);
            }
           nodes.push(currentRow);
        }
        return nodes;

    }
    static resetNodes(matrix:Node[][]){
        for(let nodeRow of matrix){
            for(let node of nodeRow){
                node.setDefaultParam();
            }
        }
    }
}

