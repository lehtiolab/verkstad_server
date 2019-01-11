module.exports = (sequelize, DataTypes) => {
  const DueTask = sequelize.define('DueTask', {
    task_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    latest_date: {
      type: DataTypes.DATEONLY,
    },
  });

  return DueTask;
};
