import { Grid } from "../model/Grid";
import { OperationOnGrid } from "./OperationOnGrid";

export class ReverseGrid implements OperationOnGrid{
    elaborate(grid: Grid): Grid {
        return new Grid();
    }

}