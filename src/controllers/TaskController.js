const { Task, MachineTask, Machine, User } = require('../models');

module.exports = {
  async add(req, res) {
    try {
      const data = {
        ...req.body.task,
        userId: req.user.id,
      };
      const task = await Task.create(data);
      const machineTasks = Promise.all(req.body.machineIds.map(async machineId => {
        return await MachineTask.create({
          taskId: task.id,
          machineId: machineId,
        });
      }));
      res.send({
        machineTasks: machineTasks,
      });
    } catch (err) {
      res.status(400).send({
        error: 'The task name is already in the database.',
      })
    }
  },
  async index(req, res) {
    try {
      const tasks = await Task.findAll({
        limit: 100,
        include: [
          {
            model: User,
          },
        ],
      });
      res.send(tasks);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the tasks.',
      });
    }
  },
  async task(req, res) {
    try {
      const task = await Task.findOne({
        where: {
          id: req.params.taskId,
        },
        include: [
          {
            model: User,
          },
          {
            model: MachineTask,
            include: [
              {
                model: Machine,
              },
            ],
          },
        ],
      });
      res.send(task);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch a task.',
      });
    }
  },
  async delete(req, res) {
    try {
      const task = await Task.findOne({
        where: {
          id: req.params.taskId,
        },
      });

      const machineTasks = await MachineTask.findAll({
        where: {
          taskId: req.params.taskId,
        },
      });
      
      machineTasks.forEach(machineTask => {
        machineTask.destroy();
      });
      task.destroy();

      res.send({
        message: 'Task deleted.',
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured during task deletion.',
      });
    }
  },
};
