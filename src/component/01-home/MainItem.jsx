import React from 'react'
import { NavLink } from 'react-router-dom'

function MainItem({className}) {
  return (
    <div className={className}>
      <NavLink to='/trip/triplist/:type/tripdetail/:id'>
        <p className='home-bgimg'>
          <img src="/imgs/component_placeitem.jpg" alt="" />
        </p>
        <div className='home-main-whimg'>
          <p>
            <img src="/imgs/home_slidetitle_00.png" alt="" />
          </p>
          <b>오늘, <br/>이곳 어때?</b>
        </div>
        <div className='home-main-text'>
          <b>오라동 청보리 메밀꽃밭</b>
          <span>한라산 아래 드넓은 청보리 메밀꽃의 향연</span>
        </div>
      </NavLink>
      
      {/* <div className={className}>
        <NavLink to={detailurl}>
          <p className='home-bgimg'>
            {homeMainPhoto}
          </p>
          <div className='home-main-whimg'>
            <p>
              <img src="/imgs/home_slidetitle_00.png" alt="" />
            </p>
            <b>{tripTitle}</b>
          </div>
          <div className='home-main-text'>
            <b>{title}</b>
            <span>{introduction}</span>
          </div>
        </NavLink>
      </div> */}

    </div>
  )
}

export default MainItem