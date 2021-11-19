import React, { Component } from 'react';
import { Spin } from 'antd';
import styled from '@emotion/styled';

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
  height: 100vh;
  width: 100%;
  padding: 30px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;
