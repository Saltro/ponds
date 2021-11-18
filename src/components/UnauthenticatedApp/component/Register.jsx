import { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../index.css'


class Register extends Component {


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
    return (
      <div style={{ width: 360 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          {this.Form()}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}


export default Register;