'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rencana_studi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rencana_studi.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    mahasiswa_id: DataTypes.UUID,
    mata_kuliah_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'rencana_studi',
  });
  return rencana_studi;
};