import React, {Component} from 'react';
import { Spin } from 'antd';
import styled from "@emotion/styled";

export default class Loading extends Component {
  render() {
    return (
      <SpinCotainer>
        <Spin />
      </SpinCotainer>
    );
  }
}

const SpinCotainer = styled.div`
  width: 100%;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`
