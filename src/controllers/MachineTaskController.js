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
  async machineTask(req, res) {
    try {
      const machineTask = await MachineTask.findOne({
        where: {
          id: req.params.machineTaskId,
        },
        include: [
          {
            model: Task,
          },
          {
            model: Machine,
          },
        ],
      });
      res.send({
        machineTask: machineTask,
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error while fetching a MachineTask.',
      });
    }
  },
  async index(req, res) {
    try {
      // collect all the MachineTasks available
      const machineTasks = await MachineTask.findAll({
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
      
      const dueMachineTasks = await Promise.all(machineTasks.map(async machineTask => {
        // for each machineTask
        let lastMachineTaskDate = machineTask.done;
        let interval = machineTask.Task.interval;
        
        if (!lastMachineTaskDate) {
          lastMachineTaskDate = machineTask.Task.startDate;
          interval = 0;
        }

        const dueMachineTaskDate = addDaysToDate(lastMachineTaskDate, interval);

        const response = {
          machineTask: machineTask,
          nextDate: dueMachineTaskDate,
          dayDiff: getDayDiff(dueMachineTaskDate),
        }

        return response;
      }));

      res.send({
        machineTasks: dueMachineTasks,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'An error has occured trying to predict and fetch the coming tasks.',
      });
    }
  },
};
