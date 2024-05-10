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
        <div className={styles.mainpage}>
                <div className={styles.container}>
                    <div className={styles.headerbox1}>
                        <div className={styles.headerbox2}>
                            <Menubar/>
                            <h1 className={styles.h1F}>rio214</h1> {/*사용자 이름 */}
                        </div>
                        <div headerbox3></div>
                    </div>
                    <div className={styles.paperlistbox1}>
                        0개 작성 {/*페이퍼 리스트 개수 */}
                    </div>
                    <session className={styles.post1}>
                        <div className={styles.post2}>
                            <div className={styles.postit}>
                                <div className={styles.postitcontext}>
                                    아아 안녕하세요{/*포스트잇이 들어갈 자리 */}
                                </div>
                            </div>
                        </div>
                    </session>
                    <div className={styles.Write}></div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Write closeModal={closeModal} />
            </Modal>
        </div>
        </div>
    );
}
export default Page;