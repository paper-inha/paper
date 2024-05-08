import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "../css/Write.module.css";


function Write() {
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

    async function onClickPage(){
        try{
            const response = await axios.post('http://localhost/main/v1/paper', {
                content:inputValue
            });
            // 로그인 성공 후 메인 페이지로 이동
            navigate("/Page");
        }catch(error) {
            console.error("페이퍼 생성 실패:", error);
        }
    }
    return (
        <div className={styles.main}>
            <form>
                <div className={styles.container}>
                    <h1>제목 입력</h1>
                    <div className={styles.inputStyle}>
                        <input type="text"
                               placeholder="페이퍼 내용을 입력해주세요"
                               value={inputValue}
                               onChange={handleChange}
                        />
                        {inputValue.length}/{maxLength}
                    </div>
                </div>
                <button type="button" onClick={onClickPage} className={styles.btn}>페이지 생성</button>
            </form>
        </div>
    );
}

export default Write;