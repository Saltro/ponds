import React from "react";
import './index.css';
import { Card, Col, Row } from 'antd';

const StatisticsCard = (props) => {
  const { statisticData } = props;

  return (
    <div className="statistics-card">
      <span className="title-style">任务执行情况</span>
      <Row gutter={2}>
        <Col span={8}>
          <Card title="平均执行数" size="small">{ statisticData.executePerDayAvg.toFixed(1) }</Card>
        </Col>
        <Col span={8}>
          <Card title="执行天数" size="small">{ statisticData.numberOfExecutingDays }</Card>
        </Col>
        <Col span={8}>
          <Card title="总执行数" size="small">{ statisticData.accumulatedFinished }</Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsCard;