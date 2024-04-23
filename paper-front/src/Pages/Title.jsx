import styles from '../css/Title.module.css';
import Menubar from '../Component/Menubar'
import mainImage from '../Image/main.png';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

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
    const maxLength = 12;

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

    return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Logo />
        <Menubar/>
          <h1>이야기를 만들어주세요!</h1>
        <div className={styles.inputStyle}>
        <input type="text" 
        placeholder="제목을 입력해주세요"
        value={inputValue} 
        onChange={handleChange}
        />
        {inputValue.length}/{maxLength}
        </div>
        <div className={styles.textbox}>
          <input type="text" placeholder='내용을 입력해주세요' value={textValue} onChange={textCh}/>
          {textValue.length}/{textLength}
        </div>
      </div>
    </div>  
    );
  }
  
export default Title;