import React from 'react';
import {useQuery} from "react-query";
// import {Drag, Drop, DropChild} from "../../../../components/DragAndDrop";
import styled from "@emotion/styled";
import {Card} from "antd";
import {getTaskList} from '../../../../network/task'
import {CreateTask} from "../CreateTask";
import {useTaskModal} from "../EditTask";
import './index.css'

export const Pond = ({pond, user}) => {
  const {data: res} = useQuery(['tasks', user], () =>
    getTaskList(user.id)
  )
  const tasks = res?.data?.filter(task => task.belong === pond.name_en)
  const {startEdit} = useTaskModal()

  return (
    <Container>
      <h3>{pond.name_cn}</h3>
      <TasksContainer>
        {tasks?.map(task =>
          <Card onClick={() => startEdit(task.id)} style={{marginBottom:'0.5rem'}} key={task.id}>
            <div>
              {task.describe}
            </div>
            <div>
              {`重要程度:${task.importance},紧急程度:${task.urgency}`}
            </div>
        </Card>)}
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
