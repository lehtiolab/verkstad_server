const { Machine, MachineTask } = require('../models');

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
        limit: 30,
      });
      res.send(machines);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the machines.',
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
