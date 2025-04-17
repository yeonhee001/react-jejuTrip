import React from 'react'

function TagBtn({isActive,onClick,tagbtn}) {
  return (
    <div className={`tagbtn ${isActive ? 'active' : ''}`} onClick={onClick}>{tagbtn}</div>
  )
}

export default TagBtn