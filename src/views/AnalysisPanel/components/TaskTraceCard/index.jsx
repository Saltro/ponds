import React, { useState } from "react";
import './index.css';
import { SmileTwoTone } from "@ant-design/icons";
import { List, Modal, Input } from "antd";

const TaskTraceCard = (props) => {
  const { operand } = props;
  const [isVisible, setIsVisible] = useState(false);

  const { Search } = Input;

  const onSearch = (value) => {
    console.log(value);
    setIsVisible(true);
  }

  return (
    <div className="taskTrace-card">
      <span className="title-style">检索任务操作过程</span>
      <Search
        placeholder="请输入需要搜索的任务名称"
        size="large"
        onSearch={onSearch}
        style={{ width: '30rem' }}
      />
      <Modal 
        title="任务操作记录"
        visible={isVisible}
        onOk={() => { setIsVisible(false) }}
        onCancel={() => { setIsVisible(false) }}
      >
        <List
          itemLayout="horizontal"
          size="small"
          dataSource={operand}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<SmileTwoTone />}
                title={item.type}
                description={item.time}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default TaskTraceCard;