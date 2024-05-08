import React, {  useState } from 'react';
import { Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styles from '../../css/Menubar.module.css';
import {Link} from 'react-router-dom'
//import { LoginContext } from '../../Contexts/LoginContextProvider';
//import { useContext } from 'react';
const Menubar = () => {
  
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  //const {isLogin, logout} = useContext(LoginContext);
  
  return (
  <header>
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
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
          <ul>
            
            <>
            <li>
              <Menu.Item key="1">
                <Link to="/join">회원가입</Link>
              </Menu.Item>
            </li>
            <li>
              <Menu.Item key="2">
                <Link to="/login">로그인</Link>
              </Menu.Item>
            </li>
            <li>
              <Menu.Item key="3">
                <Link to="/view">소개</Link>
              </Menu.Item>
            </li>
            </>            
          <>
            <li>
              <Menu.Item key="4">
                <Link to="/user">마이페이지</Link>
              </Menu.Item>
            </li>
            <li>
              <Menu.Item key="5">
                <p>로그아웃</p>
              </Menu.Item>
            </li>
              </>
          </ul>
      </Menu>
      </Drawer>
    </div>
    </header>
  );
};

export default Menubar;