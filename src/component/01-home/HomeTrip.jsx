import React from 'react'
import { NavLink } from 'react-router-dom'

function HomeTrip({className}) {
  return (
    <div className={className}>
      <NavLink to='/trip/triplist/:type/tripdetail/:id'>
        <div className='home-triptab'>
          <p>
            <img src="/imgs/component_placeitem.jpg" alt="" />
          </p>
          <div className='home-triptab-text'>
            <b>981파크</b>
            <span>제주시 애월읍</span>
          </div>
        </div>


        {/* <div className='home-triptab'>
          <p>
            <img src={tripImgpath} alt="" />
          </p>
          <div className='home-triptab-text'>
            <b>{tripTitle}</b>
            <span>{tripRoadaddress}</span>
          </div>
        </div> */}


      </NavLink>
    </div>
  )
}

export default HomeTrip