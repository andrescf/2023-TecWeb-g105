'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Building extends Model {

    static associate(models) {
      this.belongsTo(models.Hexagon, {
        foreignKey: 'hexagonId',
      });
      this.hasMany(models.NPC, {
        foreignKey: 'id',
      });
    }

    static hooks(models) {
      this.beforeDestroy(async (building, options) => {
        const NPCs = await models.NPC.findAll({
          where: {
            buildingId: building.id,
          },
        });
        // Eliminar todos los NPCs asociados al Building
        await Promise.all(NPCs.map(npc => npc.destroy()));
      });
    }
  }
  Building.init({
    type: DataTypes.STRING,
    occupiedCapacity: DataTypes.INTEGER,
    currentCapacity: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    hexagonId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Building',
  });
  return Building;
};