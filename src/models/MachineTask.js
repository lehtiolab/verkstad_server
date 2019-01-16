module.exports = (sequelize, DataTypes) => {
  const MachineTask = sequelize.define('MachineTask', {
    done: {
      type: DataTypes.DATE,
    },
  });

  return MachineTask;
};
