import { pondNameZhCN } from './common';

class QuadrantUtil {
  constructor(tasks) {
    this._tasks = tasks ?? [];
    Math.seed = new Date().getTime();
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks ?? [];
  }

  getData() {
    return this._tasks.map((task) => {
      return {
        importance: task.importance,
        urgency: task.urgency,
        x: task.urgency + Math.random() * 0.4 - 0.2,
        y: task.importance + Math.random() * 0.4 - 0.2,
        describe: task.describe,
        belong: pondNameZhCN[task.belong],
      };
    });
  }
}

export default QuadrantUtil;
