import React, { Component } from 'react'
import Pallina from './Pallina';

export default class GridComponent extends Component {

    
  render() {
    
    const {
        matrix,
        onContextMenu,
        onMouseEnter,
        onPointerDown,
        onPointerUp,
        color
    } = this.props;

    return (
        <div className='grid'>
        {   
            matrix.map((el,i)=>{

                return <div className='rows' key={i}> {el.map((val,j)=>{

                    return (
                        <Pallina key={`node-${i}-${j}`}
                        row={i}
                        col={j}
                        onContextMenu={onContextMenu} 
                        onMouseEnter={onMouseEnter} 
                        onPointerDown={onPointerDown} 
                        onPointerUp={onPointerUp}
                        color={color}
                        />
                    )
                })} 
                </div>
            })
        }
    </div>
    )
  }
}
{/* <GridComponent 
matrix = {matrix}
onContextMenu = {(e: any)=>{handleRight(e,1,2)}}
onMouseEnter = {()=>handleHover(1,2)} 
onPointerDown={()=>handleClick(1,2)} 
onPointerUp={()=>setGo(false)}
color = {(matrix[1][2]==='')?'':matrix[1][2]}
/> */}