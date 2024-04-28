import React, { createContext, useState, useEffect } from 'react';

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContext';

const LoginContextProvider = ({ children }) => {
  // context value: 로그인 여부, 로그아웃 함수
  const [isLogin, setIsLogin] = useState(false); // 초기값을 false로 설정

  const logout = () => {
    setIsLogin(false);
  };
  useEffect(()=> {
    setTimeout(()=>{
        setIsLogin(true);
    },3000);
  },[]);

  return (
    <LoginContext.Provider value={{ isLogin, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
