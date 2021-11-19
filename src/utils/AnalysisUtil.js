import { pondId, pondNameZhCN } from './common';

class AnalysisUtil {
  constructor({ history, registerAt }) {
    this.history = history;
    this.registerAt = registerAt;
    this.date = new Date();
  }

  executePerDayAvg() {
    const { history, registerAt, date } = this;
    const totalDay = (date - registerAt) / (1000 * 60 * 60 * 24);
    let total = 0;

    history.forEach(({ fromId, toId }) => {
      if (fromId === pondId['execute-pond'] && (toId === pondId['accept-pond'] || toId === pondId['finish-pond'])) {
        total++;
      }
    });

    return total / totalDay;
  }

  finishPerWeekAvg() {
    const { history, registerAt, date } = this;
    const totalWeek = (date - registerAt) / (1000 * 60 * 60 * 24 * 7);
    let total = 0;

    history.forEach(({ fromId, toId }) => {
      if (fromId === pondId['accept-pond'] && toId === pondId['finish-pond']) {
        total++;
      }
    });

    return total / totalWeek;
  }

  numberOfExecutingDays() {
    const { history } = this;
    const dateSet = new Set();

    history.forEach(({ dropTime, fromId, toId }) => {
      if (fromId === pondId['execute-pond'] && (toId === pondId['accept-pond'] || toId === pondId['finish-pond'])) {
        // 只加入日期
        dateSet.add(dropTime.slice(0, 10));
      }
    });

    return dateSet.size;
  }

  accumulatedFinished() {
    return this.history.reduce((acc, { toId }) => (toId === pondId['finish-pond'] ? acc + 1 : acc), 0);
  }

  getHeatmapValuesFrom(date) {
    const { history } = this;
    const curDate = new Date();
    const value = new Map();

    // eslint-disable-next-line no-unmodified-loop-condition
    for (const time = new Date(date); time <= curDate; time.setDate(time.getDate() + 1)) {
      const timeStr = time.toISOString().slice(0, 10);
      value[timeStr] = {
        count: 0,
      };
    }

    history.forEach(({ dropTime: d }) => {
      if (new Date(d) >= date) {
        const dropDate = d.slice(0, 10);
        value[dropDate].count += 1;
      }
    });

    const res = [];
    for (const date in value) {
      if (Object.prototype.hasOwnProperty.call(value, date)) {
        res.push({
          date: date,
          count: value[date].count,
        });
      }
    }

    return res;
  }

  getAllHistoryValuesFrom(date) {
    const { history } = this;
    const curDate = new Date();
    const value = {};
    // eslint-disable-next-line no-unmodified-loop-condition
    for (const time = new Date(date); time <= curDate; time.setDate(time.getDate() + 1)) {
      const timeStr = time.toISOString().slice(0, 10);
      value[timeStr] = {};
      for (let belong = 1; belong <= 7; belong++) {
        value[timeStr][belong] = {
          count: 0,
        };
      }
    }

    history.forEach(({ dropTime: d, toId }) => {
      if (new Date(d) >= date) {
        const dropDate = d.slice(0, 10);
        // console.log(value[dropDate][toId]);
        value[dropDate][toId].count += 1;
      }
    });

    const res = [];
    for (const date in value) {
      if (Object.prototype.hasOwnProperty.call(value, date)) {
        for (const toId in value[date]) {
          if (Object.prototype.hasOwnProperty.call(value[date], toId)) {
            res.push({
              date: date,
              belong: pondNameZhCN[toId],
              count: value[date][toId].count,
            });
          }
        }
      }
    }

    // console.log(res);

    return res;
  }

  getHistoryByTaskId(id) {
    const { history } = this;
    const res = [];

    history.forEach(({ taskId, toId, dropTime }) => {
      if (id === taskId) {
        res.push({
          time: new Date(dropTime),
          type: pondNameZhCN[toId],
        });
      }
    });

    return res;
  }
}

export default AnalysisUtil;
