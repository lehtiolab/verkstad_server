const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config')

const db = {};

const sequelize = new Sequelize(
  config.db.database,
  //config.db.user,
  //config.db.password,
  config.db.options
);

['Log.js', 'Machine.js', 'MachineTask.js', 'Task.js', 'User.js']
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

require('./associations')(db);

module.exports = db;
