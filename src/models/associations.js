module.exports = (db) => {
  const { Task, Machine, MachineTask, User, Log } = db.sequelize.models;

  MachineTask.belongsTo(Machine, {
    foreignKey: 'machineId',
  });

  MachineTask.belongsTo(Task, {
    foreignKey: 'taskId',
  });

  Task.hasMany(MachineTask, {
    foreignKey: 'taskId',
  });

  Log.belongsTo(MachineTask, {
    foreignKey: 'machineTaskId',
  });

  Log.belongsTo(User, {
    foreignKey: 'userId',
  });

  Machine.belongsTo(User, {
    foreignKey: 'userId',
  });

  Task.belongsTo(User, {
    foreignKey: 'userId',
  });
}
