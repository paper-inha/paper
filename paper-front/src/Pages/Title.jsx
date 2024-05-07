import styles from '../css/Title.module.css';

import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
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
                <h1>제목 입력</h1>
                <div className={styles.inputStyle}>
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
                <button type="button" onClick={onClickPage} className={styles.btn}>페이지 생성</button>
            </div>
        </form>
    </div>
    );
}

export default Title;