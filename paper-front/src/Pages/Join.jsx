import React, { useState, useEffect,useContext } from 'react';
import D from '../css/JoinFormD.module.css';
import L from '../css/JoinFormL.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { AuthContext } from '../Context/AuthContext';

function Join() {
    const { isDarkMode } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    let navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    async function getData(email, password, name) {
        try {
            const response = await axios.post('http://localhost/auth/v1/signup', {
                email,
                password,
                name
            });
            console.log(response);
            navigate('/Login'); // 회원가입 성공 후 로그인 페이지로 이동
        } catch (error) {
            console.error(error);
            let errorMessage = "회원가입 중 문제가 발생했습니다.";
            if (error.response && error.response.data) {
                // 백엔드에서 전달된 에러 메시지가 있다면 사용
                errorMessage = error.response.data.message || errorMessage;
            }
            // 사용자에게 에러 메시지 표시
            setModalMessage(errorMessage);
            setIsModalOpen(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== passwordConfirm){
            setModalMessage('패스워드가 일치하지 않습니다.');
            setIsModalOpen(true);
            return;
        }
        getData(email, password, name).then(r => console.log(r));
    };

    return (
        <div className={isDarkMode ? D.main : L.main}>
            <div className={isDarkMode ? D.container : L.container}>
                <div className={isDarkMode ? D.wrapper : L.wrapper}>
                    <h1 onClick={() => navigate('/')}>회원가입</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={isDarkMode ? D.inputbox : L.inputbox}>
                            <input type="text" placeholder="이메일" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className={isDarkMode ? D.inputbox : L.inputbox}>
                            <input type="password" placeholder="패스워드" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <i className='bx bx-lock-alt'></i>
                        </div>
                        <div className={isDarkMode ? D.inputbox : L.inputbox}>
                            <input type="password" placeholder="패스워드 확인" required value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
                            <i className='bx bx-lock-alt'></i>
                        </div>
                        <div className={isDarkMode ? D.inputbox : L.inputbox}>
                            <input type="text" placeholder="닉네임" required value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <button type="submit" className={isDarkMode ? D.btn : L.btn}>회원가입</button>
                    </form>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Error Modal"
                className={isDarkMode?D.modal:L.modal}
                overlayClassName={isDarkMode?D.modalOverlay: L.modal}
            >
                <div className={isDarkMode?D.modalContent:L.modal}>
                    <h2>Error</h2>
                    <p>{modalMessage}</p>
                    <button onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            </Modal>
        </div>
    );
}

export default React.memo(Join);