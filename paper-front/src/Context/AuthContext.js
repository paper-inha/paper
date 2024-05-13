import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoggedIn,setIsLoggedIn] = useState(false);
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
        if(response.data.status === 403){
          setModalMessage('아이디가 존재하지 않습니다 회원가입을 해주세요');
          setIsModalOpen(true);
        }
        console.log("엑세스토큰 확인 : " + response.data.data.accessToken);
        const accessToken  = response.data.data.accessToken;
        console.log("저장 전 엑세스토큰 : "+ accessToken);
        localStorage.setItem('accessToken', accessToken);
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
    
  return (
    <AuthContext.Provider value={{ email, setEmail, password, setPassword, isModalOpen, setIsModalOpen, modalMessage, setModalMessage, handleLogin, checkTitleExistence,isLoggedIn,setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
