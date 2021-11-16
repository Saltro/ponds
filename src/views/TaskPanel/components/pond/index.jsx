import React, {useEffect, useState} from 'react';
import {getTaskList} from '../../../../network/task'
// import { ConfigProvider, Modal, Input, DatePicker, Slider } from 'antd'
// import zh_CN from 'antd/lib/locale-provider/zh_CN'
// import styled from "@emotion/styled";
// import {Drag, Drop, DropChild} from "../../../../components/DragAndDrop";
import './index.css'
import styled from "@emotion/styled";
import {Card} from "antd";

// export const Pond = React.forwardRef(({ id, name, tasks, ...props },  ref) => {
//   const { RangePicker } = DatePicker
//   const [isModalVisible, setIsModalVisible] = useState(false)
//   // const [startAt, setStartAt] = useState(null)
//   // const [endAt, setEndAt] = useState(null)
//   const [importanceValue, setImportanceValue] = useState(0)
//   const [urgencyValue, setUrgencyValue] = useState(0)
//   const [taskValue, setTaskValue] = useState('')
//
//   const showModal = () => {
//     setIsModalVisible(true)
//   }
//
//   const handleOk = () => {
//     setIsModalVisible(false)
//   }
//
//   const handleCancel = () => {
//     setIsModalVisible(false)
//   }
//
//   const handleTaskValue = (taskValue) => {
//     setTaskValue(taskValue)
//   }
//
//   const handleDateValue = (dates, dateString) => {
//     console.log(dates, dateString)
//   }
//
//   const handleImportanceValue = (value) => {
//     setImportanceValue(value)
//   }
//
//   const handleUrgencyValue = (value) => {
//     setUrgencyValue(value)
//   }
//
//   return (
//     <div {...props} className='pond' id={id} ref={ref}>
//       <div id="task-header" className={id}>{`${name} ${tasks.filter(task => task.finish).length}/${tasks.length}`}</div>
//       <div id='task-container' className={id}>
//         <Drop type='ROW' direction='vertical' droppableId={id + 'task'}>
//           <DropChild>
//             {tasks?.map((item, itemIndex) =>
//               <Drag key={item.id} index={itemIndex} draggableId={item.id + 'task'}>
//                 <div>
//                   <PondTaskItem key={item.id}>
//                     {item.finish ? <s>{item.describe}</s> : item.describe}
//                   </PondTaskItem>
//                 </div>
//               </Drag>)}
//           </DropChild>
//         </Drop>
//       </div>
//       <div id="add-task" className={id} onClick={showModal}>
//         <i className='iconfont icon-tianjia' />添加新任务
//       </div>
//       <ConfigProvider locale={zh_CN}>
//         <Modal title={"新建任务 | " + name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//           <Input placeholder="任务描述" value={taskValue} style={{marginBottom: '15px'}} onChange={e => handleTaskValue(e.value)}/>
//           <RangePicker onChange={handleDateValue} style={{marginBottom: '5px'}}/>
//           <Slider min={-5} max={5} onChange={handleImportanceValue} value={importanceValue} style={{marginBottom: '15px'}}/>
//           <Slider min={-5} max={5} onChange={handleUrgencyValue} value={urgencyValue} />
//         </Modal>
//       </ConfigProvider>
//     </div>
//   );
// })
//
// const PondTaskItem = styled.div`
//   width: 100%;
//   padding: 0.5rem 1.2rem;
//   margin-bottom: 0.8rem;
//   background-color: #ffffff;
//   cursor: pointer;
//   :last-child {
//     margin-bottom: 0;
//   }
// `

export const Pond = ({pond}) => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTaskList(1).then(res => {
      const data = res?.data?.filter(task => task.belong === pond.name_en)
      setTasks(data)
    })
  }, [])

  return (
    <Container>
      <h3>{pond.name_cn}</h3>
      <TasksContainer>
        {tasks?.map(task => <Card style={{marginBottom:'0.5rem'}} key={task.id}>
          <div>
            {task.describe}
          </div>
          <div>
            {`importance:${task.importance},urgency:${task.urgency}`}
          </div>
        </Card>)}
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
