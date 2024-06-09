import { IColor } from "react-color-palette";
import { Node } from "../model/Node";
    export function rotateMatrix(matrix:Node[][]):Node[][]{
        let newMatrix:Node[][]= []
        let heigth = matrix[0].length;
        let width = matrix.length ;     
                
        for(let i=0;i<heigth;i++){
            let currentRow:Node[]= [];
            for(let j=0;j<width;j++){
                let a = new Node(i,j);
                a.value = matrix[matrix.length-1-j][i].value;
                currentRow.push(a);
            }
            newMatrix.push(currentRow);
        }
        
        return newMatrix;

    }
    export function rotate(currentImg:string[][]):Node[][]{
        let newMatrix:Node[][]= []
        let heigth = currentImg[0].length;
        let width = currentImg.length ;     
                
        for(let i=0;i<heigth;i++){
            let currentRow:Node[]= [];
            for(let j=0;j<width;j++){
                let a = new Node(i,j);
                a.value = currentImg[currentImg.length-1-j][i];
                currentRow.push(a);
            }
            newMatrix.push(currentRow);
        }
        
        return newMatrix;
    }

    export const loadImg = (img:string[][])=>{
        let newMatrix:Node[][]= []
        // let width = matrix[0].length > img.data[0].length ? matrix[0].length : img.data[0].length;
        // let heigth = matrix.length > img.data.length ? matrix.length : img.data.length ;
        let width = img[0].length;
        let heigth = img.length;
        for(let i=0;i<heigth;i++){
            let currentRow:Node[]= [];
            for(let j=0;j<width;j++){
                let a = new Node(i,j);
                if(i<img.length&&j<img[0].length)
                    a.value = img[i][j];
                currentRow.push(a);
            }
            newMatrix.push(currentRow);
        }
        return newMatrix;
    }
    export function countColors(img:string[][]){
        let rgbs = new Set<string>();
        for(let i=0; i<img.length;i++){
            for(let j=0; j<img[0].length; j++)
            rgbs.add( img[i][j]);   
        }
        let colorList:IColor[] = [];
        for(let value of Array.from(rgbs)){
            var convert = require('color-convert');
            let rgb = convert.hex.rgb(value);
            let hsv = convert.hex.hsv(value);

            colorList.push({hex:value,rgb:{r:rgb[0],g:rgb[1],b:rgb[2],a:1},hsv:{h:hsv[0],s:hsv[1],v:hsv[2],a:1}});
        }
        return colorList;
    }
 
