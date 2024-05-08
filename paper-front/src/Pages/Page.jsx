import styles from '../css/Page.module.css';
import Modal from '../Component/Modal';
import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Write from "./Write";
import Menubar from '../Component/Menubar/Header';
function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [inputValue, setInputValue] = useState('');
    let navigate = useNavigate();
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
                    <div className={styles.box1}>
                        <div className={styles.box2}>
                            <Menubar/>
                            <p>rio214</p> {/*사용자 이름 */}
                        </div>
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