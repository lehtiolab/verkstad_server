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

  Machine.belongsTo(User, {
    foreignKey: 'userId',
  });

  Task.belongsTo(User, {
    foreignKey: 'userId',
  });
}
