import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HomeFood({className}) {
  return (
    <div className={className}>
      <NavLink to='/trip/triplist/:type/tripdetail/:id'>
        <div className='home-foodtab'>
          <p>
            <img src="/imgs/component_placeitem.jpg" alt="" />
          </p>
          <div className='home-foodtab-text'>
            <b>플로렌스</b>
            <span>카페·커피·음료</span>
            <span>제주시 추자면 추자로 30-2</span>
          </div>
        </div>


        {/* <div className='home-foodtab'>
          <p>
            <img src={foodImgpath} alt="" />
          </p>
          <div className='home-foodtab-text'>
            <b>{foodTitle}</b>
            <span>{foodTag}</span>
            <span>{foodRoadaddress}</span>
          </div>
        </div> */}


      </NavLink>
    </div>
  )
}
