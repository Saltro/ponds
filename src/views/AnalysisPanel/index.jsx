import { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import AnalysisUtil from '../../utils/AnalysisUtil';
import Popover from './components/Popover/index';
import { useDropHistory } from '../TaskPanel';
import { useAuth } from '../../context/auth-context';
import './index.css';
import './calendar-heatmap.css';

export default function () {
  const history = useDropHistory() || [];
  const [executePerDayAvg, setExecutePerDayAvg] = useState(0);
  const [finishPerWeekAvg, setFinishPerWeekAvg] = useState(0);
  const [numberOfExecutingDays, setNumberOfExecutingDays] = useState(0);
  const [accumulatedFinished, setAccumulatedFinished] = useState(0);
  const [heatmapValues, setHeatmapValues] = useState([]);
  const [popoverTop, setPopoverTop] = useState(0);
  const [popoverLeft, setPopoverLeft] = useState(0);
  const [popoverContent, setPopoverContent] = useState('');
  const [popoverVisibility, setPopoverVisibility] = useState(false);
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
    <div id="analysis-panel">
      <div className="calendar-container">
        <div id="calendar-heatmap">
          <Popover content={popoverContent} top={popoverTop} left={popoverLeft} visibility={popoverVisibility} />
          <CalendarHeatmap
            values={heatmapValues}
            startDate={lastYearDate}
            endDate={curDate}
            monthLabels={['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月']}
            weekdayLabels={['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']}
            showWeekdayLabels
            gutterSize={2}
            showOutOfRangeDays
            classForValue={(value) => {
              if (value === null) {
                return 'color-rect color-empty';
              }
              const colorMapIdx = [0, 5, 10, 15, 20, 25].filter((item) => item <= value.count).length;
              return 'color-rect ' + (colorMapIdx <= 0 ? 'color-empty' : `color-scale-${colorMapIdx}`);
            }}
            tooltipDataAttrs={({ date, count }) => {
              if (count === null) {
                return { 'data-tooltip': '没有记录' };
              }
              const d = new Date(date);
              console.log(d);
              return { 'data-tooltip': `${d.getMonth()+1}月${d.getDate()}日 ${count}次记录` };
            }}
            onMouseOver={(event, value) => {
              setPopoverVisibility(true);
              setPopoverTop(event.clientY);
              setPopoverLeft(event.clientX);
              setPopoverContent(event.target.getAttribute('data-tooltip'));
            }}
            onMouseLeave={(event, value) => {
              setPopoverVisibility(false);
            }}
          />
        </div>
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
  );
}
