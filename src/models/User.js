module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name:  {
      type: DataTypes.STRING,
    },
    password:  {
      type: DataTypes.STRING,
    },
  });

  return User;
};
