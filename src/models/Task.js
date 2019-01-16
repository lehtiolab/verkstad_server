module.exports = (sequelize, DataTypes) => {
  function modifyStartDate(task, options) {
    if (!task.changed('startDate')) {
      return;
    }

    return task.setDataValue('startDate', task.startDate.setHours(23, 59, 0, 0))
  }

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
  }, {
    hooks: {
      beforeCreate: modifyStartDate,
      beforeUpdate: modifyStartDate,
    }
  });

  return Task;
};
