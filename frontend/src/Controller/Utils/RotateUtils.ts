import { GridNode } from "../../model/GridNode";
export class RotateUtils{


 static rotateMatrix(matrix:GridNode[][]):GridNode[][]{
    let newMatrix:GridNode[][]= []
    let heigth = matrix[0].length;
    let width = matrix.length ;     
            
    for(let i=0;i<heigth;i++){
        let currentRow:GridNode[]= [];
        for(let j=0;j<width;j++){
            let newNode = new GridNode(i,j);
            newNode.value = matrix[matrix.length-1-j][i].value;
            currentRow.push(newNode);
        }
        newMatrix.push(currentRow);
    }
    
    return newMatrix;

}

    //SWAP IN PLACE
    static smartRotate(matrix:GridNode[][]):void{

        let n = matrix.length;
        //Transpose
        for(let i=0; i < n; i++){
            for(let j=i+1; j<n; j++){
                [matrix[i][j].value,matrix[j][i].value] =[matrix[j][i].value,matrix[i][j].value];

            }
        }
        //Reflection
        for(let i=0; i < n; i++){
            for(let j=0; j<n/2; j++){
                [matrix[i][j].value,matrix[i][n-j-1].value] =[matrix[i][n-j-1].value,matrix[i][j].value];
            }
        }

    }
}