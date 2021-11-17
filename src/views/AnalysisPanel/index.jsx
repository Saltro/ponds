import React,{Component} from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import './index.css'
import './calendar-heatmap.css'
import AnalysisUtil from '../../utils/AnalysisUtil'
import history from '../../mock/history'


export default class AnalysisPanel extends Component {
  state = {
    analysis: new AnalysisUtil({
      history,
      registeDate: new Date('2020-01-14'),
    })
  }

  render () {
    const {analysis} = this.state;
    return (
      <div id="analysis-panel">
        <div className="calendar-container">
          <div id="calendar-heatmap">
            <CalendarHeatmap
              values={analysis.getValuesFrom(new Date('2021-1-17'))}
              startDate={new Date("2020-11-17")}
              endDate={new Date("2021-11-11")}
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
            />
          </div>
        </div>
        <div className="statistics-container">
          <div className="statistics-card">
            平均每日执行<span className="number">{analysis.executePerDayAvg().toFixed(1)}</span>个任务
          </div>
          <div className="statistics-card">
            平均每周完成<span className="number">{analysis.finishPerWeekAvg().toFixed(1)}</span>个任务
          </div>
          <div className="statistics-card">
            坚持执行任务<span className="number">{analysis.numberOfExecutingDays()}</span>天
          </div>
          <div className="statistics-card">
            一共完成<span className="number">{analysis.accumulatedFinished()}</span>个任务
          </div>
        </div>
      </div>
    )
  }
}
