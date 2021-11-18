import React,{ Component } from 'react'
import {AuthContext} from './context/auth-context'
import UnauthenticatedApp from './components/UnauthenticatedApp'
import AuthenticatedApp from './components/AuthenticatedApp'
import './App.css'

// import Identity from './components/Identity';

export default class App extends Component{
  static contextType = AuthContext

  render(){
    const { user } = this.context
    return (
      <div id="app">
        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
        {/* {user ? <AuthenticatedApp/> : <Identity/>} */}
        {/* <AuthenticatedApp/> */}
      </div>
    )
  }
}
