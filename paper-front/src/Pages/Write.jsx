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
        <div id="wrap">
            <div className={styles.main}>
                <div className={styles.mainpage}>
                    <div className={styles.container}>
                        <session className={styles.box1}>
                            <session className={styles.box2}>
                                    <span className={styles.cancle}>취소</span>{/*네비게이트로 뒤로가기 */}
                                <div className={styles.nextbox}>
                                    <span className={styles.next}>다음</span>{/*이동시 context 색깔 선택*/}
                                </div>
                                <br></br>
                            </session>
                            <div className={styles.contextbox}>
                                <div className={styles.contextbox2}>
                                <textarea color="#000000" spellCheck="false"  stype="height:94px;"
                                className={styles.context} value={inputValue} onchange={handleChange}></textarea>
                                </div>
                                <div className={styles.contextbox3}>
                                    <span className={styles.hidden}>익명으로 작성하기</span>
                                    <button>on</button>{/*익명 기능 추가 */}
                                </div>
                                <div className={styles.contextbox4}>
                                </div>
                            </div>
                            <div className={styles.btnbox}>
                            <button className={styles.btn} color="dark"onClick={onClickPage} >페이퍼 생성</button>
                            </div>
                        </session>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;