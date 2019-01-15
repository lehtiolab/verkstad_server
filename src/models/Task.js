module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    repare: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE
    },
    interval: {
      type: DataTypes.TIME,
    },
  });

  return Task;
};
