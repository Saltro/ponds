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
    const value = new Map();

    history.forEach(({ dropTime: d }) => {
      const dropDate = new Date(d.slice(0, 10));
      if (dropDate >= date) {
        if (value.has(dropDate.getTime())) {
          value.set(dropDate.getTime(), {
            date: d.slice(0, 10),
            count: value.get(dropDate.getTime()).count + 1,
          });
        } else {
          value.set(dropDate.getTime(), {
            date: d.slice(0, 10),
            count: 1,
          });
        }
      }
    });

    const res = [];
    for (const item of value.values()) {
      res.push(item);
    }

    return res;
  }

  getAllHistoryValuesFrom(date) {
    const { history } = this;
    const value = {};

    history.forEach(({ dropTime: d, toId }) => {
      const dropDate = d.slice(0, 10);
      if (new Date(dropDate) >= date) {
        if (value.hasOwnProperty(dropDate)) {
          if (value[dropDate].hasOwnProperty(toId)) {
            value[dropDate][toId].count += 1;
          } else {
            value[dropDate][toId] = {
              count: 1,
            };
          }
        } else {
          value[dropDate] = {};
          value[dropDate][toId] = {
            count: 1,
          };
        }
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

    console.log(res);

    return res;
  }
}

export default AnalysisUtil;
