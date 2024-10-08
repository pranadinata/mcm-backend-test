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
      rencana_studi.belongsTo(models.mahasiswa, {foreignKey: 'mahasiswa_id', as: 'Mahasiswa'});

      rencana_studi.belongsTo(models.mata_kuliah, {foreignKey: 'mata_kuliah_id', as: 'MataKuliah'});
      
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