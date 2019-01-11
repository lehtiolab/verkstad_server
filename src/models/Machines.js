module.exports = (sequelize, DataTypes) => {
  const Machine = sequelize.define('Machine', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
    },
  });

  return Machine;
};
