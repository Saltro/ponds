import React, {useEffect, useState} from 'react'
import {Pond} from "./components/pond";
// import {DragDropContext} from "react-beautiful-dnd";
// import {Drag, Drop, DropChild} from "../../components/DragAndDrop";
import {getPondList} from "../../network/pond";
// import styled from "@emotion/styled";
import './idnex.css'
import styled from "@emotion/styled";

// const taskInfo = [
//   {id:1,describe:'吃饭饭', finish: true, belong: 'plan-pond'},
//   {id:2,describe:'打豆豆1', finish: true, belong: 'ready-pond'},
//   {id:3,describe:'打豆豆2', finish: true, belong: 'accept-pond'},
//   {id:4,describe:'打豆豆3', finish: false, belong: 'bock-pond'},
//   {id:5,describe:'打豆豆4', finish: false, belong: 'sauce-pond'},
//   {id:6,describe:'打豆豆5', finish: false, belong: 'execute-pond'},
//   {id:7,describe:'打豆豆6', finish: true, belong: 'finish-pond'},
//   {id:8,describe:'打豆豆7', finish: false, belong: 'finish-pond'},
//   {id:9,describe:'打豆豆8', finish: true, belong: 'finish-pond'},
//   {id:10,describe:'打豆豆9', finish: true, belong: 'finish-pond'}
// ]

export const TaskPanel = () => {
  const [ponds, setPonds] = useState([])

  useEffect(() => {
    getPondList().then(res => {
      const data = res.data
      setPonds(data)
    })
  }, [])

  return (
    <ColumnsContainer>
      {
        ponds?.map(pond => <Pond key={pond.id} pond={pond}/>)
      }
    </ColumnsContainer>
  )

}

const ColumnsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
`

// export default class TaskPanel extends Component {
//   state = {
//     ponds: [
//       {
//         id: 'plan-pond',
//         name: '计划池',
//         tasks: []
//       }, {
//         id: 'ready-pond',
//         name: '就绪池',
//         tasks: []
//       }, {
//         id: 'accept-pond',
//         name: '验收池',
//         tasks: []
//       }, {
//         id: 'bock-pond',
//         name: '阻塞池',
//         tasks: []
//       }, {
//         id: 'sauce-pond',
//         name: '酱油池',
//         tasks: []
//       }, {
//         id: 'execute-pond',
//         name: '执行池',
//         tasks: []
//       }, {
//         id: 'finish-pond',
//         name: '完成池',
//         tasks: []
//       }
//     ]
//   }
//
//   componentDidMount() {
//     this.classify(taskInfo)
//   }
//
//   classify = (taskInfo) => {
//     const {ponds} = this.state
//     ponds.forEach(ponds => {
//       ponds.tasks = taskInfo.filter(task => task.belong === ponds.id)
//     })
//     this.setState({
//       ponds
//     })
//   }
//
//   render () {
//     const { ponds } = this.state
//     return (
//
//     )
//   }
// }
//
// const MyDropChild = styled(DropChild)`
//   display: flex;
//   justify-content: space-evenly;
//   align-content: space-between;
//   flex-wrap: wrap;
//   height: 100vh;
//   overflow: hidden;
//   padding: 0.5rem;
// `
