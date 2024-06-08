import { Grid } from "../model/Grid";
import { Node } from "../model/Node";
import { Operation } from "../model/Operation";
export class FloodFillAlgorithm{

     
    // Function to check valid coordinate
    validCoord(x:number, y:number, n:number, m:number)
    {
        if (x < 0 || y < 0) {
            return 0;
        }
        if (x >= n || y >= m) {
            return 0;
        }
        return 1;
    }
     
    // Function to run bfs
    bfs(n:number, m:number, data:Node[][], X:number, Y:number, color:string,walls:boolean):[Node[][],Operation[]]
    {
        for(let nodeRow of data){
            for(let node of nodeRow){
                node.setDefaultParam();
            }
        }
        //Set up operations
        let operations:Operation[] = [];
        // Creating queue for bfs
        let obj = [];
         
        // Pushing pair of {x, y}
        obj.push([X, Y]);
         
        // Marking {x, y} as visited
        data[X][Y].isVisited = true;
        // Until queue is empty
        while (obj.length > 0)
        {
       
            // Extracting front pair
            let coord:any = obj[0];
            let x = coord[0];
            let y = coord[1];
            let preColor = data[x][y].value;
        
            data[x][y].value = color;
            if(walls){
                data[x][y].isWall = true;
            }
            operations.push({i:x,j:y,color:"fill",prevColor:preColor});
            // Popping front pair of queue
            obj.shift();
        
            // For Upside Pixel or Cell
            if (this.validCoord(x + 1, y, n, m) == 1
                && data[x+1][y].isVisited == false
                && data[x + 1][y].value == preColor)
            {
            obj.push([x + 1, y]);
            data[x + 1][y].isVisited = true;
            }
            
            // For Downside Pixel or Cell
            if (this.validCoord(x - 1, y, n, m) == 1
                && data[x - 1][y].isVisited == false
                && data[x - 1][y].value == preColor)
            {
            obj.push([x - 1, y]);
            data[x - 1][y].isVisited = true;
            }
            
            // For Right side Pixel or Cell
            if (this.validCoord(x, y + 1, n, m) == 1
                && data[x][y + 1].isVisited == false
                && data[x][y + 1].value == preColor)
            {
            obj.push([x, y + 1]);
            data[x][y + 1].isVisited = true;
            }
            
            // For Left side Pixel or Cell
            if (this.validCoord(x, y - 1, n, m) == 1
                && data[x][y - 1].isVisited == false
                && data[x][y - 1].value == preColor)
            {
            obj.push([x, y - 1]);
            data[x][y - 1].isVisited = true;
            }
      }
      return [data,operations];
    }

}
