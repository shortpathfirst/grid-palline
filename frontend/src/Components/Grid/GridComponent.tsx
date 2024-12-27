import { useEffect, useState } from 'react'
import { Operation } from '../../model/Operation';
import { IColor } from 'react-color-palette';
import { grid } from '../../model/GridStatus';
import { FloodFillAlgorithm } from '../../Algorithm/FloodFillAlgorithm';
import Pallina from './Pallina';
import { SimpleOperation } from '../../Controller/SimpleOperation';
import { FloodFillOperation } from '../../Controller/FloodFillOperation';
import { WallOperation } from '../../Controller/WallOperation';
import { useMatrixContext } from '../../hooks/MatrixProvider';
import { useGridState } from '../../hooks/GridStateHook';
import { useOperationsContext } from '../../hooks/OperationsHook';
import '../../styles/grid.css'

interface GridProps {
    color: IColor;
    handleAddColor: Function;
    handleSetDijkstra: Function;
    isVertical: boolean;
}
/**
 * CLICK TO DRAW FILL WALL START/FINISH
 * RIGHT CLICK TO ERASE
 */

function GridComponent({ handleAddColor, color, handleSetDijkstra, isVertical }: GridProps) {
    const [draw, setDraw] = useState(false);
    const { matrix, setMatrix, changeMatrixValue } = useMatrixContext();
    const { gridState, isSetWall, setGridState } = useGridState();
    const { pushComplexOperations } = useOperationsContext();

    useEffect(() => {
        window.addEventListener('mouseup', () => { setDraw(false); }, false);
    }, [])//add listener at component creation

    function addSimpleOperation(operation: Operation) {
        if (isSetWall) {
            pushComplexOperations(new WallOperation(operation));
        } else {
            pushComplexOperations(new SimpleOperation(operation));
        }
    }
    function addFloodFillOperation(operations: Operation[]) {
        let complexOperation = new FloodFillOperation();
        complexOperation.addListOperations(operations);
        pushComplexOperations(complexOperation);
    }
    function handleClick(e: any, i: number, j: number) {

        if (gridState === grid.fill) {
            let alg = new FloodFillAlgorithm();
            let [filledMatrix, oper] = alg.bfs(matrix.length, matrix[0].length, [...matrix], i, j, color.hex, isSetWall);
            addFloodFillOperation(oper);
            handleAddColor(color);
            setMatrix(filledMatrix);
            return;
        }
        //RIGHT CLICK
        if (e.button === 2) {
            setGridState(grid.eraser);
            setDraw(true);
            addSimpleOperation({ i: i, j: j, color: '', prevColor: matrix[i][j].value });
            changeMatrixValue(i, j, '', false)
            return;
        }
        if (gridState === grid.start) {
            addSimpleOperation({ i: i, j: j, color: "start", prevColor: matrix[i][j].value });
            changeMatrixValue(i, j, '#01ff00');
            handleSetDijkstra([i, j]);
            setGridState(grid.finish);
            return;
        }
        if (gridState === grid.finish) {
            addSimpleOperation({ i: i, j: j, color: "finish", prevColor: matrix[i][j].value });
            changeMatrixValue(i, j, '#fe0000');
            handleSetDijkstra(undefined, [i, j]);
            setGridState(grid.draw);
            return;
        } else {
            setDraw(true);
            if (gridState === grid.draw) handleAddColor(color);
            let value = gridState === grid.eraser ? '' : color.hex;
            let isWall = gridState === grid.draw && isSetWall;
            addSimpleOperation({ i: i, j: j, color: value, prevColor: matrix[i][j].value });
            changeMatrixValue(i, j, value, isWall);
        }
    }
    function handleClickRelease(e: any) {
        setDraw(false);
        if (e.button === 2)
            setGridState(grid.draw);
    }

    function handleRight(e: Event, i: number, j: number) {
        e.preventDefault();
        setDraw(false);
        addSimpleOperation({
            i: i,
            j: j,
            color: '',
            prevColor: matrix[i][j].value
        })
        changeMatrixValue(i, j, '')
    }

    function handleHover(iClicked: number, jClicked: number) {
        if (draw) {

            let value: string = gridState === grid.eraser ? '' : color.hex;
            let isWall: boolean = (matrix[iClicked][jClicked].value === color.hex || gridState === grid.draw) && isSetWall;
            addSimpleOperation({
                i: iClicked,
                j: jClicked,
                color: value,
                prevColor: matrix[iClicked][jClicked].value
            });
            changeMatrixValue(iClicked, jClicked, value, isWall)
        }
    }

    return (
        <div className='grid'>
            {
                matrix.map((el, i) => (
                    <div className='rows' key={`row ${i}`}>
                        {
                            el.map((_, j) =>
                                <Pallina key={`node-${i}-${j}`}
                                    isVertical={isVertical}
                                    onContextMenu={(e: any) => { handleRight(e, i, j) }}
                                    onMouseEnter={() => handleHover(i, j)}
                                    onPointerDown={(e: any) => handleClick(e, i, j)}
                                    onPointerUp={(e: any) => handleClickRelease(e)}
                                    color={matrix[i][j].value}
                                    opacity={matrix[i][j].isWall || !isSetWall ? 1 : 0.4}
                                />
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default GridComponent
