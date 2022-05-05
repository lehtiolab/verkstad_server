const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

const SALT_FACTOR = 8;

function hashPassword(user, options) {

  if (!user.changed('password')) {
    return;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    }
  });

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password);
  }

  User.upsert({
      id: 1,
      email: process.env.INITUSER_MAIL,
      name: process.env.INITUSER_NAME,
      password: bcrypt.hashSync(process.env.INITUSER_PASS, bcrypt.genSaltSync(SALT_FACTOR)),
  });
  return User;
};
