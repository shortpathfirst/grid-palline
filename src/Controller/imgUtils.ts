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
    
    export function matrixToArray(matrix:Node[][]):string[][]{
        let array:string[][] = [];
        matrix.map((row,i)=>{
            let arrayRow:string[]=[];
            row.map((element,j)=>{
                return arrayRow.push(element.value);
            })
           return array.push(arrayRow);
        });
        return array;

    }
    export function arrayToImg(matrix:Node[][]):HTMLImageElement{
        // let pixels;
        // if(matrix[0][0] instanceof Node){
        //     pixels = matrixToArray(matrix);
        // }else{
        //     pixels = matrix;
        // }
        let pixelSize = 20; //PIXEL WIDTH
        let pixelSize2 = 30; //PIXEL HEIGHT
        let width =  matrix[0].length * pixelSize;     
        let height = matrix.length  * (pixelSize2);       
        let pixels = matrixToArray(matrix);

        // Create canvas
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d')!; //trycatch

        canvas.height = height; 
        canvas.width = width;

        //fill imgData with colors from array
        //IT WILL FILL THE CANVAS WITH A FLAT ARRAY USING WIDTH AS ROW LENGHT
        
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = "rgb("+0+","+0+","+0+")";
        var convert = require('color-convert');
        
        for(var i = 0; i < pixels.length; i++) { //HEIGHT
            for(var j = 0; j < pixels[0].length; j++){ //WIDTH
                // Convert pixels[i] to RGB
                // See http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
                
                let rgb = convert.hex.rgb(pixels[i][j]);
                if(!pixels[i][j].startsWith("#")){
                   rgb = convert.hex.rgb("#ffffff");
                }
                let r = rgb[0];
                let g = rgb[1];
                let b = rgb[2];
                let a = rgb[3];
                let contour = convert.hex.rgb(shadeColor(pixels[i][j],-30));
                context.globalAlpha = a; //work with images
                context.fillStyle = "rgb("+r+","+g+","+b+")";
                // context.lineWidth = 3;
                context.strokeStyle = "rgb("+contour[0]+","+contour[1]+","+contour[2]+")";
                context.beginPath();
                context.roundRect(j*pixelSize, i*pixelSize2, pixelSize, pixelSize2, [40]);
                context.fill();
                context.stroke(); 
                // context.fillRect(j*pixelSize, i*pixelSize2, pixelSize, pixelSize2);
            }
        }

        saveCanvasBlob(canvas);
        
        let img = new Image();
        img.src = canvas.toDataURL('image/png');
        canvas.remove();

        return img;
    }
    
    function saveCanvasBlob(canvas:HTMLCanvasElement){
        canvas.toBlob((blob)=>{
            const anchor = document.createElement('a');
            anchor.download = 'my-image.jpg'; // optional, but you can give the file a name
            anchor.href = URL.createObjectURL(blob!);
        
            anchor.click(); // ✨ magic!
        
            URL.revokeObjectURL(anchor.href); // remove it from memory and save on memory! 😎

          },'image/png');
    }
    function shadeColor(color:string, percent:number) {

        var R = parseInt(color.substring(1,3),16);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);
    
        R = R * (100 + percent) / 100;
        G = G * (100 + percent) / 100;
        B = B * (100 + percent) / 100;
    
        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  
    
        R = Math.round(R)
        G = Math.round(G)
        B = Math.round(B)
    
        var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
    }
    
