const { Log } = require('../models');

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
      })
    }
  },
  async index(req, res) {
    try {
      const logs = await Log.findAll({
        limit: 50,
      });
      res.send(logs);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the logbook.',
      });
    }
  },
};
