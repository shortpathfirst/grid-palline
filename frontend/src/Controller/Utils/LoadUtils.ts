import { GridNode } from "../../model/GridNode";

export class LoadUtils{
    /**
     * @param img String array of hex values
     * @returns a Node[][] Matrix the dimension of the input
     * **/
    static loadImg(img:string[][]){
        let newMatrix:GridNode[][]= []
        // let width = matrix[0].length > img.data[0].length ? matrix[0].length : img.data[0].length;
        // let heigth = matrix.length > img.data.length ? matrix.length : img.data.length ;
        let width = img[0].length;
        let heigth = img.length;
        for(let i=0;i<heigth;i++){
            let currentRow:GridNode[]= [];
            for(let j=0;j<width;j++){
                let a = new GridNode(i,j);
                if(i<img.length&&j<img[0].length)
                    a.value = img[i][j];
                currentRow.push(a);
            }
            newMatrix.push(currentRow);
        }
        return newMatrix;
    }

    static loadImageFile (result: string){ //result is DATAURI
        return new Promise(resolve =>{
          let img = new Image();      //Image is HTML element img
          img.onload = () => { //wait for the image to load
            resolve(img);
          };
          img.src = result;
        })
      }
     static loadFile(file: any) { 
        return new Promise((resolve,reject) =>{
          let fileReader = new FileReader();    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = reject;
          fileReader.readAsDataURL(file);
        });
      }
}