import React, {Component} from 'react';
import { ConfigProvider, Modal, Input, DatePicker, Slider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import Task from '../task'
import './index.css'

export default class Pond extends Component {
  state = {
    isModalVisible: false,
    taskValue: '',
    importanceValue: 0,
    urgencyValue: 0
  }

  showModal = () => {
    this.setState({
      isModalVisible: true
    })
  }

  handleOk = () => {
    this.setState({
      isModalVisible: false
    })
  }

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  }

  handleTaskValue = (taskValue) => () => {
    this.setState({
      taskValue
    })
  }

  handleChange = () => {}

  render() {
    const { isModalVisible, importanceValue, urgencyValue, taskValue } = this.state
    const { id, name, tasks } = this.props
    const { RangePicker } = DatePicker
    return (
      <div className='pond' id={id}>
        <div id="task-header" className={id}>{`${name} ${tasks.filter(task => task.finish).length}/${tasks.length}`}</div>
        <div id='task-container' className={id}>
          <Task taskInfo={tasks}/>
        </div>
        <div id="add-task" className={id} onClick={this.showModal}>
          <i className='iconfont icon-tianjia' />添加新任务
        </div>
        <ConfigProvider locale={zh_CN}>
          <Modal title={"新建任务 | " + this.props.name} visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <Input placeholder="任务描述" value={taskValue} style={{marginBottom: '15px'}} onChange={e => this.handleTaskValue(e.value)}/>
            <RangePicker style={{marginBottom: '5px'}}/>
            <Slider min={-5} max={5} onChange={this.handleChange} value={importanceValue} style={{marginBottom: '15px'}}/>
            <Slider min={-5} max={5} onChange={this.handleChange} value={urgencyValue} />
          </Modal>
        </ConfigProvider>
      </div>
    );
  }
}

