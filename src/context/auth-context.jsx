import React, { useEffect, useMemo, useState } from 'react';
import * as auth from '@/network/user';
import { isExist, setToken, removeToken } from '@/utils/auth';
import { useQueryClient } from 'react-query';

export const AuthContext = React.createContext(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const me = () =>
    auth
      .me()
      .then((res) => {
        const user = res?.data;
        setUser(user);
      })
      .catch((err) => {
        console.log(err, 'me响应拦截器返回的Promise.reject()被我抓到啦~');
      });

  const login = (form) => {
    setIsLoading(true);
    auth
      .login(form)
      .then((res) => {
        const user = res?.data;
        setToken(user.token);
        setUser(user);
        setIsLoading(false);
        if (form.remember) {
          let info = JSON.stringify({ u: form.username, p: form.password });
          localStorage.setItem('account', info);
        } else {
          localStorage.removeItem('account');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err, 'login响应拦截器返回的Promise.reject()被我抓到啦~');
      });
  };

  // 注册
  const register = (form) =>{
    setIsLoading(true);
    auth
      .register(form)
      .then((res) => {
        const user = res?.data;
        setToken(user.token);
        setUser(user);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err, 'register响应拦截器返回的Promise.reject()被我抓到啦~');
      });
  }

  const logout = () => {
    removeToken();
    setUser(null);
    queryClient.clear();
  };

  useEffect(() => {
    if (isExist()) {
      me();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={useMemo(() => ({ user, isLoading, login, register, logout }), [user, isLoading, login, register, logout])}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用');
  }
  return context;
};
