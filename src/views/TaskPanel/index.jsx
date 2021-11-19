import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { Pond, useTasks } from './components/Pond';
import { DragDropContext } from 'react-beautiful-dnd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Drag, Drop, DropChild } from '@/components/DragAndDrop';
import { getPondList, reorderPonds } from '@/network/pond';
import { useAuth } from '@/context/auth-context';
import { EditTaskModal } from './components/EditTask';
import { reorderTasks } from '@/network/task';
import { addHistory, getHistoryList } from '@/network/history';
import { reorder } from '@/utils/reorder';
import './idnex.css';
import { Helmet } from 'react-helmet';

const usePonds = () => {
  const { data: res } = useQuery(['ponds'], () => getPondList());
  return res?.data;
};

// 获取拖拽历史表
export const useDropHistory = (userId) => {
  const { data: res } = useQuery(['histories'], () => getHistoryList(userId));
  return res?.data;
};

const useAddDropHistory = (queryKey) => {
  const queryClient = useQueryClient();
  return useMutation((param) => addHistory(param), {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  });
};

export const TaskPanel = () => {
  const { user } = useAuth();
  // console.log(user);
  const [taskId, setTaskId] = useState(0);
  const ponds = usePonds();

  const toggleEditModal = (newTaskId) => {
    setTaskId(newTaskId);
  };

  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Helmet>
        <title>TP-池子面板</title>
      </Helmet>
      <ScreenContainer>
        <Drop type="COLUMN" direction="horizontal" droppableId="ponds-drop">
          <ColumnsContainer>
            {ponds?.map((pond, idx) => (
              <Drag key={pond.id} draggableId={pond.id + 'drag'} index={idx}>
                <Pond toggleEditModal={toggleEditModal} pond={pond} user={user} />
              </Drag>
            ))}
          </ColumnsContainer>
        </Drop>
        <EditTaskModal taskId={taskId} toggleEditModal={toggleEditModal} />
      </ScreenContainer>
    </DragDropContext>
  );
};

const useReorderPonds = (queryKey) => {
  const queryClient = useQueryClient();
  return useMutation((data) => reorderPonds(data), {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => {
        // console.log('old', old)
        // console.log('res', {...old, data: reorder({list: old?.data, ...target})})
        return { ...old, data: reorder({ list: old?.data, ...target }) };
      });
      return { previousItems };
    },
    onError(error, newItem, context) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  });
};

const useReorderTasks = (queryKey) => {
  const queryClient = useQueryClient();
  return useMutation((data) => reorderTasks(data), {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => {
        const orderedList = reorder({ list: old?.data, ...target });
        const test = orderedList.map((item) =>
          item.id === target.fromId ? { ...item, belong: target.toPondId } : item,
        );
        return { ...old, data: test };
      });
      return { previousItems };
    },
    onError(error, newItem, context) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  });
};

export const useDragEnd = () => {
  const { user } = useAuth();
  const tasks = useTasks(user.id);
  const ponds = usePonds();
  const { mutate: reorderPonds } = useReorderPonds('ponds');
  const { mutate: reorderTasks } = useReorderTasks('tasks');
  const { mutate: addHistory } = useAddDropHistory('histories');

  return useCallback(
    ({ source, destination, type }) => {
      if (!destination) {
        return;
      }

      // 池子排序
      if (type === 'COLUMN') {
        const fromId = ponds?.[source.index].sort;
        const toId = ponds?.[destination.index].sort;
        const tag = ponds?.[source.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? 'after' : 'before';
        reorderPonds({ fromId, referenceId: toId, tag, type });
      }

      // 任务排序
      if (type === 'ROW') {
        const fromPondId = Number(source.droppableId);
        const toPondId = Number(destination.droppableId);
        const fromTask = tasks.filter((task) => task.belong === fromPondId)[source.index];
        const toTask = tasks.filter((task) => task.belong === toPondId)[destination.index];
        if (fromPondId !== toPondId) {
          addHistory({
            userId: user.id,
            taskId: fromTask?.id,
            fromId: fromPondId,
            toId: toPondId,
          });
        }
        if (fromTask?.sort === toTask?.sort) {
          return;
        }
        reorderTasks({
          fromId: fromTask?.sort,
          referenceId: toTask?.sort,
          fromPondId,
          toPondId,
          type: fromPondId === toPondId && destination.index > source.index ? 'after' : 'before',
          tag: fromTask?.id,
        });
      }
    },
    [ponds, reorderPonds, tasks, reorderTasks, addHistory],
  );
};

const ScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ColumnsContainer = styled(DropChild)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`;
