import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import { Form, Input, Modal, DatePicker, Slider } from 'antd';
import { editTask, getTask } from '@/network/task';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';

const useTask = (id) => {
  return useQuery(['task', id], () => getTask(id));
};

const useEditTask = (queryKey) => {
  const queryClient = useQueryClient();
  return useMutation((params) => editTask(params), {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  });
};

export const useTaskModal = (taskId) => {
  const { data: res } = useTask(taskId);
  const editingTask = { ...res?.data, startAt: moment(res?.data?.startAt), endAt: moment(res?.data?.endAt) };
  return { editingTask };
};

export const EditTaskModal = ({ taskId, toggleEditModal }) => {
  const [form] = useForm();
  const { editingTask } = useTaskModal(taskId);
  const { mutateAsync: editTask } = useEditTask('tasks');
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const onCancel = () => {
    toggleEditModal(0);
    form.resetFields();
    // console.log('Cancel')
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    toggleEditModal(0);
    // console.log('Ok');
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText="确认"
      cancelText="取消"
      title="编辑任务"
      visible={!!taskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item label="任务描述" name="describe" rules={[{ required: true, message: '请输入任务描述' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="开始时间" name="startAt">
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} />
        </Form.Item>
        <Form.Item label="结束时间" name="endAt">
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} />
        </Form.Item>
        <Form.Item label="重要程度" name="importance">
          <Slider min={-5} max={5} />
        </Form.Item>
        <Form.Item label="紧急程度" name="urgency">
          <Slider min={-5} max={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
