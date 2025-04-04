import React from 'react'

function TripTag({tag}) {
  return (
    <div className='triptag'>
      <ul>
        <li>{tag}</li>
      </ul>
    </div>
  )
}

export default TripTag