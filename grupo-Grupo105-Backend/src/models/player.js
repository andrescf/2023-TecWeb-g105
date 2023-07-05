'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
      this.hasMany(models.Hexagon, {
        foreignKey: 'id',
      });
    }
  }
  Player.init({
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: 'Tu name debe ser alphanumerico'
        }
      }},
    resources: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    state: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};