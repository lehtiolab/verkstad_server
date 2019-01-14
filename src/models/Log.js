module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    doneDate: {
      type: DataTypes.DATEONLY,
    },
    comment: {
      type: DataTypes.STRING,
    },
  });

  return Log;
};
