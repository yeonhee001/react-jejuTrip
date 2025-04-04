import React from 'react'
import { NavLink } from 'react-router-dom'

function HomeTab({tabLink, url, tabTitle}) {
  return (
    <div className='home-tabcomp'>
      <NavLink to={tabLink}>
        <img src={`/imgs/${url}`} alt="" />
        <span>{tabTitle}</span>
      </NavLink>
    </div>
  )
}

export default HomeTab