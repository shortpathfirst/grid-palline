import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { GiMaze } from "react-icons/gi";
import { FiPlay } from "react-icons/fi";
import { PiWallLight } from "react-icons/pi";
import { Bs1Circle } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa6";
import { FaFontAwesomeFlag } from "react-icons/fa";
import { dijkstraOperation } from '../../../Controller/dijkstraOperation';
import { Dijkstra } from '../../../Algorithm/Dijkstra';
import { useMatrixContext } from '../../../hooks/MatrixProvider';
import { useGridState } from '../../../hooks/GridStateHook';
import { grid } from '../../../model/GridStatus';
import { useOperationsContext } from '../../../hooks/OperationsHook';
import { GridNode } from '../../../model/GridNode';
import { DijkstraPoints } from '../../../model/DijkstraPoint';

type Props = {
  dijkstraPoints: DijkstraPoints;
}

function MazeTools({ dijkstraPoints }: Props) {

  const { matrix, resetParams,changeMatrixValue } = useMatrixContext();
  const { gridState, isSetWall, setGridState, switchWalls } = useGridState();
  const { pushOperations } = useOperationsContext();

  const onChangeStart = () => setGridState(gridState === -1 ? grid.start : grid.draw)

  const styles = {
    dijkstraColor: "#aee4ac",
    dijkstraPath: '#cb4d1e',
    WallStyle: isSetWall ? { backgroundColor: "#9f8dc6" } : {},
    startstyle: gridState === grid.start ? <Bs1Circle /> :
      gridState === grid.finish ? <FaFlagCheckered />
        : <FaFontAwesomeFlag />,
  };
  function animateDijkstra(visitedNodes: GridNode[], nodesInshortestPath: GridNode[]) {
    let dijkstraOperationList = new dijkstraOperation();
    for (let i = 0; i < visitedNodes.length; i++) {
      //Wait animation
      if (i === visitedNodes.length - 1) {
        setTimeout(() => {
          animateShortestPath(nodesInshortestPath);
        }, 10 * i);
        break;
      }
      const node = visitedNodes[i];
      setTimeout(() => {
        changeMatrixValue( node.row, node.col, styles.dijkstraColor);
      }, 10 * i);

      dijkstraOperationList.addOperation({
        i: node.row,
        j: node.col,
        color: 'dijkstra',
        prevColor: matrix[node.row][node.col].value
      });
    }
    pushOperations(dijkstraOperationList)
    resetParams();
  }
  function animateShortestPath(nodesInshortestPath: GridNode[]) {
    let dijkstraOperationList = new dijkstraOperation();
    for (let i = 0; i < nodesInshortestPath.length; i++) {
      const node = nodesInshortestPath[i];
      setTimeout(() => {
        changeMatrixValue( node.row, node.col, styles.dijkstraPath);
      }, 50 * i);
      dijkstraOperationList.addOperation({
        i: node.row,
        j: node.col,
        color: 'dijkstra',
        prevColor: matrix[node.row][node.col].value
      });
    }
    pushOperations(dijkstraOperationList)
  }
  function visualizeDijkstra() {
    const startNode = matrix[dijkstraPoints.START_NODE[0]][dijkstraPoints.START_NODE[1]];
    const finishNode = matrix[dijkstraPoints.FINISH_NODE[0]][dijkstraPoints.FINISH_NODE[1]];
    const algorithm = new Dijkstra();
    const visitedNodes = algorithm.dijkstra(matrix, startNode, finishNode);
    const nodesInshortestPath = algorithm.getNodesInShortestPathOrder(finishNode);
    if (!visitedNodes) return;
    animateDijkstra(visitedNodes, nodesInshortestPath);
    //NEED TO RESET THE NODES OF THE MATRIX
  }

  return (
    <SubMenu label={"Maze Game"} icon={<GiMaze />} defaultOpen={false} >
      <MenuItem onClick={onChangeStart} icon={styles.startstyle}>Set Start and finish</MenuItem>
      <MenuItem onClick={() => visualizeDijkstra()} icon={<FiPlay />} > Maze</MenuItem>
      <MenuItem onClick={switchWalls} style={styles.WallStyle} icon={<PiWallLight style={{ color: "black" }} />}>Set Walls</MenuItem>
    </SubMenu>
  )
}

export default MazeTools