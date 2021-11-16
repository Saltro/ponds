import React, {useEffect, useState} from 'react'
import styled from "@emotion/styled";
import {Pond} from "./components/Pond";
import {DragDropContext} from "react-beautiful-dnd";
import {Drag, Drop, DropChild} from "../../components/DragAndDrop";
import {getPondList} from "../../network/pond";
import {useAuth} from "../../context/auth-context";
import {EditTaskModal} from "./components/EditTask";
import './idnex.css'

export const TaskPanel = () => {
  const {user} = useAuth()
  const [taskId, setTaskId] = useState(0)
  const [ponds, setPonds] = useState([])

  useEffect(() => {
    getPondList().then(res => {
      const data = res.data
      setPonds(data)
    })
  }, [])

  const toggleEditModal = (newTaskId) => {
    setTaskId(newTaskId)
  }

  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <ColumnsContainer>
          {
            ponds?.map(pond => <Pond toggleEditModal={toggleEditModal} key={pond.id} pond={pond} user={user}/>)
          }
        </ColumnsContainer>
        <EditTaskModal taskId={taskId} toggleEditModal={toggleEditModal}/>
      </ScreenContainer>
    </DragDropContext>
  )
}

const ScreenContainer = styled.div`
  width: 100%;
  display: flex;
`

const ColumnsContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  overflow-x: scroll;
`
