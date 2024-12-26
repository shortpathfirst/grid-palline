import React, { useEffect, useState } from 'react'
import { Operation } from '../../model/Operation';
import { IColor } from 'react-color-palette';
import { grid } from '../../model/GridStatus';
import { FloodFillAlgorithm } from '../../Algorithm/FloodFillAlgorithm';
import Pallina from './Pallina';
import { SimpleOperation } from '../../Controller/SimpleOperation';
import { FloodFillOperation } from '../../Controller/FloodFillOperation';
import { WallOperation } from '../../Controller/WallOperation';
import { useMatrixContext } from '../../hooks/MatrixProvider';
import { changeMatrix } from '../../Service/MatrixService';
import { useGridState } from '../../hooks/GridStateHook';
import { useOperationsContext } from '../../hooks/OperationsHook';


interface GridProps {
    color: IColor;       //Color to use
    isSetWall: boolean;  //Setting walls
    handleAddColor: Function;
    handleSetDijkstra: Function;
    isVertical: boolean;
}

function GridComponent({ handleAddColor, color, isSetWall, handleSetDijkstra, isVertical }: GridProps) {
    const [draw, setDraw] = useState(false);           //Activate pen mouse up and mouse down
    const { matrix, setMatrix } = useMatrixContext();
    const { gridState, setGridState } = useGridState();
    const {pushComplexOperations} = useOperationsContext();

    useEffect(() => {
        window.addEventListener('mouseup', () => { setDraw(false); }, false);
    }, [])//add listener 1 time only

    function addSimpleOperation(operation: Operation) {
        if (isSetWall) {//ADD WALL OPERATION
            let myOperation = new WallOperation(operation);
            pushComplexOperations(myOperation);
        } else {//ADD SIMPLE OPERATION
            let myOperation = new SimpleOperation(operation);
            pushComplexOperations(myOperation);
        }
    }

    function handleClick(e: any, i: number, j: number) {

        if (gridState === grid.fill) {
            let alg = new FloodFillAlgorithm();
            let [filledMatrix, oper] = alg.bfs(matrix.length, matrix[0].length, [...matrix], i, j, color.hex, isSetWall);

            let complexOperation = new FloodFillOperation();
            complexOperation.addListOperations(oper);
            pushComplexOperations(complexOperation);

            handleAddColor(color);
            setMatrix(filledMatrix);
            return;
        }
        if (e.button === 2) { //if RIGHT CLICK
            setGridState(grid.eraser);
        }
        if (gridState === grid.start) {
            addSimpleOperation({ i: i, j: j, color: "start", prevColor: matrix[i][j].value });
            setMatrix(changeMatrix(matrix, i, j, '#01ff00'));
            handleSetDijkstra([i, j]);
            setGridState(grid.finish);
            return;
        }
        if (gridState === grid.finish) {
            addSimpleOperation({ i: i, j: j, color: "finish", prevColor: matrix[i][j].value });
            setMatrix(changeMatrix(matrix, i, j, '#fe0000'));
            handleSetDijkstra(undefined, [i, j]);
            setGridState(grid.draw);
            return;
        }
        setDraw(true);
        addSimpleOperation({ i: i, j: j, color: gridState === grid.eraser ? '' : color.hex, prevColor: matrix[i][j].value });
        if (gridState === grid.draw) handleAddColor(color);

        let value = gridState === grid.eraser ? '' : color.hex;
        let isWall = gridState === grid.draw && isSetWall;
        setMatrix(changeMatrix(matrix, i, j, value, isWall));


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

        setMatrix(changeMatrix(matrix, i, j, '', false));
    }

    function handleHover(iClicked: number, jClicked: number) {
        if (draw) {
            addSimpleOperation({
                i: iClicked,
                j: jClicked,
                color: gridState === grid.eraser ? '' : color.hex,
                prevColor: matrix[iClicked][jClicked].value
            });
            let value: string = gridState === grid.eraser ? '' : color.hex;
            let isWall: boolean = (matrix[iClicked][jClicked].value === color.hex || gridState === grid.draw) && isSetWall;
            setMatrix(changeMatrix(matrix, iClicked, jClicked, value, isWall));
        }
    }

    return (
        <div className='grid'>
            {
                matrix.map((el, i) => {

                    return <div className='rows' key={`row ${i}`}>
                        {
                            el.map((_, j) => {
                                return <Pallina key={`node-${i}-${j}`}
                                    isVertical={isVertical}
                                    onContextMenu={(e: any) => { handleRight(e, i, j) }}
                                    onMouseEnter={() => handleHover(i, j)}
                                    onPointerDown={(e: any) => handleClick(e, i, j)}
                                    onPointerUp={() => setDraw(false)}
                                    color={matrix[i][j].value}
                                    opacity={matrix[i][j].isWall || !isSetWall ? 1 : 0.4}
                                />
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}

export default GridComponent
