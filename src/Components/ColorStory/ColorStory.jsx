import React from 'react'
import '../../styles/colorstory.css'
function ColorStory({colorStory,setColorStory,setColor}) {
  return (
    <div className='prevColorBox'>
    {
        colorStory.map((el)=>{
            return( 
            <div key={`div ${el.hex}`} className='prevColor'>
              <button className='colorBox' 
                key={`color ${el.hex}`}
                onClick={()=>setColor(el)} 
                onContextMenu={(e)=>{
                e.preventDefault();
                setColorStory(colorStory.filter(item => item !== el));
                }}
                style={{backgroundColor:el.hex}}>
              </button >{el.hex}
            </div>
        )})
    }
    </div>
  )
}

export default ColorStory