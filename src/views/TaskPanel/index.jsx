import React,{Component} from 'react'
import Pond from "./components/pond";
import './idnex.css'

const taskInfo = [
  {id:1,describe:'吃饭饭', finish: true, belong: 'plan-pond'},
  {id:2,describe:'打豆豆1', finish: true, belong: 'ready-pond'},
  {id:3,describe:'打豆豆2', finish: true, belong: 'accept-pond'},
  {id:4,describe:'打豆豆3', finish: false, belong: 'bock-pond'},
  {id:5,describe:'打豆豆4', finish: false, belong: 'sauce-pond'},
  {id:6,describe:'打豆豆5', finish: false, belong: 'execute-pond'},
  {id:7,describe:'打豆豆6', finish: true, belong: 'finish-pond'},
  {id:8,describe:'打豆豆7', finish: false, belong: 'finish-pond'},
  {id:9,describe:'打豆豆8', finish: true, belong: 'finish-pond'},
  {id:10,describe:'打豆豆9', finish: true, belong: 'finish-pond'}
]

export default class TaskPanel extends Component {
  state = {
    ponds: [
      {
        id: 'plan-pond',
        name: '计划池',
        tasks: []
      }, {
        id: 'ready-pond',
        name: '就绪池',
        tasks: []
      }, {
        id: 'accept-pond',
        name: '验收池',
        tasks: []
      }, {
        id: 'bock-pond',
        name: '阻塞池',
        tasks: []
      }, {
        id: 'sauce-pond',
        name: '酱油池',
        tasks: []
      }, {
        id: 'execute-pond',
        name: '执行池',
        tasks: []
      }, {
        id: 'finish-pond',
        name: '完成池',
        tasks: []
      }
    ]
  }

  classify = (taskInfo) => {
    const {ponds} = this.state
    ponds.forEach(ponds => {
      ponds.tasks = taskInfo.filter(task => task.belong === ponds.id)
    })
    this.setState({
      ponds
    })
  }

  getTaskInfo = (task) => {
    // const {ponds} = this.state
    // const pond = ponds.find(pond => pond.id === task.id)
  }

  componentDidMount() {
    this.classify(taskInfo)
  }

  render () {
    const { ponds } = this.state
    return (
      <div id='task-panel'>
        {
          ponds.map(pond => {
            return <Pond key={pond.id} {...pond}></Pond>
          })
        }
      </div>
    )
  }
}
