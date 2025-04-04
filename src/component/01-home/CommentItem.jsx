import React from 'react'
import Commu_blue from '../icons/Commu_blue'
import Commu_gray from '../icons/Commu_gray'
import '../../styles/01-home/home.scss'
import { NavLink } from 'react-router-dom'

function CommentItem() {
  return (
    <div className='bottom-icons'>
      <NavLink to='/community' className={({ isActive }) => `home-menu ${isActive ? 'active' : ''}`}>
        {({ isActive }) => (
          <>
            {isActive ? <Commu_blue className={"menu-blue"} /> : <Commu_gray className={"menu-gray"} />}
            <b className={`menu-label ${isActive ? 'active' : ''}`}>떠나톡</b>
          </>
        )}
      </NavLink>
    </div>
  )
}

export default CommentItem