import React from 'react'
import "../../styles/00-login/login.scss";
import KakaoLogin from '../../component/00-login/KakaoLogin';
import { NavLink } from 'react-router-dom';
import NaverLogin from '../../component/00-login/NaverLogin';
import GoogleLogin from '../../component/00-login/GoogleLogin';

function Login() {
  return (
    <div className='login-page'>
      <div className='maintxt'>
        <h2>어디서든 제주,<br/>언제든</h2>
        <p><img src="/imgs/logo_blue.svg" alt="로고(blue)" /></p>
      </div>

      <div className='loginbtns'>
        <NaverLogin/>
        <KakaoLogin/>
        <GoogleLogin/>
        
        <NavLink to='/'>
          <span>로그인 하지 않고 둘러보기 →</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Login