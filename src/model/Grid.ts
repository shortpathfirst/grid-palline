import { Node } from "./Node";

export class Grid{
    static readonly width = 75;
    static readonly heigth = 18;
    static  START_NODE_ROW = 10;
    static  START_NODE_COL = 15;
    static  FINISH_NODE_ROW = 10;
    static  FINISH_NODE_COL = 25; 

    width:number = Grid.width;
    heigth:number = Grid.heigth;
    // matrix:string[][] =[[]];
    nodes:Node[][] =[];
    
    constructor(_width?:number,_heigth?:number){
        if(_width)
            this.width = _width;
        if(_heigth)
            this.heigth=_heigth;


            for(let i=0;i<this.heigth;i++){
                this.matrix[i] = Array(this.width).fill('');
                let currentRow:Node[]= [];
                for(let j=0;j<this.width;j++){
                    let a = new Node(i,j);
                    currentRow.push(a);
                }
                this.nodes.push(currentRow);
            }

    }
    get matrix():string[][]{
        let matrixString:string[][] = [];
        for(let i=0; i<this.nodes.length; i++){
            let currentRow:string[] = [];
            for(let j=0; j<this.nodes[i].length; j++){
                currentRow.push(this.nodes[i][j].value);
            }
            matrixString.push(currentRow);
        }
        return matrixString;
    }
    resetNodes(){
        for(let nodeRow of this.nodes){
            for(let node of nodeRow){
                node.setDefaultParam();
            }
        }
    }
}

