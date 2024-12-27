import { useRef, useState, useEffect } from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { LuFolderOpen } from "react-icons/lu";
import { LoadUtils } from '../../../../Controller/Utils/LoadUtils';
import { ImageUtils } from '../../../../Controller/Utils/ImageUtils';
import { BsZoomIn } from "react-icons/bs";
import { BsZoomOut } from "react-icons/bs";
// console.log(file);
// lastModified : 1717409178714
// lastModifiedDate: Mon Jun 03 2024 12:06:18 GMT+0200 (Ora legale dell’Europa centrale) {}
// name: "111910.gif"
// size: 4120
// type: "image/gif"
// webkitRelativePath: ""
type Props = {
  handleLoadImage: (arrayRGB: string[][]) => void,
}
function FileSelector({ handleLoadImage }: Props) {

  const [file, setFile] = useState<File | null>(null);
  const [maxSizeScale, setScale] = useState(75);
  const [ANTIALIASING, setAntialiasing] = useState(false);
  const [height, setHeight] = useState(120);
  const fileSelector = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasDrawRef = useRef<HTMLCanvasElement>(null);

  const style = {
    menu: file ? { display: 'flex', justifyContent: 'center', alignItems: 'center', height: height, backgroundColor: 'rgb(214, 201, 223)' }
      : { display: "none" },
    canvas_height: 120,
    canvas_width: 200,
    itemState: !file ? { display: 'none' } : undefined
  }

  const drawImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //To empty the canvas
    ctx.imageSmoothingEnabled = ANTIALIASING; //DISABLE ANTIALIASING
    let aspectRatio = img.width / img.height;
    // var hRatio = ctx.canvas.width / img.width    ;
    // var vRatio = ctx.canvas.height / img.height  ;
    // var ratio  = Math.min ( hRatio, vRatio );
    let width = Math.min(maxSizeScale, img.width);
    let height = width / aspectRatio;
    // let maxHeight = Math.min(height,maxSize.height); to crop image and avoid distortion
    if (width / aspectRatio <= height) {
      ctx.drawImage(img, 0, 0, width, width / aspectRatio)
    } else {
      ctx.drawImage(img, 0, 0, height * aspectRatio, height);
    }
    return [width, height];
  }
  const drawThumbnail = (drawCxt: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) => {
    let ratio = width / height;
    let drawHeight = Math.min(style.canvas_width / ratio, style.canvas_height);
    drawCxt.clearRect(0, 0, drawCxt.canvas.width, drawCxt.canvas.height); //To empty the canvas
    drawCxt.drawImage(img, 0, (drawCxt.canvas.height - drawHeight) / 2, style.canvas_width, drawHeight); //Draw thumbnail
  }

  const onSelectImage = () => {
    if (fileSelector.current)
      fileSelector.current.click();
  }
  const onFileChange = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    let file = event.target.files[0];
    if (!file) return;

    setFile(file);
    setScale(75); //reset Scale
    handleChange(file);
  }

  const handleChange = (file: File) => {

    let isCancel = false;
    if (!canvasRef.current || !canvasDrawRef.current) {
      return;
    }
    const drawCxt = canvasRef.current.getContext("2d")
    const ctx = canvasDrawRef.current.getContext("2d");

    // READ FILE 
    LoadUtils.loadFile(file).then((result) => {
      if (result && !isCancel) {
        //LOAD IMAGE 
        LoadUtils.loadImageFile(result).then((img) => {
          setHeight(Math.min(style.canvas_height, img.height));
          //DRAW CANVAS
          let [width, height] = drawImage(ctx!, img);
          //DRAW THUMBNAIL
          drawThumbnail(drawCxt!, img, width, height);
          let imgData = ctx!.getImageData(0, 0, width, height);
          //Convert to HEX
          let hexArray = ImageUtils.getArrayData(imgData, width);
          handleLoadImage(hexArray);
        }).catch(()=>console.error("Could not load the image"));
      }
    }).catch(()=>console.error("Could not read the file"));
  }

  const handleUpScale = () => setScale(maxSizeScale + 5); 
  const handleDownScale = () =>  setScale(maxSizeScale - 5); 
  const switchAntialiasing = () => setAntialiasing(!ANTIALIASING);

  return (
    <SubMenu label={"Image"} icon={<LuFolderOpen />} defaultOpen={true} >
      <MenuItem onClick={onSelectImage} icon={<LuFolderOpen />} >
        Select a File
        <input
          ref={fileSelector}
          type="file"
          id="file-selector"
          accept=".gif,.png,.jpg"
          style={{ display: 'none' }}
          onChange={onFileChange}
        ></input>

      </MenuItem>
      <div style={style.menu}>
        <canvas ref={canvasRef} width={style.canvas_width} height={style.canvas_height} />
        <canvas ref={canvasDrawRef} width={style.canvas_width} height={style.canvas_height} style={{ display: "none" }} />
      </div>

      <MenuItem icon={<BsZoomIn />} onClick={handleUpScale} style={style.itemState}>Upscale</MenuItem>
      <MenuItem icon={<BsZoomOut />} onClick={handleDownScale} style={style.itemState}>Downscale</MenuItem>
      <MenuItem onClick={switchAntialiasing} style={style.itemState}>ANTIALIASING</MenuItem>
    </SubMenu>


  )
}

export default FileSelector