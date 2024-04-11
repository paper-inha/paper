import React, { useState } from 'react';
import { Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styles from '../css/Menubar.module.css';
import { useNavigate } from 'react-router-dom';

const Menubar = () => {
  let navigate = useNavigate();
  
  function Joint(){
    navigate('/join');
  }
  function Logint(){
    navigate('/login');
  }
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button className={styles.topright}onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer
        theme="light"
        placement="right"
        onClick={onClose}
        onClose={onClose}
        visible={visible}
        >
        <Menu
          mode="inline"
          style={{height: "100%", borderRight: 0}}
        >
          <Menu.Item key="1" onClick={Joint}>회원가입</Menu.Item>
          <Menu.Item key="2" onClick={Logint}>로그인</Menu.Item>
          <Menu.Item key="3">마이페이지</Menu.Item>
        </Menu>
      </Drawer>
    </div>
  );
};

export default Menubar;