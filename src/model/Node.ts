import { Grid } from "./Grid";

export class Node{
    //  Node values are:
    //  color : #000000 hex
    //  '' for empty
    //  'start' or 'finish' 

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
    previousNode!:Node; //undefined default //only for dijkstra

    setDefaultParam(){
        this.distance = Infinity;
        this.isVisited = false;
        // this.isWall = false;
        //@ts-ignore //"strictNullChecks": true tsconfig
        this.previousNode = null;
    }
}