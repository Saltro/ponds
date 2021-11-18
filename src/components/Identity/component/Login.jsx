import {Component} from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../index.css'
// const NormalLoginForm = () => {
//   const onFinish = (values) => {
//     console.log('Received values of form: ', values);
//   };
// }

const onFinish = (values) => {
  console.log('Received values of form: ', values);
};

class Login extends Component{

  Form(){
    return (
      <>
        <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username: admin or user" />
        </Form.Item>
        <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password: ant.design"
          />
        </Form.Item>
      </>
    )
  }

  render(){
    return (
      <div style={{width:360}}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign In
          </Button>
        </Form.Item>
      </Form>
      </div>
    )
  }
}


export default Login;