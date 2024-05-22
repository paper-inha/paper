import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Page.module.css';
import Menubar from "../Component/Menubar/Header";
import Modal from 'react-modal';
import Write from './Write';
import Share from '../Image/share.png';
import Plus from '../Image/plus.png';
import {AuthContext} from "../Context/AuthContext";

function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { silentRefresh,showPaper,getUserEmail ,papers,userEmail} = useContext(AuthContext);

    useEffect(() => {
        const initialize = async () => {
            await silentRefresh();
            await showPaper();
            await getUserEmail();
        };
        initialize();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div id="wrap">
            <div className={styles.main}>
                <div className={styles.mainpage}>
                    <div className={styles.container}>
                        <div className={styles.headerbox1}>
                            <div className={styles.headerbox2}>
                                <img src={Share} className={styles.img}/>
                                <h1 className={styles.h1F}>{userEmail}</h1>
                                <Menubar/>
                            </div>
                            <div headerbox3></div>
                        </div>
                        <div className={styles.paperlistbox1}>
                            {papers.length}개 작성
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
                                <div className={styles.postbox}></div>
                            </div>
                        </section>
                        <div className={styles.write} >
                            <div className={styles.writebtn}>
                                <img src={Plus} width="24" height="24" onClick={openModal}/>
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
