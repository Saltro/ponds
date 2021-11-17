import React, {useEffect, useState} from 'react'
import styled from "@emotion/styled";
import {Pond} from "./components/Pond";
// import {DragDropContext} from "react-beautiful-dnd";
// import {Drag, Drop, DropChild} from "../../components/DragAndDrop";
import {getPondList} from "../../network/pond";
import {useAuth} from "../../context/auth-context";
import './idnex.css'
import {EditTaskModal} from "./components/EditTask";

export const TaskPanel = () => {
  const {user} = useAuth()
  const [ponds, setPonds] = useState([])

  useEffect(() => {
    getPondList().then(res => {
      const data = res.data
      setPonds(data)
    })
  }, [])

  return (
    <ScreenContainer>
      <ColumnsContainer>
        {
          ponds?.map(pond => <Pond key={pond.id} pond={pond} user={user}/>)
        }
      </ColumnsContainer>
     <EditTaskModal />
    </ScreenContainer>
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
  gap: 1rem;
  flex-wrap: wrap;
  height: 100vh;
  padding: 0.5rem;
  overflow-x: scroll;
`
