import React from 'react';
import { useQuery } from 'react-query';
import { Drag, Drop, DropChild } from '../../../../components/DragAndDrop';
import styled from '@emotion/styled';
import { Card } from 'antd';
import { getTaskList } from '../../../../network/task';
import { CreateTask } from '../CreateTask';
import './index.css';

const TaskCard = (props) => {
  const { task, toggleEditModal } = props;
  return (
    <Card onClick={() => toggleEditModal(task.id)} style={{ marginBottom: '0.5rem' }}>
      <div>{task.describe}</div>
      <div>{`重要程度:${task.importance},紧急程度:${task.urgency}`}</div>
    </Card>
  );
};

export const useTasks = (id) => {
  const { data: res } = useQuery(['tasks'], () => getTaskList(id));
  return res?.data;
};

export const Pond = React.forwardRef(({ pond, user, toggleEditModal, ...props }, ref) => {
  const res = useTasks(user.id);
  const tasks = res?.filter((task) => task.belong === pond.id);

  return (
    <Container {...props} ref={ref}>
      <h3>{pond.name_cn}</h3>
      <TasksContainer>
        <Drop type="ROW" direction="vertical" droppableId={String(pond.id)}>
          <DropChild style={{ minHeight: '1rem' }}>
            {tasks?.map((task, taskIdx) => (
              <Drag key={task.id} index={taskIdx} draggableId={'drag' + task.id}>
                <div>
                  <TaskCard task={task} toggleEditModal={toggleEditModal} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask belong={pond.id} userId={user.id} />
      </TasksContainer>
    </Container>
  );
});

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
