import React from 'react';
import Menubar from '../Component/Menubar/Header';
import styles from '../css/User.module.css';


const User = () => {

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Menubar />
                <h1>마이페이지</h1>
                <div className={styles.box1}>
                    <div className={styles.boxs1}>
                    <p>rio214@naver.com</p>
                    <h2>rio214</h2>
                    </div>
                </div>
                <div className={styles.box2}>
                    <div className={styles.boxs2}>
                        <h3>작성글</h3>
                    </div>
                    <div className={styles.boxs2}>
                        <h3>알림</h3>
                    </div>
                </div>
                <div className={styles.box3}>
                    <div className={styles.box4}>
                        <div className={styles.boxs3}>
                            내가 만든 롤링
                        </div>
                        <div className={styles.boxs4}>
                            내가 쓴 롤
                        </div>
                    </div>
                </div>
                <div className={styles.box5}>

                </div>
            </div>
        </div>   
    )
}
export default User;