import { useEffect, useState } from 'react';
import { addTask } from '../../../../network/task';
import { Card, Input, Button } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

const useAddTask = (queryKey) => {
  const queryClient = useQueryClient();
  return useMutation(({ belong, userId, describe }) => addTask({ belong, userId, describe }), {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  });
};

export const CreateTask = ({ belong, userId }) => {
  const [describe, setDescribe] = useState('');
  const { mutateAsync: add } = useAddTask('tasks');
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await add({ belong, userId, describe });
    setInputMode(false);
    setDescribe('');
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setDescribe('');
    }
  }, [inputMode]);

  if (!inputMode) {
    return (
      <Button type="dashed" block onClick={toggle}>
        <i className="iconfont icon-tianjia" style={{ fontStyle: '15px' }} />
        创建任务
      </Button>
    );
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="有什么安排呀"
        autoFocus={true}
        onPressEnter={submit}
        value={describe}
        onChange={(evt) => setDescribe(evt.target.value)}
      />
    </Card>
  );
};
