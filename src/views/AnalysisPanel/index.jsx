import React,{Component} from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import './index.css'
import './calendar-heatmap.css'


export default class AnalysisPanel extends Component {
  state = {
    values: [{
      date: '2021-2-16',
      count: 1
    }, {
      date: '2021-2-17',
      count: 6
    }, {
      date: '2021-2-26',
      count: 16
    }, {
      date: '2021-3-16',
      count: 28
    }, {
      date: '2021-3-17',
      count: 12
    }, {
      date: '2021-11-16',
      count: 10
    }],
    executePerDayAvg: 0,
    finishPerWeekAvg: 0,
    numberOfExecutingDays: 0,
    accumulatedFinished: 0
  }

  render () {
    const {values, executePerDayAvg, finishPerWeekAvg, numberOfExecutingDays, accumulatedFinished} = this.state
    return (
      <div id="analysis-panel">
        <div className="calendar-container">
          <div id="calendar-heatmap">
            <CalendarHeatmap
              values={values}
              startDate={new Date("2021-2-16")}
              endDate={new Date("2021-11-16")}
              monthLabels={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              weekdayLabels={["日", "一", "二", "三", "四", "五", "六"]}
              showWeekdayLabels
              gutterSize={2}
              showOutOfRangeDays
              classForValue={(value) => {
                if (value === null) {
                  return 'color-rect color-empty';
                }
                const colorMapIdx = [5, 10, 15, 20, 25, 30].filter((item) => item <= value.count).length;
                return 'color-rect ' + (colorMapIdx <= 0 ? 'color-empty' : `color-scale-${colorMapIdx}`);
              }}
            />
          </div>
        </div>
        <div className="statistics-container">
          <div className="statistics-card">
            平均每日执行<span className="number">{executePerDayAvg}</span>个任务
          </div>
          <div className="statistics-card">
            平均每周完成<span className="number">{finishPerWeekAvg}</span>个任务
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
}
