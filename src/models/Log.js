module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    doneDate: {
      type: DataTypes.DATE,
    },
    comment: {
      type: DataTypes.STRING,
    },
  });

  return Log;
};
