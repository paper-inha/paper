import React from 'react'
import Menubar from '../Component/Menubar/Header'
import styles from '../css/User.module.css';

const User = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Menubar />
                <h1>User</h1>
                    <hr />
                <h2>마이 페이지</h2>
            </div>
        </div>   
    )
}
export default User;