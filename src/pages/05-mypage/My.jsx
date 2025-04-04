import React from 'react'
import '../../styles/05-mypage/my.scss';
import Heart_stroke_red from '../../component/icons/Heart_stroke_red';
import Check from '../../component/icons/Check';
import Activity from '../../component/icons/Activity';
import { NavLink } from 'react-router-dom';

function My() {
  return (
    <div>
      <h2 className='tab-maintitle'>MY</h2>

      {/* 로그인 정보 */}
      <div className='my-login'>
        <p>떠나봅 님, 어시여 !</p>
        <span>thunabob@gmail.com</span>
      </div>

      {/* 아이콘 메뉴 */}
      <div className='my-menu1'>
        <div className='my-menu-check'>
          <Check className={'my-checkicon'}/>
          <span>체크리스트</span>
        </div>
        <div className='my-menu-like'>
          <Heart_stroke_red className={'my-likeicon'}/>
          <span>좋아요</span>
        </div>
        <div className='my-menu-activity'>
          <Activity className={'my-activityicon'}/>
          <span>나의활동</span>
        </div>
      </div>

      {/* 리스트 메뉴 */}
      <div className='my-menu2'>
        <div className='my-menu-trip'>
          <p>여행</p>
          <NavLink to=''></NavLink>
          <NavLink to='/planner'>나의 여행 보기</NavLink>
        </div>
        <div className='my-menu-help'>
          <p>고객센터</p>
          <NavLink to='/my/qna'>자주 묻는 질문</NavLink>
          <span>전화 걸기</span>
        </div>
      </div>

      <span>로그아웃</span>
    </div>
  )
}

export default My