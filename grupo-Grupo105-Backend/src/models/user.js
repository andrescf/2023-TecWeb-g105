'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Player, {
        foreignKey: 'id'
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: 'Tu username debe ser alphanumerico'
        }
      }},
    password: DataTypes.STRING,
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Tu mail debe tener formato de email'
        }
      }}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};