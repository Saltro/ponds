import { useEffect, useState } from 'react';
import AnalysisUtil from '@/utils/AnalysisUtil';
import Heatmap from './components/Heatmap';
import Quadrant from './components/Quadrant'
import { useDropHistory } from '../TaskPanel';
import { useAuth } from '@/context/auth-context';
import { Helmet } from 'react-helmet';
import './index.css';

export default function () {
  const history = useDropHistory() || [];
  const [executePerDayAvg, setExecutePerDayAvg] = useState(0);
  const [finishPerWeekAvg, setFinishPerWeekAvg] = useState(0);
  const [numberOfExecutingDays, setNumberOfExecutingDays] = useState(0);
  const [accumulatedFinished, setAccumulatedFinished] = useState(0);
  const [heatmapValues, setHeatmapValues] = useState([]);
  const { user } = useAuth();

  const curDate = new Date();
  const lastYearDate = new Date(curDate - 365 * 24 * 60 * 60 * 1000);
  const valueLastYearDate = new Date(lastYearDate - 7 * 24 * 60 * 60 * 1000);
  const analysis = new AnalysisUtil({
    history,
    registerAt: user.registerAt || new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
  });

  useEffect(() => {
    analysis.history = history;
    setExecutePerDayAvg(analysis.executePerDayAvg());
    setFinishPerWeekAvg(analysis.finishPerWeekAvg());
    setNumberOfExecutingDays(analysis.numberOfExecutingDays());
    setAccumulatedFinished(analysis.accumulatedFinished());
    setHeatmapValues(analysis.getValuesFrom(valueLastYearDate));
  }, [history]);

  return (
    <>
      <Helmet>
        <title>TP-分析面板</title>
      </Helmet>
      <div id="analysis-panel">
        <div className="calendar-container">
          <Heatmap heatmapValues={heatmapValues} lastYearDate={lastYearDate} curDate={curDate} />
          <Quadrant width={800} height={600} />
        </div>
        <div className="statistics-container">
          <div className="statistics-card">
            平均每日执行<span className="number">{executePerDayAvg.toFixed(1)}</span>个任务
          </div>
          <div className="statistics-card">
            平均每周完成<span className="number">{finishPerWeekAvg.toFixed(1)}</span>个任务
          </div>
          <div className="statistics-card">
            坚持执行任务<span className="number">{numberOfExecutingDays}</span>天
          </div>
          <div className="statistics-card">
            一共完成<span className="number">{accumulatedFinished}</span>个任务
          </div>
        </div>
      </div>
    </>
  );
}
