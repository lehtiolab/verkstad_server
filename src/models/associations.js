module.exports = (db) => {
  const { Task, Machine, MachineTask, User, Log } = db.sequelize.models;

  Machine.hasMany(MachineTask, {
    foreignKey: 'machineId',
  });
  MachineTask.belongsTo(Machine);

  Task.hasMany(MachineTask, {
    foreignKey: 'taskId',
  });
  MachineTask.belongsTo(Task);

  MachineTask.hasMany(Log, {
    foreignKey: 'machineTaskId',
  });
  Log.belongsTo(MachineTask);

  User.hasMany(Log, {
    foreignKey: 'userId',
  });
  User.hasMany(Machine, {
    foreignKey: 'userId',
  });
  User.hasMany(Task, {
    foreignKey: 'userId',
  });
}
