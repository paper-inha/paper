import Menubar from '../Component/Menubar/Header'
import styles from '../css/Home.module.css';
import { useNavigate } from 'react-router-dom';
import menuImage from '../Image/menu.png';

function Home() {
  let navigate = useNavigate();

  function handleClick(){
    navigate('/login');
  }
  return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Menubar/>
          <img src={menuImage} className={styles.menuBar} alt='menu' />
          <div>
            <p className={styles.introduce}>
              여러분의 친구들과
              이야기를 만들어주세요!
            </p>
          </div>
          <button onClick={handleClick} className={styles.btn} type="button">롤링페이퍼 시작하기</button>
        </div>
      </div>
  );
}

export default Home;
