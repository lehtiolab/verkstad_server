module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    mode: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
  });

  return Log;
};
