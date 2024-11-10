import React, { Component } from 'react'

export default class Pallina extends Component {

  render() {

    const {
      onContextMenu,
      onPointerUp,
      onPointerDown,
      onMouseEnter,
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
        onContextMenu={onContextMenu} 
        onMouseEnter={onMouseEnter} 
        onPointerDown={onPointerDown} 
        onPointerUp={onPointerUp} 
        style={style}>
    </div>
    )
  }
}