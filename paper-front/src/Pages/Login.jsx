import React, {useCallback, useContext} from 'react';
import D from '../css/LoginFormD.module.css';
import L from '../css/LoginFormL.module.css';
import mainImage from '../Image/main.png';
import KakaoLogo from '../Image/kakao.png';
import GoogleLogo from '../Image/google.png';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { AuthContext } from '../Context/AuthContext';



const Logo = React.memo(function Logo() {
  const { isDarkMode } = useContext(AuthContext);
  let navigate = useNavigate();
  function handleClick(){
    navigate('/');
  }
  return (
      <img src={mainImage} className={isDarkMode?D.logo:L.logo} alt='main' onClick={handleClick}/>
  );
});

const SocialKakao = React.memo(function SocialKakao() {
  const { isDarkMode } = useContext(AuthContext);
  const { handleKakaoLogin } = useContext(AuthContext);

  return (
      <button className={isDarkMode?D.kakao:L.kakao} onClick={handleKakaoLogin}>
        <img src={KakaoLogo} alt="Kakao" style={{ marginRight: '10px', verticalAlign: 'middle', width: '20px', height: '20px' }} />
        카카오로 시작하기
      </button>
  );
});

const SocialGoogle = React.memo(function SocialGoogle() {
  const { handleGoogleLogin } = useContext(AuthContext);
  const { isDarkMode } = useContext(AuthContext);
  return (
      <button className={isDarkMode?D.google:L.google} onClick={handleGoogleLogin}>
        <img src={GoogleLogo} alt="google" style={{ marginRight: '10px', verticalAlign: 'middle', width: '20px', height: '20px' }} />
        구글로 시작하기
      </button>
  );
});

function Login() {
  const { isDarkMode } = useContext(AuthContext);
  const { email, setEmail, password, setPassword, isModalOpen, setIsModalOpen, modalMessage, handleLogin, isLoggedIn } = useContext(AuthContext);

  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const axiosInstance = axios.create({
    baseURL: 'http://localhost'
  });
  axiosInstance.interceptors.request.use(
      config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
  );
  async function handleLogin() {
    try {
      const response = await axiosInstance.post('/auth/v1/login', {
        email,
        password,
      });
      if(response.data.status === 403){
        setModalMessage('아이디가 존재하지 않습니다 회원가입을 해주세요');
        setIsModalOpen(true);
      }
      console.log("엑세스토큰 확인 : " + response.data.data.accessToken);
      const accessToken  = response.data.data.accessToken;
      console.log("저장 전 엑세스토큰 : "+ accessToken);
      localStorage.setItem('accessToken', accessToken);
      await checkTitleExistence();
    } catch (error) {
      if(error.response && error.response.data.status === 403){
        setModalMessage('아이디가 존재하지 않습니다 회원가입을 해주세요');
        setIsModalOpen(true);
      } else {
        setModalMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
        setIsModalOpen(true);
      }
    }
  }
  async function checkTitleExistence() {
    try {
      const response = await axiosInstance.get('/main/v1/validate', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(response.data);
      if (response.data) {
        console.log("페이지가 있습니다.");
        navigate("/Page");
      } else {
        console.log("페이지가 없습니다.");
        navigate("/NormalTitle");
      }
    } catch (error) {
      console.error("에러내용", error);
    }
  }
  */
  return (
      <div className={isDarkMode ? D.main : L.main}>
        <div className={isDarkMode ? D.container : L.container}>
          <Logo />
          <div className={isDarkMode ? D.wrapper : L.wrapper}>
            <h1>로그인</h1>
            <form>
              <div className={isDarkMode ? D.inputbox: L.inputbox}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
                <i className='bx bxs-user'></i>
              </div>
              <div className={isDarkMode ? D.inputbox: L.inputbox}>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="패스워드" required />
                <i className='bx bx-lock-alt'></i>
              </div>
              <div className={isDarkMode ? D.rememberforgot : L.rememberforgot}>
                <label>
                  <input type="checkbox" />아이디를 저장
                </label>
                <a href="/join">회원이 아니신가요?</a>
              </div>

              <button type="button" onClick={handleLogin} className={isDarkMode ? D.btn : L.btn}>로그인</button>
              <SocialKakao />
              <SocialGoogle/>
            </form>
          </div>
        </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Error Modal"
            className={L.modal}
            overlayClassName={L.modalOverlay}
        >
          <div className={L.modalContent}>
            <h2>Error</h2>
            <p>{modalMessage}</p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </Modal>

      </div>
  );
}

export default React.memo(Login);