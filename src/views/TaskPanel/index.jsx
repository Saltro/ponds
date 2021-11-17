import React, {useCallback, useState} from 'react'
import styled from "@emotion/styled";
import {Pond, useTasks} from "./components/Pond";
import {DragDropContext} from "react-beautiful-dnd";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {Drag, Drop, DropChild} from "../../components/DragAndDrop";
import {getPondList, reorderPonds} from "../../network/pond";
import {useAuth} from "../../context/auth-context";
import {EditTaskModal} from "./components/EditTask";
import {reorderTasks} from "../../network/task";
import {addHistory, getHistoryList} from "../../network/history";
import './idnex.css'

const usePonds = () => {
  const {data: res} = useQuery(['ponds'], () =>
    getPondList()
  )
  return res?.data
}

// 获取拖拽历史表
export const useDropHistory = () => {
  const {data: res} = useQuery(['histories'], () =>
    getHistoryList()
  )
  return res?.data
}

const useAddDropHistory = (queryKey) => {
  const queryClient = useQueryClient()
  return useMutation(
    (param) => addHistory(param), {
      onSuccess: () => queryClient.invalidateQueries(queryKey)
    }
  )
}

export const TaskPanel = () => {
  const {user} = useAuth()
  const [taskId, setTaskId] = useState(0)
  const ponds = usePonds()

  const toggleEditModal = (newTaskId) => {
    setTaskId(newTaskId)
  }

  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <Drop type='COLUMN' direction='horizontal' droppableId='ponds-drop'>
          <ColumnsContainer>
            {
              ponds?.map((pond, idx) =>
                <Drag key={pond.id} draggableId={pond.id + 'drag'} index={idx}>
                  <Pond toggleEditModal={toggleEditModal} pond={pond} user={user}/>
                </Drag>
              )
            }
          </ColumnsContainer>
        </Drop>
        <EditTaskModal taskId={taskId} toggleEditModal={toggleEditModal}/>
      </ScreenContainer>
    </DragDropContext>
  )
}

const useReorderPonds = (queryKey) => {
  const queryClient = useQueryClient()
  return useMutation(
    (data) => reorderPonds(data), {
      onSuccess: () => queryClient.invalidateQueries(queryKey)
    }
  )
}

const useReorderTasks = (queryKey) => {
  const queryClient = useQueryClient()
  return useMutation(
    (data) => reorderTasks(data), {
      onSuccess: () => queryClient.invalidateQueries(queryKey)
    }
  )
}

export const useDragEnd = () => {
  const {user} = useAuth()
  const tasks = useTasks(user.id)
  const ponds = usePonds()
  const {mutate: reorderPonds} = useReorderPonds('ponds')
  const {mutate: reorderTasks} = useReorderTasks('tasks')
  const {mutate: addHistory} = useAddDropHistory('histories')

  return useCallback(({source, destination, type}) => {
    if (!destination) {
      return
    }

    // 池子排序
    if (type === 'COLUMN') {
      const fromId = ponds?.[source.index].sort
      const toId = ponds?.[destination.index].sort
      const tag = ponds?.[source.index].id
      if (!fromId || !toId || fromId === toId) {
        return
      }
      const type = destination.index > source.index ? 'after' : 'before'
      reorderPonds({fromId, referenceId: toId, tag, type})
    }

    // 任务排序
    if (type === 'ROW') {
      const fromPondId = Number(source.droppableId)
      const toPondId = Number(destination.droppableId)
      const fromTask = tasks.filter(task => task.belong === fromPondId)[source.index]
      const toTask = tasks.filter(task => task.belong === toPondId)[destination.index]
      if (fromPondId !== toPondId) {
        addHistory({
          userId: user.id,
          taskId: fromTask?.id,
          fromId: fromPondId,
          toId: toPondId
        })
      }
      if (fromTask?.sort === toTask?.sort) {
        return
      }
      reorderTasks({
        fromId: fromTask?.sort,
        referenceId: toTask?.sort,
        fromPondId,
        toPondId,
        type: fromPondId === toPondId && destination.index > source.index ? 'after' : 'before',
        tag: fromTask?.id
      })
    }
  }, [ponds, reorderPonds, tasks, reorderTasks, addHistory])
}

const ScreenContainer = styled.div`
  width: 100%;
  display: flex;
`

const ColumnsContainer = styled(DropChild)`
  width: 100%;
  flex: 1;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  height: 100vh;
  padding: 0.5rem;
  overflow-x: scroll;
`
