import React from 'react'
import './button.css'
function ActionButton({name,onAction,isActive}) {

  return (
    <div className='content'>
    <button onClick={onAction} className={isActive?"playme activeEffect":"playme"} >
      <div>
        <span></span>
        <a href="#" >{name}</a>
      </div>
    </button>
    </div>
   
  )
}

export default ActionButton

