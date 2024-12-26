import { GridNode } from "../../model/GridNode";

export class LoadUtils {
  /**
   * @param img String array of hex values
   * @returns a GridNode[][] Matrix the dimension of the input
   * **/
  static loadImg(img: string[][]): GridNode[][] {
    return img.map((row, i) =>
      row.map((value, j) => {
        const node = new GridNode(i, j);
        node.value = value;
        return node;
      })
    );
  }

  static loadImageFile(result: string) { //result is DATAURI
    return new Promise(resolve => {
      //Image is HTML element img
      let img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.src = result;
    })
  }
  static loadFile(file: any) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsDataURL(file);
    });
  }
}