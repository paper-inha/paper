import styles from '../css/Title.module.css';
import Modal from '../Component/Modal';
import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Write from "./Write";
function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [inputValue, setInputValue] = useState('');

    async function showPaper() {
        try {
            const response = await axios.get('http://localhost/main/v1/', {
                headers: {  // 'headers'로 수정
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            });
        } catch (error) {
            console.error("페이지 불러오기 실패", error);
        }
    }
    return (
        <div className={styles.main}>
            <form>
                <div className={styles.container}>
                    <h1>페이지 테스트</h1>
                    <div className={styles.main}>
                        <button type="button" onClick={showPaper} className={styles.btn}>페이퍼 불러오기</button>
                    </div>
                </div>
            </form>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Write closeModal={closeModal} />
            </Modal>
        </div>
    );
}
export default Page;