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
    const Rest_api_key = 'REST API KEY';
    const redirect_uri = 'http://localhost:3000/auth';
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = useCallback(() => {// useCallback을 이용해 렌더링 최적화
      window.location.href = kakaoURL;
    }, [kakaoURL]);

    return (
      <button className={styles.kakao} onClick={handleLogin}>
        <img src={KakaoLogo} alt="Kakao" style={{ marginRight: '10px', verticalAlign: 'middle', width: '20px', height: '20px' }} />
        카카오로 시작하기
      </button>
    );
  });

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const onClickLogin = () => {
    axios
      .post("http://localhost/auth/v1/login",{
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        console.log("res.data.userId :: ", res.data.userId);
        console.log("res.data.msg ::", res.data.msg);
        if (res.data.email === undefined){
          console.log("==============", res.data.msg);
          alert("입력하신 id 가 일치하지 않습니다.")
        } else if (res.data.email === null){
          console.log("====== 비밀번호 ======");
          alert("입력하신 비밀번호 가 일치하지 않습니다.")
        } else if (res.data.email === email){
          console.log("======================","로그인 성공");
          sessionStorage.setItem("user_id",email);
          sessionStorage.setItem("name",res.data.name);
        }
        document.location.href = "/title";
      })
      .catch();
  };

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
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Login);