import React, {useEffect, useMemo, useState} from 'react'
import * as auth from '../network/user'
import { isExist, setToken, removeToken } from "../utils/auth";

export const AuthContext = React.createContext(undefined)
AuthContext.displayName = "AuthContext"

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const me = () => auth.me().then(res => {
    const user = res?.data
    setUser(user)
  }).catch(err => {
    console.log(err, 'me响应拦截器返回的Promise.reject()被我抓到啦~')
  })

  const login = (form) => {
    setIsLoading(true)
    auth.login(form).then(res => {
      const user = res?.data
      setToken(user.token)
      setUser(user)
      setIsLoading(false)
    }).catch(err => {
      setIsLoading(false)
      console.log(err, 'login响应拦截器返回的Promise.reject()被我抓到啦~')
    })
  }

  // 注册还没搞
  const register = (form) => auth.register(form).then(res => {
    const user = res?.data
    setToken(user.token)
    setUser(user)
  }).catch(err => {
    console.log(err, 'register响应拦截器返回的Promise.reject()被我抓到啦~')
  })

  const logout = () => {
    removeToken()
    setUser(null)
  }

  useEffect(() => {
    if(isExist()) {
      me()
    }
  }, [])

  return (
    <AuthContext.Provider value={useMemo(() =>
        ({ user, isLoading, login, register, logout }),
      [user, isLoading, login, register, logout]
      )}>
      {children}
    </AuthContext.Provider>
  )

}
