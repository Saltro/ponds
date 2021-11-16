import React,{Component} from 'react'
import {Pond} from "./components/pond";
import {DragDropContext} from "react-beautiful-dnd";
import {Drag, Drop, DropChild} from "../../components/DragAndDrop";
import './idnex.css'
import styled from "@emotion/styled";

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

  componentDidMount() {
    this.classify(taskInfo)
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

  render () {
    const { ponds } = this.state
    return (
      <DragDropContext onDragEnd={() => {}}>
        <div id='task-panel'>
          <Drop type='COLUMN' direction='horizontal' droppableId='drop-pond'>
            <MyDropChild>
              {ponds?.map((pond, idx) => (
                <Drag key={pond.id} draggableId={'drag-' + pond.id} index={idx}>
                  <Pond key={pond.id} {...pond}/>
                </Drag>))}
            </MyDropChild>
          </Drop>
        </div>
      </DragDropContext>
    )
  }
}

const MyDropChild = styled(DropChild)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  height: 100vh;
  overflow: hidden;
  padding: 0.5rem;
`
