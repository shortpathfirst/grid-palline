import '../../../styles/gridSetting.css'
import { GridNode } from '../../../model/GridNode';
import { useMatrixContext } from '../../../hooks/MatrixProvider';

function GridSizeSetting() {

  const { matrix, setMatrix } = useMatrixContext();

  function addLine() {
    let newMatrixRow: GridNode[] = []
    for (let j = 0; j < matrix[0].length; j++) {
      let a = new GridNode(matrix.length, j);
      newMatrixRow.push(a);
    }
    setMatrix([...matrix, newMatrixRow]);
  }

  function removeLine() {
    setMatrix(matrix.slice(0, matrix.length - 1))
  }

  function addColumn() {
    setMatrix(prevMatrix => {
      return prevMatrix.map((row, i) => {
        const newNode = new GridNode(i, prevMatrix[0].length);
        return [...row, newNode];
      });
    });
  }

  function removeColumn() {
    setMatrix(prevMatrix => {
      return prevMatrix.map(row => row.slice(0, -1));
    });
  }


  return (
    <div className='gridSet'>
      <div className='poleSet'>
        <div>
          <button className='backButton up' onClick={() => removeLine()}>
            -
          </button>
        </div>
        <div>
          <button className='backButton left' onClick={() => removeColumn()}>
            -
          </button>
          <button className='backButton right' onClick={() => addColumn()}>
            +
          </button>
        </div>
        <div>
          <button className='backButton bottom' onClick={() => addLine()}>
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default GridSizeSetting