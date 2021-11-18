import { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import Popover from '../Popover';
import './index.css';

export default function index({ heatmapValues, lastYearDate, curDate }) {
  const [popoverTop, setPopoverTop] = useState(0);
  const [popoverLeft, setPopoverLeft] = useState(0);
  const [popoverContent, setPopoverContent] = useState('');
  const [popoverVisibility, setPopoverVisibility] = useState(false);

  return (
    <div id="calendar-heatmap">
      <Popover content={popoverContent} top={popoverTop} left={popoverLeft} visibility={popoverVisibility} />
      <CalendarHeatmap
        values={heatmapValues}
        startDate={lastYearDate}
        endDate={curDate}
        monthLabels={[
          '1 月',
          '2 月',
          '3 月',
          '4 月',
          '5 月',
          '6 月',
          '7 月',
          '8 月',
          '9 月',
          '10 月',
          '11 月',
          '12 月',
        ]}
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
          return { 'data-tooltip': `${d.getMonth() + 1}月${d.getDate()}日 ${count}次记录` };
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
  );
}
