import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Right_blue from '../icons/Right_blue';
import Close from '../icons/Close';

function  Burger() {
  const [isOpen, setIsOpen] = useState(true);
  //22줄
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // 컴포넌트가 마운트될 때 로그인 상태 확인
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);
  //////////////////////////

  
  const navigate = useNavigate();
  //useNavigate 내부페이지로 이동시키는 훅
  
  const toggleMenu = () => {setIsOpen(!isOpen);};
  //toggleMeun 열고닫는함수

  if (!isOpen) return null;


  // 메뉴별 이동할 URL 설정 (카테고리 추가)
  const menuLinks = {
    "Home": "/",
    "여행지": { path: "/trip/tripList", category: "c1" },
    "맛집": { path: "/trip/tripList", category: "c4" },
    "축제행사": { path: "/trip/tripList", category: "c5" },
    "떠나톡": { path: "/community" },
    "버스시간표": "https://bus.jeju.go.kr/search/line",
    "로그인": {path: "/login"},
  };

  // 페이지 이동 함수
  const handleNavigation = (item) => {
    if (item === "버스시간표") {
      window.location.href = menuLinks[item];
      //외부사이트는 window.location.href을 이용하여 이동시킴
      //item 이 버스시간표일때 해당 url로 이동
    } else if (menuLinks[item].category) {
      // 메뉴링크안에 카테고리가 들어가있는것들
      const category = `${menuLinks[item].path}?category=${menuLinks[item].category}`;

      window.localStorage.Burger = item;

      //사용자가 마지막에 클릭한 카테고리의 값을 로컬스토리지에 저장시킴
      //  Buerger =key, item = value
      
      navigate(category);
      //10줄
    } else {
      // 메뉴링크안에 path만 있는애들
      window.localStorage.Burger = item;
      //사용자가 마지막에 클릭한 카테고리의 key,value값을 로컬스토리지에 저장시킴
      //  Buerger =key, item = value
      navigate(menuLinks[item].path);
      //15줄
    }
    toggleMenu(); 
    //  메뉴 닫기
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
    toggleMenu();
  };
  //////////////////////

  return (
    <div className="burger">
      <div className="close" onClick={toggleMenu}>
        <Close className={"burger_close"}/>
      </div>

      <ul>
        {Object.keys(menuLinks).map((item, index) => (
          item !== "로그인" && (
            <li key={index} className="menu-item" onClick={() => handleNavigation(item)}>
              <span>{item}</span>
              <Right_blue />
            </li>
          )
        ))}
      </ul>

      {/* 로그인 버튼 */}
      <div className="login" onClick={isLoggedIn ? handleLogout : () => handleNavigation("로그인")}>
        {/* 로그인버튼 클릭 시  
        handleNavigation이 meunLinks로 이동후 item값이 "로그인"인곳을 
        찾아path를 통해 /login페이지로 이동시킴 */}
        <span>{isLoggedIn ? "로그아웃" : "로그인"}</span>
      </div>
    </div>
  );
}

export default Burger;
