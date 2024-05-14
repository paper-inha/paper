import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Page.module.css';
import Menubar from "../Component/Menubar/Header";
import Modal from 'react-modal';

function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [inputValue, setInputValue] = useState('');
    let navigate = useNavigate();
    const [papers, setPapers] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    const getToken = () => {
        const loginType = localStorage.getItem('loginType'); // 로그인 유형 확인
        if (loginType === 'social') {
            return localStorage.getItem('socialAccessToken');
        } else {
            return localStorage.getItem('accessToken');
        }
    }

    async function showPaper() {
        try {
            const token = getToken();
            const response = await axios.get('http://localhost/main/v1/', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setPapers(response.data.data);
        } catch (error) {
            console.error("페이퍼 불러오기 실패", error);
        }
    }

    async function getUserEmail() {
        try {
            const token = getToken();
            const response = await axios.get('http://localhost/main/v1/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserEmail(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error("유저 이메일 불러오기 실패", error);
        }
    }

    useEffect(() => {
        showPaper();
        getUserEmail();
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.mainpage}>
                <div className={styles.container}>
                    <div className={styles.headerbox1}>
                        <div className={styles.headerbox2}>
                            <Menubar/>
                            <div>
                                <h1 className={styles.h1F}>{userEmail}</h1>
                            </div>
                        </div>
                        <div headerbox3></div>
                    </div>
                    <div className={styles.paperlistbox1}>
                        {papers.length}개 작성
                    </div>
                    <div className={styles.write} onClick={() => navigate('/Write')}>
                        <p>임시 글쓰기 추후 수정</p>
                    </div>
                    <section className={styles.post1}>
                        <div className={styles.post2}>
                            {papers.map(paper => (
                                <div key={paper.id} className={styles.postit}>
                                    <div className={styles.postitcontext}>
                                        {paper.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
export default Page;
