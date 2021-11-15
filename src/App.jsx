import React,{ Component } from 'react'
import {AuthContext} from './context/auth-context'
import UnauthenticatedApp from './components/UnauthenticatedApp'
import AuthenticatedApp from './components/AuthenticatedApp'
import './App.css'

export default class App extends Component{
  static contextType = AuthContext

  render(){
    const { user } = this.context
    return (
      <div id="app">
        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
        {/* <AuthenticatedApp/> */}
      </div>
    )
  }
}
