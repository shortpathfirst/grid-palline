import { Operation } from "../model/Operation";
import { OperationOnGrid } from "./OperationOnGrid";


export class SimpleOperation implements OperationOnGrid{

    operation!:Operation;

    addOperation(operation:Operation): void {
        this.operation = operation
    }
    undoOperation(): void {
        throw new Error("Method not implemented.");
    }
    
}