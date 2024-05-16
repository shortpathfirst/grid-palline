import { Grid } from "../model/Grid";

export interface OperationOnGrid{
    elaborate(grid:Grid):Grid;
}