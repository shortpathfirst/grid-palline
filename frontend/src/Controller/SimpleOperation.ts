import { Operation } from "../model/Operation";
import { OperationOnGrid } from "./OperationOnGrid";


export class SimpleOperation implements OperationOnGrid{

    // operation!:Operation;
    constructor(private operation:Operation){}
    
    addOperation(operation:Operation): void {

    }
    undoOperation(): Operation[] {
        return [this.operation];
    }
    
}