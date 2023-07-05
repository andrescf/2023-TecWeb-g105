'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Board, {
        foreignKey: 'id',
      });
      this.hasMany(models.Player, {
        foreignKey: 'id',
      });
    }
  }
  Game.init({
    state: DataTypes.STRING,
    winner: DataTypes.STRING,
    turn: DataTypes.INTEGER,
    turn_list: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};