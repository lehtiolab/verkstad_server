const { Log, MachineTask, User, Machine, Task } = require('../models');

module.exports = {
  async add(req, res) {
    try {
      const log = await Log.create(req.body);
      res.send({
        log: log.toJSON(),
      });
    } catch (err) {
      res.status(400).send({
        error: 'The log could not be created.',
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
      res.send(logs);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'An error has occured trying to fetch the logbook.',
      });
    }
  },
};
