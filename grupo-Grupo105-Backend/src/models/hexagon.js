'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hexagon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'playerId',
        allowNull: true,
      });
      this.belongsTo(models.Board, {
        foreignKey: 'boardId',
      });
      this.hasOne(models.Building, {
        foreignKey: 'id',
      });
    }
  }
  Hexagon.init({
    boardId: DataTypes.INTEGER,
    playerId:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    position: DataTypes.INTEGER,
    height: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hexagon',
  });
  return Hexagon;
};