module.exports = (db) => {
  const { Task, Machine } = db.sequelize.models;

  Machine.belongsToMany(Task, {
    through: 'MachineTask',
    as: 'tasks',
  });

  Task.belongsToMany(Machine, {
    through: 'MachineTask',
    as: 'machines',
  });
}
