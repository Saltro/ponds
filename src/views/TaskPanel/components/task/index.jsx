import React, {Component, Fragment} from 'react';
import styled from "@emotion/styled";

export default class Task extends Component {
  render() {
    const { taskInfo } = this.props
    return (
      <>
        {
          taskInfo.map(item => <PondTaskItem key={item.id}>
            {item.finish ? <s>{item.describe}</s> : item.describe}
          </PondTaskItem>)
        }
      </>
    );
  }
}

const PondTaskItem = styled.div`
  width: 100%;
  padding: 0.5rem 1.2rem;
  margin-bottom: 0.8rem;
  background-color: #ffffff;
  cursor: pointer;
  :last-child {
    margin-bottom: 0;
  }
`


