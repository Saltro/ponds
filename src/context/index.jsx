import React, {Component} from 'react';
import {AuthProvider} from "./auth-context";

export default class AppProviders extends Component {
  render() {
    const { children } = this.props
    return (
      <AuthProvider>{children}</AuthProvider>
    );
  }
}
