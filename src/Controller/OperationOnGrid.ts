import { Operation } from "../model/Operation";

export interface OperationOnGrid{
    addOperation(operation:Operation):void;
    undoOperation():Operation[];
}