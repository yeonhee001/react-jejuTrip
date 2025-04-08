import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import MyMenu from '../../component/05-mypage/MyMenu';
import Btn2Popup from '../../component/popups/Btn2Popup';
import '../../styles/05-mypage/my.scss';

function My() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <h2 className='tab-maintitle'>MY</h2>

      {/* 로그인 정보 */}
      <div className='my-login'>
        <p>떠나봅 님, 어시여 !</p>
        <span>thunabob@gmail.com</span>
      </div>

      {/* 아이콘 메뉴 */}
      <MyMenu/>

      {/* 리스트 메뉴 */}
      <div className='my-menu2'>
        <div className='my-menu-trip'>
          <p>여행</p>
          <NavLink to='/planner'>나의 여행 보기</NavLink>
          <span className='my-trip-num'>2</span>
          <NavLink to='/planner/pickplan'>추천 일정 보기</NavLink>
        </div>
        <div className='my-menu-help'>
          <p>고객센터</p>
          <NavLink to='/my/qna'>자주 묻는 질문</NavLink>
          <span onClick={() => {setIsPopupOpen(true)}} >전화 걸기</span>
        </div>
      </div>

      <span className='my-login-out'>로그아웃</span>

      <Btn2Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} type={'call'}/>
    </div>
  )
}

export default My