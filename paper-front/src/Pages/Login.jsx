import React, { useCallback, useState } from 'react';
import styles from '../css/LoginForm.module.css';
import mainImage from '../Image/main.png';
import KakaoLogo from '../Image/kakao.png';
import GoogleLogo from '../Image/google.png';
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
        <img src={GoogleLogo} alt="google" style={{ marginRight: '10px', verticalAlign: 'middle', width: '20px', height: '20px' }} />
        구글로 시작하기
      </button>
  );
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const axiosInstance = axios.create({
    baseURL: 'http://localhost'
  });
  axiosInstance.interceptors.request.use(
      config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
  );
  async function handleLogin() {
    try {
      const response = await axiosInstance.post('/auth/v1/login', {
        email,
        password,
      });
      console.log(response.data.data.accessToken);
      const { accessToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      await checkTitleExistence();
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  }
  async function checkTitleExistence() {
    try {
      const response = await axiosInstance.get('/main/v1/validate', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(response.data);
      if (response.data) {
        console.log("페이지가 있습니다.");
        navigate("/Page");
      } else {
        console.log("페이지가 없습니다.");
        navigate("/Title");
      }
    } catch (error) {
      console.error("에러내용", error);
    }
  }
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
                <a href="/join">회원이 아니신가요?</a>
              </div>

              <button type="button" onClick={handleLogin} className={styles.btn}>로그인</button>
              <SocialKakao />
              <SocialGoogle/>
            </form>
          </div>
        </div>
      </div>
  );
}

export default React.memo(Login);