import React from 'react'
import { NavLink } from 'react-router-dom'
import Right_blue from '../icons/Right_blue';
import Close from '../icons/Close';

function Burger({onClose, isOpen}) {

  return (
    <div className={`burger-rel ${isOpen ? 'active' : ''}`}>
      <div className='burger'>
          <div className="bug-close">
            <button onClick={onClose}>
              <Close className={"bugclose-btn"}/>
            </button>
          </div>
        <div>
          <ul className='bug-menu'>
            <li className='bugbtn' onClick={onClose}>
              <NavLink to="/">
                <span>Home</span>
                <Right_blue className={'bugarrow'}/>
              </NavLink>
            </li>
            <li className='bugbtn' onClick={onClose}>
              <NavLink to="/trip/triplist/tour">
                <span>관광지</span>
                <Right_blue className={'bugarrow'}/>
              </NavLink>
            </li>
            <li className='bugbtn' onClick={onClose}>
              <NavLink to="/trip/triplist/food">
                <span>맛집</span>
                <Right_blue className={'bugarrow'}/>
              </NavLink>
            </li>
            <li className='bugbtn' onClick={onClose}>
              <NavLink to="/trip/triplist/festival">
                <span>축제 행사</span>
                <Right_blue className={'bugarrow'}/>
              </NavLink>
            </li>
            <li className='bugbtn' onClick={onClose}>
              <NavLink to="/community">
                <span>떠나톡</span>
                <Right_blue className={'bugarrow'}/>
              </NavLink>
            </li>
            <li className='bugbtn' onClick={onClose}>
              <NavLink to="https://bus.jeju.go.kr/search/line">
                <span>버스시간표</span>
                <Right_blue className={'bugarrow'}/>
              </NavLink>
            </li>
            <li className='bugbtn' onClick={onClose}>
              <NavLink to="/my">
                <span>마이페이지</span>
                <Right_blue className={'bugarrow'}/>
              </NavLink>
            </li>
          </ul>
          <div className='bug-login'>
            <NavLink to="/login">로그인</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Burger