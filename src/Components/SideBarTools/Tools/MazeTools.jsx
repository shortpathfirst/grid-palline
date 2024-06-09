import React from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { GiMaze } from "react-icons/gi";
import { FiPlay } from "react-icons/fi";
import { PiWallLight } from "react-icons/pi";
import { Bs1Circle } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa6";
import { FaFontAwesomeFlag } from "react-icons/fa";


function MazeTools({onSetWalls,onDijkstra,onChangeStart,gridState,isWall}) {
    const setStartstyle = gridState===0?<Bs1Circle />:gridState===1?<FaFlagCheckered />:<FaFontAwesomeFlag />;
    const setWallStyle = isWall?{backgroundColor:"#9f8dc6"}:{}

  return (
    <SubMenu label={"Maze Game"} icon={<GiMaze/>} defaultOpen={false} >
    <MenuItem onClick={onChangeStart}icon={setStartstyle}>Set Start and finish</MenuItem>
    <MenuItem onClick={onDijkstra} icon={<FiPlay />} > Maze</MenuItem>
    <MenuItem onClick={onSetWalls} style={setWallStyle} icon={<PiWallLight style={{color:"black"}}/>}>Set Walls</MenuItem>
  </SubMenu>
  )
}

export default MazeTools