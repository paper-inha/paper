import React,{useState,useEffect} from 'react';
import Menubar from '../Component/Menubar/Header';
import styles from '../css/User.module.css';
import axios from 'axios';

const MyRollingResults = () => {
        // 페이지 리스트 불러오기 코드 구현
        return (
        <div>
            {/* 내가 만든 롤링 결과를 표시하는 UI */}
        </div>
        );
    };
    
    const MyPostsResults = () => {
        // 내가 쓴 페이퍼 불러오기 코드 구현
        return (
        <div>
            {/* 내가 쓴 글 결과를 표시하는 UI */}
        </div>
        );
    };
function User() {  
    const [activeTab, setActiveTab] = useState('posts'); // 초기 탭은 "작성글"
    const [showMyRolling, setShowMyRolling] = useState(false);
    const [showMyPosts, setShowMyPosts] = useState(false);
    const [rollingClass, setRollingClass] = useState(`${styles.boxs3}`);
    const [postsClass, setPostsClass] = useState(`${styles.boxs4}`);
    /*const [papers, setPapers] = useState([]);*/
    const [userEmail, setUserEmail] = useState('');
    const [userName,setUserName] = useState('');

    async function getName(){
        try{
            const reponse = await axios.get('http://localhost/auth/v1/name');
            setUserName(reponse.data.data);
        }catch (error){
            console.error("유저 이름 불러오기 실패", error);
        }
    }
    async function getUserEmail() {
        try {
            const response = await axios.get('http://localhost/main/v1/user',
            );
            setUserEmail(response.data.data);
        } catch (error) {
            console.error("유저 이메일 불러오기 실패", error);
        }
    }

    useEffect(() => {
        getUserEmail();
        getName();
    }, []);


    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    const handleMyRollingClick = () => {
      setShowMyRolling(true);
      setShowMyPosts(false);
      setRollingClass(`${styles.boxs3}`);
      setPostsClass(`${styles.boxs4}`);

    };
  
    const handleMyPostsClick = () => {
      setShowMyPosts(true);
      setShowMyRolling(false);
      setRollingClass(`${styles.boxs4}`);
      setPostsClass(`${styles.boxs3}`);
    };

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Menubar />
                <h1>마이페이지</h1>
                <div className={styles.box1}>
                    <div className={styles.boxs1}>
                    <p>{userEmail}</p>
                    <h2>{userName}</h2>
                    </div>
                </div>
                <div className={styles.box2}>
                    <div className={`${styles.boxs2} ${activeTab === 'posts' ? styles.active : ''}`}
                    onClick={() => handleTabClick('posts')}>
                        <h3>작성글</h3>
                    </div>
                    <div className={`${styles.boxs2} ${activeTab === 'notifications' ? styles.active : ''}`}
                    onClick={() => handleTabClick('notifications')}>
                        <h3>알림</h3>
                    </div>
                </div>
                <div className={styles.box3}>
                    {activeTab === 'posts' && (
                        <div className={styles.box4}>
                        <div className={rollingClass} onClick={handleMyRollingClick}>내가 만든 롤링</div>
                        <div className={postsClass} onClick={handleMyPostsClick}>내가 쓴 글</div>
                        </div>
                    )}
                    {activeTab === 'notifications' && (
                        <div className={styles.box4}>
                        <div className={styles.boxs3}>준비중인 기능입니다</div>
                        </div>
                    )}
                    </div>
                <div className={styles.box5}>
                {showMyRolling && <MyRollingResults />}
                {showMyPosts && <MyPostsResults />}
                </div>
            </div>
        </div>   
    )
}
export default User;