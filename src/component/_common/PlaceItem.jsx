import React from 'react'
function PlaceItem({title, roadaddress, tag, imgPath}) {

  return (
    <div className="place">
      <div className="placeimg"><img src={imgPath} alt="" /></div>
      <div className="placetxt">
        <h2>{title}</h2>
        <p>{roadaddress}</p>
        <b>{tag}</b>
        </div>
    </div>
  )
}

export default PlaceItem