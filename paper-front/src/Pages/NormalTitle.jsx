
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

function NormalTitle() {
    const [inputValue, setInputValue] = useState('');
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
            localStorage.setItem('pageTitle', inputValue);
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
                    <div className={styles.btnbox}>
                        <button type="button" onClick={onClickPage} className={styles.btn}>페이지 생성</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default NormalTitle;

