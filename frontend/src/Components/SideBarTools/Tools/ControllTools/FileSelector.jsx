import React , { useRef,useState,useEffect, createElement} from 'react'
import { MenuItem,SubMenu } from 'react-pro-sidebar';
import { LuFolderOpen } from "react-icons/lu";
import { LoadUtils } from '../../../../Controller/Utils/LoadUtils';
import { ImageUtils } from '../../../../Controller/Utils/ImageUtils';
import { BsZoomIn } from "react-icons/bs";
import { BsZoomOut } from "react-icons/bs";

function FileSelector({handleLoadImage}) {

    const [file, setFile] = useState(null);
    const [maxSizeScale,setScale] = useState(75);
    const [ANTIALIASING,setAntialiasing] = useState(false);
    const [height,setHeight] = useState(120);
    const fileSelector =useRef(null);
    const canvasRef = useRef(null);
    const canvasDrawRef = useRef(null);
    
    const style ={
      menu:file?{display:'flex',justifyContent:'center',alignItems:'center',height:height,backgroundColor:'rgb(214, 201, 223)'}:{display:"none"},
      canvas_height:120,
      canvas_width:200,
      itemState:!file?{display:'none'}:undefined
    }

    useEffect(() => {
      if(file)
        handleChange(file)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxSizeScale,ANTIALIASING]); 

    const draw = (ctx,img)=>{

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //To empty the canvas
      ctx.imageSmoothingEnabled = ANTIALIASING; //DISABLE ANTIALIASING
      let aspectRatio = img.width /img.height;
      // var hRatio = ctx.canvas.width / img.width    ;
      // var vRatio = ctx.canvas.height / img.height  ;
      // var ratio  = Math.min ( hRatio, vRatio );
      let width = Math.min(maxSizeScale,img.width);
      let height = width/aspectRatio;
      // let maxHeight = Math.min(height,maxSize.height); to crop image and avoid distortion
      if (width/ aspectRatio <= height) {
        ctx.drawImage(img, 0, 0, width, width / aspectRatio)
      } else {
        ctx.drawImage(img, 0, 0,height * aspectRatio,height);
      }
      return [width,height];
    }
    const drawThumbnail = (drawCxt,img,width,height)=>{
      let ratio = width/height;
      let drawHeight = Math.min(style.canvas_width/ratio,style.canvas_height);
      drawCxt.clearRect(0, 0, drawCxt.canvas.width, drawCxt.canvas.height); //To empty the canvas
      drawCxt.drawImage(img, 0, (drawCxt.canvas.height-drawHeight)/2,style.canvas_width,drawHeight); //Draw thumbnail
    }

    const onSelectImage= ()=>{
      fileSelector.current.click();
    }
    const onFileChange = (event)=>{
      event.stopPropagation();
      event.preventDefault();
      let file = event.target.files[0];

      setFile(file);
      setScale(75);
      handleChange(file);

      // console.log(file);
        // lastModified : 1717409178714
        // lastModifiedDate: Mon Jun 03 2024 12:06:18 GMT+0200 (Ora legale dell’Europa centrale) {}
        // name: "111910.gif"
        // size: 4120
        // type: "image/gif"
        // webkitRelativePath: ""
      //SET FILE AS STATE <input multiple>
    }
    
      const handleChange = (file) => {//trycatch
      let fileReader, isCancel = false;

      var drawCxt= canvasRef.current.getContext("2d");
      // var ctx = document.createElement("canvas",).getContext('2d'); 
      var ctx =canvasDrawRef.current.getContext("2d");

      if (file) {
        LoadUtils.loadFile(file).then((result)=>{// WAIT FILE TO READ
          if (result && !isCancel) {

            LoadUtils.loadImageFile(result).then((img)=>{ //WAIT IMAGE LOADING
              setHeight(Math.min(style.canvas_height,img.height));
              let [width,height]= draw(ctx,img); //DRAW CANVAS
              drawThumbnail(drawCxt,img,width,height); //DRAW THUMBNAIL
              let imgData = ctx.getImageData(0, 0, width, height);
              let hexArray = ImageUtils.getArrayData(imgData,width); //Convert to HEX
              handleLoadImage(hexArray);
              
            });
          }
        });
      }
      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      }}

      function handleUpScale (){
        setScale(maxSizeScale+5);
      }
      function handleDownScale (){
        setScale(maxSizeScale-5);
      }
  return (
    <SubMenu label={"Image"} icon={<LuFolderOpen /> }defaultOpen={true} >
      <MenuItem onClick={onSelectImage} icon={<LuFolderOpen />} >
      Select a File
      <input 
        ref={fileSelector}
        type="file" 
        id="file-selector" 
        accept=".gif,.png,.jpg" 
        style={{display: 'none'}}
        onChange={onFileChange.bind(this)} 
      ></input>
      
      </MenuItem>
      <div style={style.menu}>
        <canvas ref={canvasRef} width={style.canvas_width} height={style.canvas_height}/>
        <canvas ref={canvasDrawRef} width={style.canvas_width} height={style.canvas_height} style={{display:"none"}}/>
      </div>
        
      <MenuItem icon={<BsZoomIn />} onClick={()=>handleUpScale()} style={style.itemState}>Upscale</MenuItem>
      <MenuItem icon={<BsZoomOut />} onClick={()=>handleDownScale()} style={style.itemState}>Downscale</MenuItem>
      <MenuItem onClick={()=>setAntialiasing(!ANTIALIASING)} style={style.itemState}>ANTIALIASING</MenuItem>
    </SubMenu>

  
  )
}

export default FileSelector