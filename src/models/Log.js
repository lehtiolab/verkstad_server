module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    status: {
      type: DataTypes.STRING,
    },
    task: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    repare: {
      type: DataTypes.STRING,
    },
    machine: {
      type: DataTypes.STRING,
    },
    interval: {
      type: DataTypes.TIME,
    },
    user: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
  });

  return Log;
};
