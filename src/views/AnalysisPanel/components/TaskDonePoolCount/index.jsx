import React from 'react';
import { Line } from '@ant-design/charts';
import './index.css';

const TaskDonePoolCount = (props) => {
  const { height, values } = props;

  const config = {
    data: values,
    padding: 'auto',
    xField: 'date',
    yField: 'count',
    smooth: true,
    annotations: [
      {
        type: 'regionFilter',
        start: ['min', 'median'],
        end: ['max', '0'],
        color: '#F46640',
      },
      {
        type: 'line',
        start: ['min', 'median'],
        content: '中位数',
        offsetY: -4,
        style: { textBaseline: 'bottom' },
      },
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
    ],
    tooltip: {
      fields: ['date', 'count'],
      formatter: (datum) => {
        return {
          name: '记录数',
          value: datum.count + '次',
        }
      }
    }
  };

  return (
    <div className="doneTask-inMonth" style={{
      height: height,
    }}>
      <span className="chart-style">本月任务完成数分布</span>
      <div style={{height: height - 31}}>
        <Line {...config} />
      </div>
    </div>
  );
};

export default TaskDonePoolCount;
