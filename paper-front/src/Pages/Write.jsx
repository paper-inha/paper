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
                    <session className={styles.box1}>
                        <session className={styles.box2}>
                            <div className={styles.cancle}>
                                취소{/*네비게이트로 뒤로가기 */}
                            </div>
                            <div className={styles.next}>
                                다음{/*이동시 context 색깔 선택*/}
                            </div>
                            
                        </session>
                        <div className={styles.contextbox}>
                            <div className={styles.contextbox2}>
                            <textarea className={styles.context} value={inputValue} onchange={handleChange}></textarea>
                            </div>
                        </div>
                    </session>
                </div>
                <button type="button" onClick={onClickPage} className={styles.btn}>페이퍼 생성</button>
            </form>
        </div>
    );
}

export default Write;