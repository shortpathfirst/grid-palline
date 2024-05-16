import React, { Component } from 'react'

export default class Pallina extends Component {
  render() {
    const {
      row,
      col,
      // isFinish,
      // isStart,
      // isWall,
      onContextMenu,
      onPointerDown,
      onMouseEnter,
      onPointerUp,
      color,
    } = this.props;
    
    return (
      <button  className="pallina" 
        key={`node-${row}-${col}`}
        // onClick={()=>{handleClick(i,j);}} 
        onContextMenu={onContextMenu} 
        onMouseEnter={onMouseEnter} 
        onPointerDown={onPointerDown} 
        onPointerUp={onPointerUp} 
        style={{ backgroundColor:color}}>
      
    </button>
    )
  }
}