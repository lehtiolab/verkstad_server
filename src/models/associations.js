module.exports = (db) => {
  const { Task, Machine, MachineTask, User, Log } = db.sequelize.models;

  // Machine.hasMany(MachineTask, {
  //   foreignKey: 'machineId',
  // });
  MachineTask.belongsTo(Machine, {
    foreignKey: 'machineId',
  });

  // Task.hasMany(MachineTask, {
  //   foreignKey: 'taskId',
  // });
  MachineTask.belongsTo(Task, {
    foreignKey: 'taskId',
  });

  // MachineTask.hasMany(Log, {
  //   foreignKey: 'machineTaskId',
  // });
  Log.belongsTo(MachineTask, {
    foreignKey: 'machineTaskId',
  });

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
