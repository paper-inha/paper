import React, { useCallback,createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); // 다크모드 상태 추가
    let navigate = useNavigate();

    const axiosInstance = axios.create({
      baseURL: 'http://localhost'
    });

    const toggleDarkMode = () => { // 다크모드 토글 함수 추가
      setIsDarkMode(!isDarkMode);
    };

    axiosInstance.interceptors.request.use(
        config => {
          const accessToken = localStorage.getItem('accessToken');
          const socialAccessToken = localStorage.getItem('socialAccessToken');
          if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }else if (socialAccessToken){
            config.headers['Authorization'] = `Bearer${socialAccessToken}`;
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        }
    );
    
    const handleKakaoLogin = useCallback(async () => {
      try {
        // 카카오 로그인 프로세스 시작
        const BACKEND_OAUTH2_KAKAO_URL = process.env.REACT_APP_BACKEND_OAUTH2_KAKAO_URL;
        window.location.href = BACKEND_OAUTH2_KAKAO_URL;
    
        // 로그인 성공 후 setIsLoggedIn(true) 호출
        setIsLoggedIn(true);
        localStorage.setItem('loginType', 'social');
        localStorage.setItem('socialAccessToken', 'your_social_access_token_here');
      } catch (error) {
        console.error('Kakao login error:', error);
      }
    }, []);

    const handleGoogleLogin = useCallback(async () => {
      try {
        // 구글 로그인 프로세스 시작
        const BACKEND_OAUTH2_GOOGLE_URL = process.env.REACT_APP_BACKEND_OAUTH2_GOOGLE_URL;
        window.location.href = BACKEND_OAUTH2_GOOGLE_URL;
    
        // 로그인 성공 후 setIsLoggedIn(true) 호출
        setIsLoggedIn(true);
        localStorage.setItem('loginType', 'social');
        localStorage.setItem('socialAccessToken', 'your_social_access_token_here');
      } catch (error) {
        console.error('Google login error:', error);
      }
    }, []);

    async function handleLogin() {
      try {
        const response = await axiosInstance.post('/auth/v1/login', {
          email,
          password,
        });
        if(response.data.status === 403){
          setModalMessage('아이디가 존재하지 않습니다 회원가입을 해주세요');
          setIsModalOpen(true);
        }
        console.log("엑세스토큰 확인 : " + response.data.data.accessToken);
        const accessToken  = response.data.data.accessToken;
        console.log("저장 전 엑세스토큰 : "+ accessToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('loginType', 'normal');
        setIsLoggedIn(true);
        await checkTitleExistence();
      } catch (error) {
        if(error.response && error.response.data.status === 403){
          setModalMessage('아이디가 존재하지 않습니다 회원가입을 해주세요');
          setIsModalOpen(true);
        } else {
          setModalMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
          setIsModalOpen(true);
        }
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
          navigate("/NormalTitle");
        }
      } catch (error) {
        console.error("에러내용", error);
      }
    }
    async function handleLogout() {
      try {
        await axiosInstance.post('/auth/v1/logout', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        // 로그아웃 성공 시 수행할 작업
        localStorage.removeItem('accessToken');
        localStorage.removeItem('socialAccessToken');
        localStorage.removeItem('loginType');
        setIsLoggedIn(false);
        navigate('/login');
      } catch (error) {
        console.error('로그아웃 에러:', error);
        // 로그아웃 실패 시 수행할 작업
      }
    }

  return (
    <AuthContext.Provider value={{ email, setEmail, password, setPassword, isModalOpen, setIsModalOpen, modalMessage, setModalMessage, handleLogin, checkTitleExistence,isLoggedIn,setIsLoggedIn,handleLogout,handleKakaoLogin,handleGoogleLogin,isDarkMode, toggleDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
};
