import React from 'react'
import { LoginContext } from './LoginContextProvider'
import { useContext } from 'react';

const LoginContextConsumer = () => {
    const {isLogin} = useContext(LoginContext);
    return (
        <div>
            <h3>로그인 여부 :{isLogin ? '로그인':'로그아웃'}</h3>
        </div>
    );
};
export default LoginContextConsumer;