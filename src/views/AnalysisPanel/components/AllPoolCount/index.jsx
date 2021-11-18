import React from 'react';
import { Area } from '@ant-design/charts';
import './index.css';

const AllPoolCount = (props) => {
  const { height, values } = props;

  const config = {
    data: values,
    xField: 'date',
    yField: 'count',
    seriesField: 'belong',
    smooth: true,
  };

  return (
    <div className="allPool-inMonth" style={{
      height: height
    }}>
      <span className="chart-style">本月全任务池数量分布</span>
      <div style={{height: height - 31}}>
        <Area {...config} />
      </div>
    </div>
  );
};

export default AllPoolCount;
