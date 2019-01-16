const { Log, MachineTask, User, Machine, Task } = require('../models');

module.exports = {
  async add(req, res) {
    try {
      const data = {
        ...req.body,
        userId: req.user.id,
      };
      const log = await Log.create(data);
      res.send({
        log: log.toJSON(),
      });
    } catch (err) {
      res.status(400).send({
        error: 'The log could not be created.',
      });
    }
  },
  async delete(req, res) {
    try {
      const log = await Log.findOne({
        where: {
          id: req.params.logId,
        },
      });

      log.destroy();

      res.send({
        message: 'Log deleted.',
      });
    } catch (err) {
      res.status(400).send({
        error: 'The log could not be deleted.',
      });
    }
  },
  async index(req, res) {
    try {
      const logs = await Log.findAll({
        limit: 100,
        include: [
          {
            model: MachineTask,
            include: [
              {
                model: Machine,
              },
              {
                model: Task,
              },
            ],
          },
          {
            model: User,
          },
        ],
      });

      const response = logs.map(log => ({
        id: log.id,
        taskName: log.MachineTask ? (log.MachineTask.Task.name 
          ? log.MachineTask.Task.name : 'deleted') : 'deleted',
        createdAt: log.createdAt,
        machineName: log.MachineTask ? (log.MachineTask.Machine.name 
          ? log.MachineTask.Machine.name : 'deleted') : 'deleted',
        mode: log.mode,
        userName: log.User ? log.User.name : 'deleted',
      }));

      res.send(response);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the logbook.',
      });
    }
  },
  async log(req, res) {
    try {
      const log = await Log.findOne({
        where: {
          id: req.params.logId,
        },
        include: [
          {
            model: MachineTask,
            include: [
              {
                model: Machine,
              },
              {
                model: Task,
              },
            ],
          },
          {
            model: User,
          },
        ],
      });
      res.send(log);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the logbook.',
      });
    }
  },
};
