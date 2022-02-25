const { Machine, MachineTask, User } = require('../models');

module.exports = {
  async add(req, res) {
    try {
      const data = {
        ...req.body,
        userId: req.user.id,
      }
      const machine = await Machine.create(data);
      res.send({
        machine: machine.toJSON(),
      });
    } catch (err) {
      res.status(400).send({
        error: 'Error during machine creation.',
      });
    }
  },
  async update(req, res) {
    try {
      const data = {
        ...req.body,
        userId: req.user.id,
      }
      await Machine.update(data, {
        where: {
          id: req.params.machineId,
        }
      });
      res.send({
        message: 'Update successful.',
      });
    } catch (err) {
      res.status(400).send({
        error: 'Error during machine update.',
      });
    }
  },
  async index(req, res) {
    try {
      const machines = await Machine.findAll({
        limit: 30,
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      res.send(machines);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the machines.',
      });
    }
  },
  async machine(req, res) {
    try {
      const machine = await Machine.findOne({
        where: {
          id: req.params.machineId,
        },
      });
      res.send(machine);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch a machine.',
      });
    }
  },
  async delete(req, res) {
    try {
      const machine = await Machine.findOne({
        where: {
          id: req.params.machineId,
        },
      });
      
      const machineTasks = await MachineTask.findAll({
        where: {
          machineId: req.params.machineId,
        },
      });
      
      machineTasks.forEach(machineTask => {
        machineTask.destroy();
      });
      machine.destroy();

      res.send({
        message: 'Deletion successful.',
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured during machine deletion.',
      });
    }
  },
};
