const { Log, Task, Machine } = require('../models');

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
      const tasks = await Task.findAll({
        limit: 50,
        include: [
          {
            model: Machine,
            as: 'machines',
          },
        ],
      });

      const dueTasks = await Promise.all(tasks.map(async element => {
        // check if it is in the logbook --> calculate new due date and send back
        let lastTaskDate = await Log.findAll({
          limit: 1,
          where: {
            id: element.task_id,
          },
          order: [[ 'createdAt', 'DESC' ]],
          attributes: ['createdAt'],
        });

        // if not in the logbook, take the start date as calculation base
        let interval = 0;
        if (lastTaskDate.length === 0) {
          lastTaskDate = element.startDate;
        } else {
          interval = element.interval;
        }

        // calculate due date
        const dueTaskDate = addDaysToDate(lastTaskDate, interval);

        const response = {
          task: element,
          nextDate: dueTaskDate,
          dayDiff: getDayDiff(dueTaskDate),
        }
        
        return response;
      }));

      res.send({
        dueTasks: dueTasks,
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to predict and fetch the coming tasks.',
      });
    }
  },
};
