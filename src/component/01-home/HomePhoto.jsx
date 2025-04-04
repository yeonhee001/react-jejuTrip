import React from 'react'
import { NavLink } from 'react-router-dom'

function HomePhoto({className}) {
  return (
    <div className={className}>
      <NavLink to='/community/cmphoto'>
        <p className='home-photo-img'>
          <img src="/imgs/home_photo_01.jpg" alt="" />
        </p>
      </NavLink>
    </div>
  )
}

export default HomePhoto