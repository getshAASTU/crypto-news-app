import React, { useState, useEffect } from "react";
import { Button, Menu, Avatar, Typography } from "antd";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { Title } = Typography;
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  const handleClick = () => {
    setActiveMenu(!activeMenu);
  };
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <div className="logo-title">
          <Avatar src={icon} size="large" />
          <Title level={2} className="logo">
            <Link to="/">Cryptoverse</Link>
          </Title>
        </div>
        <Button className="toggle-btn" onClick={handleClick}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item   key="home" icon={<HomeOutlined style={{color:'white',fontSize:'18px'}}/>}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="cryptocurrencies" icon={<FundOutlined style={{color:'white',fontSize:'18px'}} />}>
            <Link to="/cryptocurrencies">CryptoCurrencies</Link>
          </Menu.Item>
          <Menu.Item key="news" icon={<BulbOutlined style={{color:'white',fontSize:'18px'}} />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
