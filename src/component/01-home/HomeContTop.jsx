import React from 'react'
import MoreBtn from '../_common/MoreBtn'
import { NavLink } from 'react-router-dom'

function HomeContTop({homecontTitle, homecontEmoji, to, showMore = true}) {
  return (
    <div className='home-menu-top'>
      <h2>{homecontTitle} <span className='emoji'>{homecontEmoji}</span> </h2>
        {showMore && to ? ( <NavLink to={to}> <MoreBtn /> </NavLink> ) : null}
        {/* 전체보기 버튼을 사용하지 않는 곳을 위해 삼항연산자를 사용하여 showMore이 필요없을때는 null */}
    </div>
  )
}

export default HomeContTop