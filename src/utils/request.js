import axios from 'axios';
import { message } from 'antd';
import { isExist, getToken } from './auth';

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // 如果存在 token 则附带在 http header 中
    if (isExist()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`;
    }
    return config;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 0) {
      message.error({
        content: res.msg || 'Error',
        duration: 5,
      });

      if (res.code === -2) {
        // to re-login
        message.warning({
          content: res.msg || 'Token过期，请重新登陆！',
          duration: 5,
        });
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      if (res.msg?.search(/更新/)!== -1) {
        message.success({
          content: res.msg || '成功啦！',
          duration: 5
        })
      }
      return res;
    }
  },
  (error) => {
    message.error({
      content: error.message,
      duration: 5,
    });
    return Promise.reject(error);
  },
);

export default service;
