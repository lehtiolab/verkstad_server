const { Log, Task, Machine, MachineTask } = require('../models');

function addDaysToDate(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getDayDiff(date) {
  return (new Date - date) / (1000 * 60 * 60 * 24);
}

module.exports = {
  async index(req, res) {
    try {
      const tasks = await MachineTask.findAll({
        limit: 100,
        include: [
          {
            model: Task,
          },
          {
            model: Machine,
          },
        ],
      });
      
      // search in log for every id
      // not found: use start date from Task table directly
      // found: use last execution date from log

      // modify this!
      const response = {
        task: element,
        nextDate: dueTaskDate,
        dayDiff: getDayDiff(dueTaskDate),
      }

      res.send({
        dueTasks: dueTasks,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'An error has occured trying to predict and fetch the coming tasks.',
      });
    }
  },
};
