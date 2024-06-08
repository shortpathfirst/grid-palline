import { Operation } from "../model/Operation";
import { OperationOnGrid } from "./OperationOnGrid";

export class dijkstraOperation implements OperationOnGrid{

    listDijkstra:Operation[] = [];

    addOperation(operation:Operation): void {
       this.listDijkstra.push(operation);
    }
    undoOperation(): void {
        throw new Error("Method not implemented.");
    }
    
}