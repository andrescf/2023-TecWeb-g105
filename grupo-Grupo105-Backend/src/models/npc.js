'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NPC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Building, {
        foreignKey: 'buildingId',
      });
    }
  }
  NPC.init({
    type: DataTypes.STRING,
    buildingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NPC',
  });
  return NPC;
};