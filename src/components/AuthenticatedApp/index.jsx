import React, {Component} from 'react';
import Menu from './Menu';
import Container from "./Container";
import './index.css'

export default class AuthenticatedApp extends Component {
  render() {
    return (
      <div id="authenticated-app">
        <Menu/>
        <Container/>
      </div>
    );
  }
}
