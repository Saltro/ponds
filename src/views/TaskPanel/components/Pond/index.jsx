import React from 'react';
import {useQuery} from "react-query";
// import {Drag, Drop, DropChild} from "../../../../components/DragAndDrop";
import styled from "@emotion/styled";
import {Card} from "antd";
import {getTaskList} from '../../../../network/task'
import {CreateTask} from "../CreateTask";
import './index.css'

const TaskCard = (props) => {
  const {task, toggleEditModal} = props
  return (
    <Card onClick={() => toggleEditModal(task.id)} style={{marginBottom: '0.5rem'}}>
      <div>
        {task.describe}
      </div>
      <div>
        {`重要程度:${task.importance},紧急程度:${task.urgency}`}
      </div>
    </Card>
  )
}

export const Pond = ({pond, user, toggleEditModal}) => {
  const {data: res} = useQuery(['tasks', user], () =>
    getTaskList(user.id)
  )
  const tasks = res?.data?.filter(task => task.belong === pond.name_en)

  return (
    <Container>
      <h3>{pond.name_cn}</h3>
      <TasksContainer>
        {tasks?.map(task => <TaskCard key={task.id}  task={task} toggleEditModal={toggleEditModal}/>)}
        <CreateTask belong={pond.name_en} userId={user.id}/>
      </TasksContainer>
    </Container>
  )
}

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`
