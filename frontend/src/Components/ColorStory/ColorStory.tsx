import { IColor } from 'react-color-palette';
import '../../styles/colorstory.css'
import { useState } from 'react';
type Props = {
  colorStory: IColor[];
  setColorStory: React.Dispatch<React.SetStateAction<IColor[]>>;
  setColor: React.Dispatch<React.SetStateAction<IColor>>;
}

function ColorStory({ colorStory, setColorStory, setColor }: Props) {
  const [activeColor, setActiveColor] = useState(0);

  const handleColorClick = (el: IColor, index: number) => {
    setActiveColor(index);
    setColor(el);
  }
  const handleColorRightClick = (e: React.MouseEvent, el: IColor) => {
    e.preventDefault();
    setColorStory(prev=> prev.filter(item => item !== el));
  }
  return (
    <div className='prevColorBox'>
      {
        colorStory.map((el, i) => {
          return (
            <div key={`div ${el.hex}`} className='prevColor'>
              <button className={`colorBox ${activeColor===i?"gradient-border":''}`}
                onClick={() => handleColorClick(el, i)}
                onContextMenu={(e) => handleColorRightClick(e, el)}
                style={{ backgroundColor: el.hex}}>
              </button >{el.hex}
            </div>
          )
        })
      }
    </div>
  )
}

export default ColorStory