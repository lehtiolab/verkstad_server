const { Machine } = require('../models');

module.exports = {
  async add(req, res) {
    try {
      const machine = await Machine.create(req.body);
      res.send({
        machine: machine.toJSON(),
      });
    } catch (err) {
      res.status(400).send({
        error: 'The machine name is already in the database.',
      })
    }
  },
  async index(req, res) {
    try {
      const machines = await Machine.findAll({
        attributes: ['id', 'name', 'type', 'createdAt'],
        limit: 30,
      });
      res.send(machines);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the machines.',
      });
    }
  },
  async deleteMachine(req, res) {
    try {
      const { name } = req.body;
      const machine = await Machine.findOne({
        where: {
          name: name,
        },
      });
      machine.destroy();
      res.send({
        message: ['The machine', name, 'has been deleted.'].join(' '),
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured during machine deletion.',
      });
    }
  },
};
