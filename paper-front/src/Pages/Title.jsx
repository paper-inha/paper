    import styles from '../css/Title.module.css';
    import React, {useContext, useState} from 'react';
    import {useNavigate} from "react-router-dom";
    import Menubar from '../Component/Menubar/Header';
    import mainImage from '../Image/main.png'
    import {AuthContext} from "../Context/AuthContext";

    const Logo = React.memo(function Logo() {

        let navigate = useNavigate();

        function handleClick(){
            navigate('/');
        }
        return (
            <img src={mainImage} className={styles.logo} alt='main' onClick={handleClick}/>
        );
    });

    function Title() {
        const maxLength = 12;
        const { inputValue, onClickPage, setInputValue } = useContext(AuthContext);

        const handleChange = (event) => {
            const { value } = event.target;
            if (value.length <= maxLength) {
                setInputValue(value);
            }
        };


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

    export default Title;
