module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    user_id: {
      type: DataTypes.INTEGER,
    },
    task_id: {
      type: DataTypes.INTEGER,
    },
    notes: {
      type: DataTypes.STRING,
    },
  });

  return Log;
};
