module.exports = (sequelize, DataTypes) => {
  const MachineTask = sequelize.define('MachineTask', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return MachineTask;
};
