module.exports = (db) => {
  const { Task, Machine, MachineTask, User, Log } = db.sequelize.models;

  MachineTask.belongsTo(Machine, {
    foreignKey: 'machineId',
  });

  MachineTask.belongsTo(Task, {
    foreignKey: 'taskId',
  });

  Log.belongsTo(MachineTask, {
    foreignKey: 'machineTaskId',
  });

  Log.belongsTo(User, {
    foreignKey: 'userId',
  });

  User.hasMany(Machine, {
    foreignKey: 'userId',
  });

  User.hasMany(Task, {
    foreignKey: 'userId',
  });
}
