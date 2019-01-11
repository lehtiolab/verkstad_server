const { Log, Task } = require('../models');

function addDaysToDate(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

module.exports = {
  async index(req, res) {
    try {
      const tasks = await Task.findAll({
        limit: 50,
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
        if (lastTaskDate.length === 0) {
          lastTaskDate = element.startDate;
        }
        
        // add the interval to the date
        const dueTaskDate = addDaysToDate(lastTaskDate, element.interval);

        return {
          ...element,
          dueTaskDate,
        }
      }));

      res.send({
        dueTasks: dueTasks.toJSON(),
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to predict and fetch the coming tasks.',
      });
    }
  },
};
