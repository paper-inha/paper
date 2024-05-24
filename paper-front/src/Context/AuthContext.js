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
    const [papers, setPapers] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [showPaper, setShowPaper] = useState([]); // []
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
        setIsDarkMode(!isDarkMode);
    };

    const onLoginSuccess = async response => {
        const { accessToken } = response.data.data;
        //로컬스토리지에 엑세스토큰이 있다면 삭제하고 새로운 엑세스토큰을 저장
        if (localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
        }
        localStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setIsLoggedIn(true);
        setTimeout(silentRefresh, JWT_EXPIRY_TIME - 60000);
        await checkTitleExistence();
    }
        async function silentRefresh(){
            if (!isLoggedIn) return;
            try {
                const response = await axios.post('/auth/v1/refresh', {}, {
                    withCredentials: true,
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
            });
            await onLoginSuccess(response);
        } catch (error) {
            console.error('토큰 발급 오류', error);
        }
    }

    async function onClickPage() {
        try {
            const response = await axios.post('/main/v1/rolls/page', {
                title:inputValue,
            });
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
            await onLoginSuccess(response);
        } catch (error) {
            console.error('로그인 오류 :', error);
            for (const key in error) {
                if (error.hasOwnProperty(key)) {
                    console.log(`${key}: ${error[key]}`);
                }
            }
            console.error(JSON.stringify(error));
        }
    }

    async function handleLogout() {
        try {
            await axios.post('/auth/v1/logout');
            axios.defaults.headers.common['Authorization'] = '';
            setIsLoggedIn(false);
            localStorage.removeItem('accessToken');
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 오류 :', error);
        }
    }


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
                setInputValue,
                silentRefresh,
                showPaper,
                papers,setPapers,
                userEmail,setUserEmail,
                onLoginSuccess,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
