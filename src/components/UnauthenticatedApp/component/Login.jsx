import { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../context/auth-context';
import '../index.css'

const account = localStorage.getItem('account');



class Login extends Component {
  state = {
    isLoading: false,
    username: account ? JSON.parse(account).u : '',
    password: account ? JSON.parse(account).p : ''
  };

  static contextType = AuthContext;

  handleSubmit = (values) => {
    const { login } = this.context;
    login(values);
  };



  Form() {
    return (
      <>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
          initialValue={this.state.username}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username: admin or user"
            type="text"
            id="username"
            autoComplete="on"
            allowClear />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          initialValue={this.state.password}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password: ant.design"
            id="password"
            autoComplete="on"
            allowClear
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
          initialValues={{ remember: !!account }}
          onFinish={this.handleSubmit}
        >
          {this.Form()}
          <Form.Item >
            <div className="form">
              <Form.Item name="remember" valuePropName="checked" noStyle >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a href="">
                Forgot your password?
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}


export default Login;