import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styles from '../css/Page.module.css'; // 스타일이 정의된 파일 임포트
import Menubar from '../Component/Menubar/Header'; // Menubar 컴포넌트 임포트
import Plus from '../Image/plus.png'; // Plus 이미지 임포트
import Write from '../Pages/Write.jsx'; // Write 컴포넌트 임포트
import Share from '../Image/share.png';
import { AuthContext } from "../Context/AuthContext";

function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [showPages, setShowPages] = useState([]);
    const [pageId, setPageId] = useState(0);
    const [papers,setPapers] = useState([]);
    const [title, setTitle] = useState('');

    const getPageId = async () => {
        try {
            const response = await axios.get('http://localhost/main/v1/rolls/id', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('페이지 아이디 불러오기 실패', error);
            throw error;
        }
    };

    const showPage = async (id) => {
        try {
            const response = await axios.get(`http://localhost/main/v1/rolls/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setShowPages(response.data);
            setTitle(response.data.title);
            setPapers(response.data.content);
        } catch (error) {
            console.error('페이지 불러오기 실패', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        const initialize = async () => {
            try {
                const id = await getPageId();
                setPageId(id);
                await showPage(id);
            } catch (error) {
                console.error('Error during initialization', error);
            }
        };
        initialize();
    }, []);

    return (
        <div id="wrap">
            <div className={styles.main}>
                <div className={styles.mainpage}>
                    <div className={styles.container}>
                        <div className={styles.headerbox1}>
                            <div className={styles.headerbox2}>
                                <img src={Share} className={styles.img} alt="Share" />
                                <h1 className={styles.h1F}>{title}</h1>
                                <Menubar />
                            </div>
                            <div className={styles.headerbox3}></div>
                        </div>
                        <div className={styles.paperlistbox1}>
                            {papers.length}개 작성
                        </div>
                        <section className={styles.post1}>
                            <div className={styles.post2}>
                                {papers.map((content, index) => (
                                    <div key={index} className={styles.postit}>
                                        <div className={styles.postitcontext}>
                                            {content}
                                        </div>
                                    </div>
                                ))}
                                <div className={styles.postbox}></div>
                            </div>
                        </section>
                        <div className={styles.write}>
                            <div className={styles.writebtn}>
                                <img src={Plus} width="24" height="24" onClick={openModal} alt="Plus" />
                                <Modal
                                    isOpen={isModalOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Write Modal"
                                >
                                    <Write closeModal={closeModal} />
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
