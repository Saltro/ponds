import { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '@/context/auth-context';
import '../index.css'


class Login extends Component {
  state = {
    isLoading: false,
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
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username: admin or user" type="text" id="username" autoComplete="on" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password: ant.design"
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
          <Form.Item >
            <div className="form">
              <Form.Item name="remember" valuePropName="checked" noStyle>
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