import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContext';

const LoginContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false); // 초기값을 false로 설정

  function loginCheck() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      // 로그인된 상태
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setIsLogin(true);
    } else {
      // 로그인되지 않은 상태
      delete axios.defaults.headers.common['Authorization'];
      setIsLogin(false);
    }
  }

  async function login(email, password) {
    try {
      const response = await axios.post('http://localhost/auth/v1/login', {
        email,
        password,
      });
      const { status, data, headers } = response;
      if (status === 200) {
        // 로그인 성공 시 처리
        const accessToken = headers?.authorization?.replace('Bearer ', '');
        if (accessToken) {
          Cookies.set('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
          loginCheck(); // 로그인 체크 함수 호출
          alert('로그인 성공');
        } else {
          alert('로그인 실패: 액세스 토큰이 없습니다.');
        }
      } else {
        alert(`로그인 실패: ${data.message}`);
      }
    } catch (error) {
      console.error('로그인 에러', error);
      alert('로그인 에러 발생');
    }
  }
  
  async function logout() {
    try {
      await axios.post('http://localhost/auth/v1/logout', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      Cookies.remove('accessToken');
      loginCheck(); // 로그아웃 시 로그인 체크 함수 호출
    } catch (error) {
      console.error('로그아웃 에러', error);
      alert('로그아웃 에러 발생');
    }
  } 
  async function refreshToken() {
    try {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        const response = await axios.post('http://localhost/auth/v1/validate', {
          refreshToken,
        });
        const { status, headers } = response;
        if (status === 200) {
          const newAccessToken = headers?.authorization?.replace('Bearer ', '');
          if (newAccessToken) {
            Cookies.set('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            loginCheck(); // 로그인 체크 함수 호출
          } else {
            alert('리프레시 토큰 갱신 실패: 새 액세스 토큰이 없습니다.');
          }
        } else {
          alert('리프레시 토큰 갱신 실패');
        }
      } else {
        alert('리프레시 토큰이 없습니다.');
      }
    } catch (error) {
      console.error('리프레시 토큰 갱신 에러', error);
      alert('리프레시 토큰 갱신 에러 발생');
    }
  }
  
  useEffect(() => {
    loginCheck(); // 컴포넌트 마운트 시 로그인 체크 함수 호출
  }, []);

  return (
    <LoginContext.Provider value={{ isLogin, login, logout,refreshToken }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
