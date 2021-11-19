import { useEffect, useState, useCallback } from 'react';
import AnalysisUtil from '@/utils/AnalysisUtil';
// import Heatmap from './components/Heatmap';
import Quadrant from './components/Quadrant';
import TaskDonePoolCount from './components/TaskDonePoolCount/index';
import AllPoolCount from './components/AllPoolCount/index';
import StatisticsCard from './components/StatisticsCard/index';
import CalenderCard from './components/CalenderCard/index';
import TaskTraceCard from './components/TaskTraceCard/index';
import { useDropHistory } from '../TaskPanel';
import { useAuth } from '@/context/auth-context';
import { useTasks } from '@/views/TaskPanel/components/Pond/index';
import { Helmet } from 'react-helmet';
import './index.css';

export default function () {
  const [executePerDayAvg, setExecutePerDayAvg] = useState(0);
  // const [finishPerWeekAvg, setFinishPerWeekAvg] = useState(0);
  const [numberOfExecutingDays, setNumberOfExecutingDays] = useState(0);
  const [accumulatedFinished, setAccumulatedFinished] = useState(0);
  const [heatmapValues, setHeatmapValues] = useState([]);
  const [allHistoryValues, setAllHistoryValues] = useState([]);
  const { user } = useAuth();
  const tasks = useTasks(user.id);
  const history = useDropHistory(user.id) || [];

  const curDate = new Date();
  const lastMonthDate = new Date();
  const valueLastMonthDate = new Date();
  lastMonthDate.setDate(curDate.getDate() - 31);
  valueLastMonthDate.setDate(lastMonthDate.getDate() - 7);
  console.log(lastMonthDate, valueLastMonthDate);
  const analysis = new AnalysisUtil({
    history,
    registerAt: new Date(user.registerAt) || new Date(curDate - 7 * 1000 * 60 * 60 * 24),
  });

  useEffect(() => {
    analysis.history = history;
    setExecutePerDayAvg(analysis.executePerDayAvg());
    // setFinishPerWeekAvg(analysis.finishPerWeekAvg());
    setNumberOfExecutingDays(analysis.numberOfExecutingDays());
    setAccumulatedFinished(analysis.accumulatedFinished());
    setHeatmapValues(analysis.getHeatmapValuesFrom(valueLastMonthDate));
    setAllHistoryValues(analysis.getAllHistoryValuesFrom(lastMonthDate));
  }, [history]);

  const [chartsSubContainerHeight, setChartsSubContainerHeight] = useState(0);
  const chartsContainer = useCallback((node) => {
    if (node) {
      // 内容区减去中间gap的高度的一半
      setChartsSubContainerHeight((node.clientHeight - 20 - 12) / 2);
      // console.log((node.clientHeight - 20) / 2);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>TP-分析面板</title>
      </Helmet>
      <div id="analysis-panel">
        <div className="statistics-container">
          <TaskTraceCard
            onSearch={(value) => {
              const targetTask = tasks.find((task) => task.describe === value);
              if (!targetTask) {
                return [];
              }
              return analysis.getHistoryByTaskId(targetTask.id);
            }}
          />
          <StatisticsCard
            statisticData={{
              executePerDayAvg,
              numberOfExecutingDays,
              accumulatedFinished,
            }}
          />
          <CalenderCard values={heatmapValues} startDate={lastMonthDate} endDate={curDate} />
        </div>
        <div className="charts-container" ref={chartsContainer}>
          <TaskDonePoolCount height={chartsSubContainerHeight} values={heatmapValues} />
          <Quadrant height={chartsSubContainerHeight} />
          <AllPoolCount height={chartsSubContainerHeight} values={allHistoryValues} />
        </div>
      </div>
    </>
  );
}
