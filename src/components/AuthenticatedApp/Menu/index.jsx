import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
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
          <Link className="menu-fun-item" to="/task">
            <i className="iconfont icon-renwujincheng" />
          </Link>
          <Link className="menu-fun-item" to="/quadrant">
            <i className="iconfont icon-zuobiaozhou" />
          </Link>
          <Link className="menu-fun-item" to="/analysis">
            <i className="iconfont icon-weibiaoti1" />
          </Link>
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
