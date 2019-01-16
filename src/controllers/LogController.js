const { Log, MachineTask, User, Machine, Task } = require('../models');

module.exports = {
  async add(req, res) {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });

      const machineTask = await MachineTask.findOne({
        where: {
          id: req.body.machineTaskId,
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

      const log = await Log.create({
        status: req.body.status,
        task: machineTask.Task.name,
        description: machineTask.Task.description,
        repare: machineTask.Task.repare,
        machine: machineTask.Machine.name,
        interval: machineTask.Task.interval,
        user: user.name,
        comment: req.body.comment,
      });

      // add the done date to MachineTask
      machineTask.update({
        done: new Date(),
      });
      
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
      });

      res.send(logs);
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
      });

      res.send(log);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the logbook.',
      });
    }
  },
};
