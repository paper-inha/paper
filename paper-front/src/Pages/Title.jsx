import styles from '../css/Title.module.css';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Menubar from '../Component/Menubar/Header';
import mainImage from '../Image/main.png'

const Logo = React.memo(function Logo() { // 렌더링 최적화를 위해 React.memo사용


    let navigate = useNavigate();

    function handleClick(){
      navigate('/');
    }
      return (
        <img src={mainImage} className={styles.logo} alt='main' onClick={handleClick}/>
      );
    });


function Title() {

    const [inputValue, setInputValue] = useState('');
    const [email, setEmail] = useState("");
    const maxLength = 12;
    const navigate = useNavigate();
    const handleChange = (event) => {
      const {value} = event.target;
      if (value.length <= maxLength){
        setInputValue(value);
      }
    };
    const [textValue,setTextValue] = useState('');
    const textLength = 50;
    const textCh = (event) => {
      const {value} = event.target;
      if (value.length <= textLength){
        setTextValue(value);
      }
    };
    useEffect(() => {
        // 서버로부터 액세스 토큰을 받아오는 함수
        const getAccessToken = async () => {
            try {
                const response = await axios.get('http://localhost/auth/oauth/token', {
                    withCredentials: true, // 이 요청에 쿠키나 인증 정보를 포함
                });
                // 받아온 토큰을 로컬 스토리지에 저장
                localStorage.setItem('accessToken', response.data.data.accessToken);
            } catch (error) {
                // 에러 처리
                console.error('토큰을 받아오는데 실패했습니다.', error);
            }
        };
        const checkTitleExistence = async () => {
            try {
                const response = await axios.get('/main/v1/validate', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
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
        };

        // 토큰 받아오기와 토큰을 이용한 추가 작업을 진행하는 함수
        const init = async () => {
            const tokenReceived = await getAccessToken();
            if (tokenReceived) {
                await checkTitleExistence(); // 비동기 처리를 위해 await 추가
            }
        };
        init();
    }, []);


    async function onClickPage() {
        try {
            const response = await axios.post('http://localhost/main/v1/page', {
                    title: inputValue
                },{
                headers: {  // 'headers'로 수정
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            });
            console.log("페이지 생성 성공");
            navigate("/Page");
        } catch (error) {
            console.error("페이지 생성 실패:", error);
            console.log("Bearer "+localStorage.getItem('accessToken'));
        }
    }
    return (
    <div className={styles.main}>
        <form>
            <div className={styles.container}>
                <Logo />
                <Menubar/>
                <h1>이야기를 만들어주세요!</h1>
                <div className={styles.inputbox}>
                    <input type="text"
                           placeholder="제목을 입력해주세요"
                           value={inputValue}
                           onChange={handleChange}
                    />
                    {inputValue.length}/{maxLength}
                </div>
                {/*<div className={styles.textbox}>*/}
                {/*    <input type="text" placeholder='내용을 입력해주세요' value={textValue} onChange={textCh}/>*/}
                {/*    {textValue.length}/{textLength}*/}
                {/*</div>*/}
                <div className={styles.btnbox}>
                <button type="button" onClick={onClickPage} className={styles.btn}>페이지 생성</button>
                </div>
            </div>
        </form>
    </div>
    );
}

export default Title;