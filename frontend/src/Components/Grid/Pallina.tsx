
type Props = {
  onContextMenu: React.MouseEventHandler,
  onPointerUp: React.PointerEventHandler,
  onPointerDown: React.PointerEventHandler,
  onMouseEnter: React.MouseEventHandler,
  color: string,
  opacity: number,
  isVertical: boolean
}
function Pallina({
  onContextMenu,
  onPointerUp,
  onPointerDown,
  onMouseEnter,
  color,
  opacity,
  isVertical
}: Props) {
  const style = {
    width: isVertical ? "0.8rem" : "1.4rem",
    height: isVertical ? "1.4rem" : "0.8rem",
    backgroundColor: color ? color : 'white',
    opacity: opacity,
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

export default Pallina