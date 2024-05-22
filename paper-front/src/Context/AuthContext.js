import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import handleSocialLogin from '../Pages/AuthCallback';

export const AuthContext = createContext();

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    let navigate = useNavigate();

    axios.defaults.baseURL = 'http://localhost'; // 기본 URL 설정

    axios.interceptors.request.use(
        config => {
            const accessToken = axios.defaults.headers.common['Authorization'];
            if (accessToken) {
                config.headers['Authorization'] = accessToken;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    const toggleDarkMode = () => {
        console.log("toggleDarkMode 실행");
        setIsDarkMode(!isDarkMode);
    };

    const onLoginSuccess = async response => {
        const { accessToken } = response.data.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setIsLoggedIn(true);
        setTimeout(silentRefresh, JWT_EXPIRY_TIME - 60000);
        await checkTitleExistence();
    }

    const silentRefresh = async () => {
        if (!isLoggedIn) return;
        try {
            const response = await axios.post('/auth/v1/refresh', {}, {
                headers: {
                    Authorization: `Bearer ${axios.defaults.headers.common['Authorization']}`
                }
            });
            await onLoginSuccess(response.data);
        } catch (error) {
            console.error('토큰 발급 오류', error);
            await handleLogout();
        }
    }
    async function onClickPage() {
        try {
            const response = await axios.post('/main/v1/page', {
                title:inputValue,
            });
            console.log("페이지 생성 성공:", response.data)
            navigate("/Page");
        } catch (error) {
            console.error("페이지 생성 실패:", error);
        }
    }
    async function checkTitleExistence() {
        try {
            const response = await axios.get('/main/v1/validate');
            if (response.data) {
                navigate("/Page");
            } else {
                navigate("/Title");
            }
        } catch (error) {
            console.error("오류", error);
        }
    }

    async function handleLogin(email, password) {
        try {
            const response = await axios.post('/auth/v1/login', {
                email,
                password,
            });
            console.log(response.data);
            await onLoginSuccess(response);
        } catch (error) {
            console.log("handleLogin 함수 실행", email, password);
            console.error('로그인 오류 :', error);
            // 에러 객체의 세부 내용을 출력하기 위한 for문
            for (const key in error) {
                if (error.hasOwnProperty(key)) {
                    console.log(`${key}: ${error[key]}`);
                }
            }
            // 추가로 error 객체의 depth를 확인하기 위해 JSON.stringify 사용
            console.log("에러 객체의 세부 내용:", JSON.stringify(error, null, 2));
        }
    }

    async function handleLogout() {
        try {
            console.log('로그아웃 시도');
            await axios.post('/auth/v1/logout');
            axios.defaults.headers.common['Authorization'] = '';
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 오류 :', error);
        }
    }

    useEffect(() => {
        silentRefresh().then(() => console.log('silent refresh done'));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                isModalOpen,
                setIsModalOpen,
                modalMessage,
                setModalMessage,
                handleLogin,
                isLoggedIn,
                setIsLoggedIn,
                handleSocialLogin,
                toggleDarkMode,
                isDarkMode,
                onClickPage,
                inputValue,
                setInputValue
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
