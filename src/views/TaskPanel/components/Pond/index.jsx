import React from 'react';
import {useQuery} from "react-query";
import styled from "@emotion/styled";
import {Card, Tooltip, Rate } from "antd";
import {QuestionCircleOutlined,FrownOutlined, MehOutlined, SmileOutlined} from '@ant-design/icons';
import {Drag, Drop, DropChild} from "../../../../components/DragAndDrop";
import {getTaskList} from '../../../../network/task'
import {CreateTask} from "../CreateTask";
import './index.css'

const importanceDesc = ['不重要', '不太重要', '重要', '有点重要', '非常重要！']
const urgencyDesc = ['不着急', '不太着急', '着急', '有点着急', '十万火急！']
const customIcons = {
  1: <SmileOutlined />,
  2: <SmileOutlined />,
  3: <MehOutlined />,
  4: <FrownOutlined />,
  5: <FrownOutlined />,
};

const TaskCard = (props) => {
  const {task, toggleEditModal} = props

  return (
    <Card onClick={() => toggleEditModal(task.id)} size='small' style={{marginBottom: '1rem', backgroundColor: '#F0F5FF'}}>
      <div>
        {task.describe}
      </div>
      <div>
        <Rate tooltips={importanceDesc} disabled defaultValue={task.importance}/>
        <br/>
        <Rate tooltips={urgencyDesc} defaultValue={task.urgency} disabled character={({ index }) => customIcons[index + 1]} />
      </div>
    </Card>
  )
}

export const useTasks = (id) => {
  const {data: res} = useQuery(['tasks'], () =>
    getTaskList(id)
  )
  return res?.data
}

export const Pond = React.forwardRef(({pond, user, toggleEditModal, ...props}, ref) => {
  const res = useTasks(user.id)
  const tasks = res?.filter(task => task.belong === pond.id)

  return (
    <Container {...props} ref={ref}>
      <div className={`pond-header ${pond.name_en}`}>
        <div className='pond-title'  style={{fontSize: '1.8rem'}}>
          {pond.name_cn + ' '}
          <Tooltip placement="rightTop" title={pond.info}>
            <QuestionCircleOutlined style={{fontSize: '1.5rem'}} />
          </Tooltip>
        </div>
        <div className="pond-count">
          共计：{tasks.length}
        </div>
      </div>
      <TasksContainer>
        <Drop type='ROW' direction='vertical' droppableId={String(pond.id)}>
          <DropChild style={{ minHeight: "1rem" }}>
            {tasks?.map((task, taskIdx) =>
              <Drag key={task.id} index={taskIdx} draggableId={'drag' + task.id}>
                <div>
                  <TaskCard task={task} toggleEditModal={toggleEditModal}/>
                </div>
              </Drag>
            )}
          </DropChild>
        </Drop>
        <CreateTask belong={pond.id} userId={user.id}/>
      </TasksContainer>
    </Container>
  )
})

const Container = styled.div`
  width: calc((100vw - 9.2rem) / 4);
  height: calc((100vh - 4rem) * 10 / 17);
  border-radius: 6px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  :nth-last-of-type(-n+3){
    width: calc((100vw - 9.2rem) / 3);
    height: calc((100vh - 4rem) * 7 / 17);
  }
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`
