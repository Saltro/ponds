import {useForm} from "antd/es/form/Form";
import {useCallback, useEffect, useState} from "react";
import {Form, Input, Modal, DatePicker, Slider} from "antd";
import {editTask, getTask} from "../../../../network/task";
import {useMutation, useQuery, useQueryClient} from "react-query";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
}

const useTask = (id) => {
  return useQuery(['task', id],
    () => getTask(id)
    )
}

const useEditTask = (queryKey) => {
  const queryClient = useQueryClient()
  return useMutation(
    (params) => editTask(params), {
      onSuccess: () => queryClient.invalidateQueries(queryKey)
    }
  )
}

export const useTaskModal = () => {
  const [editingTaskId, setEditingTaskId] = useState(null)
  const {data: editingTask, isLoading} = useTask(editingTaskId)
  // const editingTask = {
  //   "id": 8,
  //   "describe": "做个锤子的作业",
  //   "belong": "finish-pond",
  //   "importance": 5,
  //   "urgency": 5,
  //   "startAt": "2021-11-15T23:55:31.000Z",
  //   "endAt": "2021-11-15T23:55:31.000Z"
  // }
  console.log('startEdit之前',editingTaskId)
  const startEdit = useCallback((id) => {
    setEditingTaskId(id)
    console.log('startEdit之后',editingTaskId)
  }, [setEditingTaskId])
  const close = useCallback(() => {
    setEditingTaskId(0)
  }, [setEditingTaskId])

  return {
    editingTask,
    editingTaskId,
    startEdit,
    close,
    isLoading
  }
}

export const EditTaskModal = () => {
  const { RangePicker } = DatePicker
  const [form] = useForm()
  const {editingTask, editingTaskId, close} = useTaskModal()
  console.log('modal',editingTaskId)
  const {mutateAsync: editTask, isLoading: editLoading} = useEditTask('tasks')

  const onCancel = () => {
    close()
    form.resetFields()
  }

  const onOk = async () => {
    await editTask({...editingTask, ...form.getFieldsValue()})
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [form, editingTask])

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText="确认"
      cancelText="取消"
      confirmLoading={editLoading}
      title="编辑任务"
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label="任务描述"
          name="describe"
          rules={[{ required: true, message: "请输入任务描述" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="期限" name="processorId">
          <RangePicker />
        </Form.Item>
        <Form.Item label="重要程度" name="importance">
          <Slider min={-5} max={5}/>
        </Form.Item>
        <Form.Item label="紧急程度" name="urgency">
          <Slider min={-5} max={5}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}
