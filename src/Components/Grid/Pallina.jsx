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
      opacity,
    } = this.props;
    
    return (
      <div className="pallina" 
        key={`node-${row}-${col}`}
        onContextMenu={onContextMenu} 
        onMouseEnter={onMouseEnter} 
        onPointerDown={onPointerDown} 
        onPointerUp={onPointerUp} 
        style={{ backgroundColor:color?color:'white', opacity:opacity}}>
      
    </div>
    )
  }
}