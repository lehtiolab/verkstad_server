const { Task } = require('../models');

module.exports = {
  async add(req, res) {
    try {
      const task = await Task.create(req.body);
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
        attributes: ['name', 'description', 'interval', 'createdAt'],
        limit: 50,
      });
      res.send(tasks);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the tasks.',
      });
    }
  },
};
