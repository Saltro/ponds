import { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import AnalysisUtil from '../../utils/AnalysisUtil'
import { useDropHistory } from '../TaskPanel'
import { useAuth } from '../../context/auth-context'
// import history from '../../mock/history'
import './index.css'
import './calendar-heatmap.css'

export default function () {
  // const [analysis] = useState(new AnalysisUtil({
  //     history: useDropHistory(),
  //     registeDate: new Date('2020-01-14'),
  //   }))
  const history = useDropHistory() || []
  const [executePerDayAvg, setExecutePerDayAvg] = useState(0)
  const [finishPerWeekAvg, setFinishPerWeekAvg] = useState(0)
  const [numberOfExecutingDays, setNumberOfExecutingDays] = useState(0)
  const [accumulatedFinished, setAccumulatedFinished] = useState(0)
  const [heatmapValues, setHeatmapValues] = useState([])
  const { user } = useAuth()
  console.log('user', user)
  const curDate = new Date()
  const lastYearDate = new Date(curDate - (365 * 24 * 60 * 60 * 1000))
  const valueLastYearDate = new Date(lastYearDate - (7 * 24 * 60 * 60 * 1000))
  const analysis = new AnalysisUtil({
    history,
    registerAt: user.registerAt || new Date(new Date() - (7 * 24 * 60 * 60 * 1000)),
  })

  useEffect(() => {
    console.log(history)
    analysis.history = history
    setExecutePerDayAvg(analysis.executePerDayAvg())
    setFinishPerWeekAvg(analysis.finishPerWeekAvg())
    setNumberOfExecutingDays(analysis.numberOfExecutingDays())
    setAccumulatedFinished(analysis.accumulatedFinished())
    setHeatmapValues(analysis.getValuesFrom(Math.max(valueLastYearDate, analysis.registerAt)))
  }, [history])

  return (
    <div id="analysis-panel">
      <div className="calendar-container">
        <div id="calendar-heatmap">
          <CalendarHeatmap
            values={heatmapValues}
            startDate={lastYearDate}
            endDate={curDate}
            monthLabels={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            weekdayLabels={["日", "一", "二", "三", "四", "五", "六"]}
            showWeekdayLabels
            gutterSize={2}
            showOutOfRangeDays
            classForValue={(value) => {
              if (value === null) {
                return 'color-rect color-empty';
              }
              const colorMapIdx = [0, 5, 10, 15, 20, 25, 30].filter((item) => item <= value.count).length;
              return 'color-rect ' + (colorMapIdx <= 0 ? 'color-empty' : `color-scale-${colorMapIdx}`);
            }}
            tooltipDataAttrs={({date, count}) => {
              if (count === null) {
                return { 'data-tooltip': 'No data' };
              }
              return { 'data-tooltip': `${date}<br>${count}` };
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
  )
}
