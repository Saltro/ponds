import { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '@/context/auth-context';
import '../index.css'


class Register extends Component {

  static contextType = AuthContext;

  handleSubmit = (values) => {
    const { register } = this.context;
    register(values);
  };

  Form() {
    return (
      <>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="体验用户: testuser" type="text" id="username" autoComplete="on" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="体验密码: testuser"
            id="password"
            autoComplete="on"
          />
        </Form.Item>
      </>
    )
  }

  render() {
    const { isLoading } = this.context;

    return (
      <div style={{ width: 360 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.handleSubmit}
        >
          {this.Form()}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}


export default Register;
