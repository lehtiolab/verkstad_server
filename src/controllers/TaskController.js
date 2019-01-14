const { Task, User, Machine } = require('../models');

module.exports = {
  async add(req, res) {
    try {
      const task = await Task.create(req.body);
      const machines = await Machine.findAll({
        where: {
          id: req.body.machineIds,
        },
      });
      task.setMachines(machines);
      res.send({
        task: task.toJSON(),
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
        limit: 50,
        include: [
          {
            model: Machine,
            as: 'machines',
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
            model: Machine,
            as: 'machines',
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
      const { id, name } = req.body;
      const task = await Task.findOne({
        where: {
          id: id,
          name: name,
        },
      });
      task.destroy();
      res.send({
        message: ['The task', name, 'with id', id, 'has been deleted.'].join(' '),
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured during task deletion.',
      });
    }
  },
};
