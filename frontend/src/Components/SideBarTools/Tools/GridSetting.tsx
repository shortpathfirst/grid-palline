import React from 'react'
import '../../../styles/gridSetting.css'
import { Node } from '../../../model/Node';

function GridSetting({matrix,setMatrix}:{matrix:Node[][],setMatrix:Function}) {


  function addLine(){
    let newMatrix:Node[]= []

    for(let j=0;j<matrix[0].length;j++){
        let a = new Node(matrix.length,j);
        newMatrix.push(a);
    }
    setMatrix([...matrix,newMatrix]);
    // setMatrix(matrix.concat([newMatrix]));
}
function removeLine(){
    setMatrix(matrix.slice(0,matrix.length-1))
}
function addColumn(){
    let copy  = [...matrix];
    for(let i=0;i<matrix.length;i++){
        let a = new Node(i,matrix[0].length);
        copy[i].push(a);
    }
    setMatrix(copy);
    
}
function removeColumn(){
    let copy  = [...matrix];
    for(let i=0;i<matrix.length;i++){
        copy[i].pop();
    }
    setMatrix(copy);
}


  return (
    <div className='gridSet'>
      <div className='poleSet'>
        <div>
          <button className='backButton up' onClick={()=>removeLine()}>
              -
          </button>
        </div>
        <div>
          <button className='backButton left' onClick={()=>removeColumn()}>
            -
          </button>
          <button className='backButton right' onClick={()=>addColumn()}>
              +
          </button>
        </div>
        <div>
          <button className='backButton bottom' onClick={()=>addLine()}>
              +
          </button>
        </div>
      </div>
    </div>
  )
}

export default GridSetting