import Menubar from '../Component/Menubar'
import styles from '../css/App.module.css';
import backImage from '../Image/back.jpg';
import { useNavigate } from 'react-router-dom';
import menuImage from '../Image/menu.png';

function Home() {
  let navigate = useNavigate();
  
  function handleClick(){
    navigate('/login');
  }
    return (
    <div style=
    {{ backgroundImage: `url(${backImage})`,
    width: '414px',
    height: '491px'
    }} 
    className={styles.container}>
    <Menubar/> 
    <img src={menuImage} className={styles.menuBar} style={{ width: "130px", height: "130px" }} alt='menu' />
      <div>
        <p className={styles.introduce}>
          여러분의 친구들과
          이야기를 만들어주세요!
        </p>
      </div>
      <button onClick={handleClick} className={styles.btn} type="button">롤링페이퍼 시작하기</button>
    </div>
  );
}

export default Home;
