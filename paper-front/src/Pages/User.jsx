import React, { useState, useEffect, useContext } from 'react';
import Menubar from '../Component/Menubar/Header';
import L from '../css/UserL.module.css';
import D from '../css/UserD.module.css';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const MyRollingResults = () => {
  return (
    <div>
      {/* 내가 만든 롤링 결과를 표시하는 UI */}
    </div>
  );
};

const MyPostsResults = () => {
  return (
    <div>
      {/* 내가 쓴 글 결과를 표시하는 UI */}
    </div>
  );
};

function User() {
  const [activeTab, setActiveTab] = useState('posts');
  const [showMyRolling, setShowMyRolling] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [rollingClass, setRollingClass] = useState('');
  const [postsClass, setPostsClass] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isDarkMode] = useContext(AuthContext);
  
  async function getName() {
    try {
      const response = await axios.get('http://localhost/auth/v1/name');
      setUserName(response.data.data);
    } catch (error) {
      console.error('유저 이름 불러오기 실패:', error);
    }
  }

  async function getUserEmail() {
    try {
      const response = await axios.get('http://localhost/main/v1/user');
      setUserEmail(response.data.data);
    } catch (error) {
      console.error('유저 이메일 불러오기 실패:', error);
    }
  }

  useEffect(() => {
    getUserEmail();
    getName();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const updateClassNames = () => {
    setRollingClass(`${isDarkMode ? D.boxs3 : L.boxs3}`);
    setPostsClass(`${isDarkMode ? D.boxs4 : L.boxs4}`);
  };

  const handleMyRollingClick = () => {
    setShowMyRolling(true);
    setShowMyPosts(false);
    updateClassNames();
  };

  const handleMyPostsClick = () => {
    setShowMyPosts(true);
    setShowMyRolling(false);
    updateClassNames();
  };

  return (
    <div className={isDarkMode ? D.main : L.main}>
      <div className={isDarkMode ? D.container : L.container}>
        <Menubar />
        <h1>마이페이지</h1>
        <div className={isDarkMode ? D.box1 : L.box1}>
          <div className={isDarkMode ? D.boxs1 : L.boxs1}>
            <p>{userEmail}</p>
            <h2>{userName}</h2>
          </div>
        </div>
        <div className={isDarkMode ? D.box2 : L.box2}>
          <div
            className={`${isDarkMode ? D.boxs2 : L.boxs2} ${
              activeTab === 'posts' ? (isDarkMode ? D.active : L.active) : ''
            }`}
            onClick={() => handleTabClick('posts')}
          >
            <h3>작성글</h3>
          </div>
          <div
            className={`${isDarkMode ? D.boxs2 : L.boxs2} ${
              activeTab === 'notifications' ? (isDarkMode ? D.active : L.active) : ''
            }`}
            onClick={() => handleTabClick('notifications')}
          >
            <h3>알림</h3>
          </div>
        </div>
        <div className={isDarkMode ? D.box3 : L.box3}>
          {activeTab === 'posts' && (
            <div className={isDarkMode ? D.box4 : L.box4}>
              <div className={rollingClass} onClick={handleMyRollingClick}>
                내가 만든 롤링
              </div>
              <div className={postsClass} onClick={handleMyPostsClick}>
                내가 쓴 글
              </div>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className={isDarkMode ? D.box4 : L.box4}>
              <div className={isDarkMode ? D.boxs3 : L.boxs3}>준비중인 기능입니다</div>
            </div>
          )}
        </div>
        <div className={isDarkMode ? D.box5 : L.box5}>
          {showMyRolling && <MyRollingResults />}
          {showMyPosts && <MyPostsResults />}
        </div>
      </div>
    </div>
  );
}

export default User;
