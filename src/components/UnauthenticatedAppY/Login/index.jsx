import React, { Component } from 'react';
import { AuthContext } from '@/context/auth-context';
import { Form, Input } from 'antd';
import { LongButton } from '../index';

export default class Login extends Component {
  state = {
    isLoading: false,
  };

  static contextType = AuthContext;

  handleSubmit = (values) => {
    // console.log(this.context);
    const { login } = this.context;
    login(values);
  };

  render() {
    const { isLoading } = this.context;
    return (
      <div id="login-form">
        <Form onFinish={this.handleSubmit}>
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
            <Input placeholder="用户名" type="text" id="username" autoComplete="on" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
            <Input placeholder="密码" type="password" id="password" autoComplete="on" />
          </Form.Item>
          <Form.Item>
            <LongButton htmlType="submit" type="primary" loading={isLoading}>
              登录
            </LongButton>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
