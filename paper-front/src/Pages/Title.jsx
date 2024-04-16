import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import styles from '../css/Title.module.css';
import React, {useState} from 'react';
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

    return <SwaggerUI url="">(
    <div className={styles.main}>
      <div className={styles.container}>
          <h1>제목</h1>
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
    </SwaggerUI>
  }
  
export default Title;