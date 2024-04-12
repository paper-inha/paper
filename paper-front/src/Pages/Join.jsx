import React from 'react';
import styles from '../css/JoinForm.module.css'; 
//import styles from '../css/JoinFormL.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Join() {
    useEffect(() => { //useEffect는 가장 기본적인 렌더링 최적화
      const link = document.createElement('link');
      link.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
  
      return () => {
        document.head.removeChild(link);
      };
    }, []);
    let navigate = useNavigate();
  
    function main(){
    navigate('/');
    }
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1 onClick={main} >회원가입</h1>
            <form action="">
              <div className={styles.inputbox}>
                <input type="text" placeholder="아이디" required />
                <i className='bx bxs-user'></i>
              </div>
              <div className={styles.inputbox}>
                <input type="password" placeholder="패스워드" required />
                <i className='bx bx-lock-alt'></i>
              </div>
              <div className={styles.inputbox}>
                <input type="password" placeholder="패스워드 확인" required />
                <i className='bx bx-lock-alt'></i>
              </div>
              <div className={styles.inputbox}>
                <input type="text" placeholder="닉네임" required />
              </div>
  
              <button type="submit" className={styles.btn}>회원가입</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
export default React.memo(Join);