import React from 'react'
import { NavLink } from 'react-router-dom'

function HomePhoto({className, img}) {
  return (
    <div className={className}>
      <NavLink to='/community/cmphoto'>
        <p className='home-photo-img'>
          <img src={img} alt="" />
        </p>
      </NavLink>
    </div>
  )
}

export default HomePhoto