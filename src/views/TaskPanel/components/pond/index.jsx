import React, {useState} from 'react';
import { ConfigProvider, Modal, Input, DatePicker, Slider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import styled from "@emotion/styled";
import './index.css'

export const Pond = React.forwardRef(({ id, name, tasks, ...props },  ref) => {
  const { RangePicker } = DatePicker
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [importanceValue, setImportanceValue] = useState(0)
  const [urgencyValue, setUrgencyValue] = useState(0)
  const [taskValue, setTaskValue] = useState('')

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(true)
  }

  const handleTaskValue = (taskValue) => () => {
    setTaskValue(taskValue)
  }

  const handleChange = () => {
    setImportanceValue(1)
    setUrgencyValue(2)
  }

  return (
    <div {...props} className='pond' id={id} ref={ref}>
      <div id="task-header" className={id}>{`${name} ${tasks.filter(task => task.finish).length}/${tasks.length}`}</div>
      <div id='task-container' className={id}>
        {
          tasks.map(item => <PondTaskItem key={item.id}>
            {item.finish ? <s>{item.describe}</s> : item.describe}
          </PondTaskItem>)
        }
      </div>
      <div id="add-task" className={id} onClick={showModal}>
        <i className='iconfont icon-tianjia' />添加新任务
      </div>
      <ConfigProvider locale={zh_CN}>
        <Modal title={"新建任务 | " + name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Input placeholder="任务描述" value={taskValue} style={{marginBottom: '15px'}} onChange={e => handleTaskValue(e.value)}/>
          <RangePicker style={{marginBottom: '5px'}}/>
          <Slider min={-5} max={5} onChange={handleChange} value={importanceValue} style={{marginBottom: '15px'}}/>
          <Slider min={-5} max={5} onChange={handleChange} value={urgencyValue} />
        </Modal>
      </ConfigProvider>
    </div>
  );
})

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
