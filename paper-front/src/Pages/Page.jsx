import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Page.module.css';
import Menubar from "../Component/Menubar/Header";

function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [inputValue, setInputValue] = useState('');
    let navigate = useNavigate();
    const [papers, setPapers] = useState([]); // 서버로부터 받은 데이터를 저장할 상태
    const [userEmail, setUserEmail] = useState(''); // 유저 이메일을 저장할 상태

    async function showPaper() {
        try {
            const response = await axios.get('http://localhost/main/v1/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            });
            setPapers(response.data.data); // 받아온 데이터를 상태에 저장
        } catch (error) {
            console.error("페이퍼 불러오기 실패", error);
        }
    }

    async function getUserEmail() {
        try {
            const response = await axios.get('http://localhost/main/v1/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setUserEmail(response.data.data); // 응답으로부터 이메일을 가져와 상태에 저장
        } catch (error) {
            console.error("유저 이메일 불러오기 실패", error);
        }
    }

    useEffect(() => {
        showPaper(); // 컴포넌트 마운트 시 데이터 불러오기
        getUserEmail(); // 컴포넌트 마운트 시 유저 이메일 불러오기
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

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
                        0개 작성
                    </div>
                    <session className={styles.post1}>
                        <div className={styles.post2}>
                            <div className={styles.postit}>
                                <div className={styles.postitcontext}>
                                    {papers.map(paper => (
                                        <div key={paper.id} className={styles.postit}>
                                            <div className={styles.postitcontext}>
                                                {paper.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </session>
                    <div className={styles.Write}></div>
                </div>
            </div>
        </div>
    );
}
export default Page;
