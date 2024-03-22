import React from 'react'
import "./Btn.css"

const Btn = ({className,handleEvent,children}) => {
  return (
    <button onClick={handleEvent} className={`${className} btn`}>{children}</button>
  )
}

export default Btn