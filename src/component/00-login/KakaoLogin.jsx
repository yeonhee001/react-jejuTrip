import React from 'react'

function KakaoLogin() {
  const kakao_url = 'https://kauth.kakao.com/oauth/authorize';

  const kakao_client_id = 'f86a88750c261ba4c1ffd8113fa7f753';
  const kakao_redirect_uri = `${process.env.REACT_APP_APIURL}/login/authkakao`;
  const kakao_response_type = 'code';
  
  // 인가 코드 받기
  function kakao_login() {
    // 응답
    window.location.href = kakao_url+`?client_id=${kakao_client_id}&redirect_uri=${kakao_redirect_uri}&response_type=${kakao_response_type}`
  }

  return (
    <>
      <p className='btn-kakao' onClick={kakao_login}>
        <img src="/imgs/login_kakao_01.png" alt="로그인btn-카카오" />
      </p>
    </>
  )
}

export default KakaoLogin