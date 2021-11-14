import React, {Component} from 'react'
import * as auth from '../network/user'
import { isExist, setToken, removeToken } from "../utils/auth";

export const AuthContext = React.createContext(undefined)
AuthContext.displayName = "AuthContext"

export class AuthProvider extends Component {
  state = {
    user: null,
    isLoading: false
  }

  componentDidMount() {
    if(isExist()) {
      this.me()
    }
  }

  me = () => auth.me().then(res => {
    const user = res?.data
    this.setState({user})
  }).catch(err => {
    console.log(err, 'me响应拦截器返回的Promise.reject()被我抓到啦~')
  })

  login = (form) => {
    this.setState({isLoading: true})
    auth.login(form).then(res => {
      const user = res?.data
      setToken(user.token)
      this.setState({user})
      this.setState({isLoading: false})
    }).catch(err => {
      this.setState({isLoading: false})
      console.log(err, 'login响应拦截器返回的Promise.reject()被我抓到啦~')
    })
  }

  // 注册还没搞
  register = (form) => auth.register(form).then(res => {
    const user = res?.data
    setToken(user.token)
    this.setState({user})
  }).catch(err => {
    console.log(err, 'register响应拦截器返回的Promise.reject()被我抓到啦~')
  })

  logout = () => {
    removeToken()
    this.setState({user: null})
  }

  render() {
    const {user, isLoading} = this.state
    const {children} = this.props
    const {login, register, logout} = this
    return (
      <AuthContext.Provider value={{ user, isLoading, login, register, logout }} children={children}/>
    )
  }
}
