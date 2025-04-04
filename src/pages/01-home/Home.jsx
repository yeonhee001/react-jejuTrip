import React from 'react'
import { NavLink } from 'react-router-dom'
import MainItem from '../../component/01-home/MainItem'
import HomeTab from '../../component/01-home/HomeTab'
import HomeTrip from '../../component/01-home/HomeTrip'
import MoreBtn from '../../component/_common/MoreBtn'
import HomeFood from '../../component/01-home/HomeFood'
import HomePhoto from '../../component/01-home/HomePhoto'

function Home() {
  return (
    <div>
      <MainItem className={'home-mainimg'}/>
      
      <div className='home-tabmenu'>
        <HomeTab tabLink={'/trip/triplist/tour'} url={'home_tabtour_00.png'} tabTitle={'Tour'}/>
        <HomeTab tabLink={'/trip/triplist/food'} url={'home_tabfood_00.png'} tabTitle={'Food'}/>
        <HomeTab tabLink={'/trip/triplist/festival'} url={'home_tabfestival_00.png'} tabTitle={'Festival'}/>
        <HomeTab tabLink={'/trip/triplist/shopping'} url={'home_tabshopping_00.png'} tabTitle={'Shopping'}/>
      </div>

      <div className='home-tripmenu'>
        <div className='home-tripmenu-top'>
          <h2>오늘, 이곳 어때? 🚗</h2>
          <NavLink to='/trip/triplist/tour'> <MoreBtn/> </NavLink>
        </div>
        <div>
          <HomeTrip className={'home-trip'}/>
          <HomeTrip className={'home-trip'}/>
          <HomeTrip className={'home-trip'}/>
          <HomeTrip className={'home-trip'}/>
        </div>
      </div>

      <div className='home-foodmenu'>
        <div className='home-foodmenu-top'>
          <h2>제주 맛집 지도 🍴</h2>
          <NavLink to='/trip/triplist/food'> <MoreBtn/> </NavLink>
        </div>
        <HomeFood className={'home-food'}/>
        <HomeFood className={'home-food'}/>
        <HomeFood className={'home-food'}/>
      </div>

      <div className='home-photomenu'>
        <div className='home-photomenu-top'>
          <h2>꼭 남겨야 할 인생샷 스팟 📸</h2>
          <NavLink to='/community/cmphoto'> <MoreBtn/> </NavLink>
        </div>
        <HomePhoto className={'home-photo'}/>
        <HomePhoto className={'home-photo'}/>
      </div>
      
    </div>
  )
}

export default Home