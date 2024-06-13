import React , { useRef,useState,useEffect} from 'react'
import { MenuItem } from 'react-pro-sidebar';
import { LuFolderOpen } from "react-icons/lu";
import { LoadUtils } from '../../../../Controller/Utils/LoadUtils';
import { ImageUtils } from '../../../../Controller/Utils/ImageUtils';
function FileSelector({handleLoadImage,maxSizeScale}) {

    const [file, setFile] = useState(null);
    const fileSelector =useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
      if(file)
        handleChange(file)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxSizeScale]); 

    const draw = (ctx,img)=>{
      //Draw canvas
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //To empty the canvas
      ctx.imageSmoothingEnabled = false; //DISABLE ANTIALIASING
      let aspectRatio = img.width /img.height;
      // var hRatio = ctx.canvas.width / img.width    ;
      // var vRatio = ctx.canvas.height / img.height  ;
      // var ratio  = Math.min ( hRatio, vRatio );
      let width = Math.min(maxSizeScale,img.width);
      let height = width/aspectRatio;
      // let maxHeight = Math.min(height,maxSize.height); to crop image
      if (width/ aspectRatio <= height) {
        ctx.drawImage(img, 0, 0, width, width / aspectRatio);
      } else {
        ctx.drawImage(img, 0, 0,height * aspectRatio,height);
      }
      return [width,height];
    }

    const onSelectImage= ()=>{
      fileSelector.current.click();
    }
    const onFileChange = (event)=>{
      event.stopPropagation();
      event.preventDefault();
      let file = event.target.files[0];
      setFile(file);
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
    
      const handleChange = (file) => {
      let fileReader, isCancel = false;
      var ctx = canvasRef.current.getContext("2d");//
      if (file) {
        LoadUtils.loadFile(file).then((result)=>{// WAIT FILE TO READ
          if (result && !isCancel) {

            LoadUtils.loadImageFile(result).then((img)=>{ //WAIT IMAGE LOADING
              
              let [width,height]= draw(ctx,img); //DRAW CANVAS
              let imgData = ctx.getImageData(0, 0, width, height); // get the image array
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

  return (
    <div>
    <MenuItem onClick={onSelectImage} icon={<LuFolderOpen />}>
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
  <canvas ref={canvasRef}/>

  </div>
  )
}

export default FileSelector