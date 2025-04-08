import React from 'react'
import "../../styles/00-login/login.scss";
import KakaoLogin from '../../component/00-login/KakaoLogin';

function Login() {
  return (
    <div>
      <div className='maintxt'>
        <h2>어디서든 제주,<br/>언제든</h2>
        <p><img src="/imgs/logo_blue.svg" alt="로고(blue)" /></p>
      </div>

      <div className='loginbtns'>
        <p>
          <img src="/imgs/login_naver_01.png" alt="로그인btn-네이버" />
        </p>
        <KakaoLogin/>
        <p>
          <img src="/imgs/login_google_01.png" alt="로그인btn-구글" />
        </p>
        <span>로그인 하지 않고 둘러보기 →</span>
      </div>
      
    </div>
  )
}

export default Login