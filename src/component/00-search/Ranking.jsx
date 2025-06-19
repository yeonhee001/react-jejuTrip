import React from 'react'

function Ranking({rank, word}) {  
  return (
    <div className='rankingOne'>
      <b>{rank}</b>
      <span>{word}</span>
    </div>
  )
}

export default Ranking