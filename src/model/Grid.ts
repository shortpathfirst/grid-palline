export class Grid{
    private static readonly width = 64;
    private static readonly heigth = 20;
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
            // this.matrix[i] = Array(this.width).fill('');
            let currentRow:Node[]= [];
            for(let j=0;j<this.width;j++){
                currentRow.push(new Node(i,j));
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
}
export class Node{
    
    row: number;
    col: number;

    constructor(private _row:number,private _col:number){
        this.row = _row;
        this.col = _col;
    }
    
    value:string = '';
    isStart:boolean = this._row === Grid.START_NODE_ROW && this._col === Grid.START_NODE_COL;
    isFinish:boolean = this._row === Grid.FINISH_NODE_ROW && this._col === Grid.FINISH_NODE_COL;
    distance:number=Infinity;
    isVisited:boolean= false;
    isWall:boolean = false; 
    previousNode!:Node; //undefined default
}