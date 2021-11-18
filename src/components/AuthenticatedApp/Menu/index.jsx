import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '@/context/auth-context';
import tplogo from '@/assets/logo.svg';
import './index.css';

export default class Menu extends Component {
  state = {
    logoutShow: false,
  };

  static contextType = AuthContext;

  setLogoutShow = (logoutShow) => {
    this.setState({
      logoutShow: !logoutShow,
    });
  };

  handleLogout = () => {
    const { logout } = this.context;
    logout();
  };

  render() {
    const { logoutShow } = this.state;
    return (
      <div id="menu">
        <div id="menu-fun">
          <div id="tp-logo">
            <a href="/">
              <img src={tplogo} alt="" />
            </a>
          </div>
          <NavLink className="menu-fun-item" to="/task">
            <i className="iconfont icon-renwujincheng" />
          </NavLink>
          <NavLink className="menu-fun-item" to="/quadrant">
            <i className="iconfont icon-zuobiaozhou" />
          </NavLink>
          <NavLink className="menu-fun-item" to="/analysis">
            <i className="iconfont icon-weibiaoti1" />
          </NavLink>
        </div>
        <div id="menu-avatar" onClick={() => this.setLogoutShow(logoutShow)}>
          <img src="https://s3.bmp.ovh/imgs/2021/11/f4919f5e2b8f7494.jpg" alt="头像" />
        </div>
        <div id="menu-logout" className={logoutShow ? 'active' : ''} onClick={this.handleLogout}>
          退出登录
        </div>
      </div>
    );
  }
}
