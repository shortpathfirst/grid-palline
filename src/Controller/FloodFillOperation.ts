import { Operation } from "../model/Operation";
import { OperationOnGrid } from "./OperationOnGrid";

export class FloodFillOperation implements OperationOnGrid{
    operationList:Operation[] = [];

    addOperation(operation: Operation): void {
        throw new Error("Method not implemented.");
    }
    undoOperation(): Operation[] {
        return this.operationList;
    }
    addListOperations(operation:Operation[]):void{
        this.operationList = [...operation];
    }
    
}