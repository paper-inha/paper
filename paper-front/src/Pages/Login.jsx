import React, { useCallback, useState } from 'react';
import styles from '../css/LoginForm.module.css';
import mainImage from '../Image/main.png';
import KakaoLogo from '../Image/kakao.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Logo = React.memo(function Logo() { // 렌더링 최적화를 위해 React.memo사용

  let navigate = useNavigate();
  
  function handleClick(){
    navigate('/');
  }
    return (
      <img src={mainImage} className={styles.logo} alt='main' onClick={handleClick}/>
    );
  });

const SocialKakao = React.memo(function SocialKakao() {
  // 로컬호스트의 백엔드 서버를 통해 카카오 로그인을 시작하는 URL
  const BACKEND_OAUTH2_KAKAO_URL = process.env.REACT_APP_BACKEND_OAUTH2_KAKAO_URL;
  const handleLogin = useCallback(() => {
    // 백엔드 서버를 통한 로그인 프로세스 시작
    window.location.href = BACKEND_OAUTH2_KAKAO_URL;
  }, [BACKEND_OAUTH2_KAKAO_URL]);
  return (
      <button className={styles.kakao} onClick={handleLogin}>
        <img src={KakaoLogo} alt="Kakao" style={{ marginRight: '10px', verticalAlign: 'middle', width: '20px', height: '20px' }} />
        카카오로 시작하기
      </button>
  );
});

const SocialGoogle = React.memo(function SocialGoogle() {
  const BACKEND_OAUTH2_GOOGLE_URL = process.env.REACT_APP_BACKEND_OAUTH2_GOOGLE_URL;
  const handleLogin = useCallback(() => {
    window.location.href = BACKEND_OAUTH2_GOOGLE_URL;
  }, [BACKEND_OAUTH2_GOOGLE_URL]);
  return (
      <button className={styles.google} onClick={handleLogin}>
        <i className='bx bxl-google' style={{ marginRight: '10px', verticalAlign: 'middle' }}></i>
        구글로 시작하기
      </button>
  );
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  async function onClickLogin(){
    try{
      const response = await axios.post('http://localhost/auth/v1/login', {
        email,
        password,
      });
      const { accessToken } = response.data.data;
      console.log(accessToken);
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      // 로그인 성공 후 메인 페이지로 이동
      navigate("/Title");
    }catch(error) {
      console.error("로그인 실패:", error);
    }
  }
  useEffect(() => { //useEffect는 가장 기본적인 렌더링 최적화
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
  

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.wrapper}>
          <h1>로그인</h1>
          <form>
            <div className={styles.inputbox}>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
              <i className='bx bxs-user'></i>
            </div>
            <div className={styles.inputbox}>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="패스워드" required />
              <i className='bx bx-lock-alt'></i>
            </div>
            <div className={styles.rememberforgot}>
              <label>
                <input type="checkbox" />아이디를 저장
              </label>
              <a href="join">회원이 아니신가요?</a>
            </div>

            <button type="button" onClick={onClickLogin} className={styles.btn}>로그인</button>
            <SocialKakao />
            <SocialGoogle/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Login);