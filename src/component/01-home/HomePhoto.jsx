import React from 'react'
import { NavLink } from 'react-router-dom'

function HomePhoto({className, state, img}) {
  return (
    <div className={className}>
      <NavLink to='/community' state={state}>
        <p className='home-photo-img'>
          <img src={img} alt="" />
        </p>
      </NavLink>
    </div>
  )
}

export default HomePhoto