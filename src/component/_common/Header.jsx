import React from 'react'
import Arrow from '../icons/Arrow'
import List from '../icons/List'
import Search from '../icons/Search'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'


function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const pathname = location.pathname;
  const slash = pathname.split('/').length - 1; // '/'의 개수 세기

  let head;
  if(pathname==='/'){
    head = <img src='/imgs/logo_blue.svg' alt=''/>;
  } else if (slash >= 2) {
    head = <Arrow className={'header-back'} onClick={()=>navigate(-1)}/>;
  } else {
    head = "";
  }

  const hiddenPaths = ["/login", "/community/cmpostpage", "/community/cmsubjectpage", "/search", "/search/searchdetail"];
  // location이 pathname을 가지고 있어서 안보이게 할 페이지를 지정
  const hideHeader = hiddenPaths.includes(location.pathname);

  if (hideHeader) return null; // 해당 경로가 true일 때 렌더링 X

  return (
    <header className='header'>
      <h2> {head} </h2>
      <div className='header-rig'>
        <NavLink to='/search'>
          <Search className={'header-search'}/>
        </NavLink>
        <List className={'header-list'}/>
      </div>
    </header>
  )
}

export default Header