import { rgbToHEX } from "./hexToRGBA";

export class ImageUtils{

    /**
     * 
     * @param imgData ImageData from the canvas context
     * @param width Width of the canvas
     * @returns An array of HEX
     */
    static getArrayData = (imgData:ImageData,width:number) =>{

        let rgbArray =[];
        let rowValue =[];
        for (var i = 0, n = 0; i < imgData.data.length; i+=4, n++) {
          if(n%(+width.toFixed(0)) === 0 && n!==0){ //make 2d every row lenght
            rgbArray.push(rowValue);
             rowValue = [];
           }
            let red = imgData.data[i];
            let green = imgData.data[i+1];
            let blue = imgData.data[i+2];
            let value = rgbToHEX(+red,+green,+blue);
            rowValue.push(value);
            
          // imgData.data[i+3] is the alpha channel. We ignore it. 
        }
        return rgbArray;
      }
}