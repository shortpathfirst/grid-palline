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
      isVertical
    } = this.props;
    
    const style = { 
      width:isVertical?"0.8rem":"1.4rem",
      height: isVertical?"1.4rem":"0.8rem",
      backgroundColor:color?color:'white', 
      opacity:opacity,
    }

    return (
      <div className="pallina" 
        key={`node-${row}-${col}`}
        onContextMenu={onContextMenu} 
        onMouseEnter={onMouseEnter} 
        onPointerDown={onPointerDown} 
        onPointerUp={onPointerUp} 
        style={style}>
      
    </div>
    )
  }
}