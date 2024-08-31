'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mata_kuliah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        mata_kuliah.hasMany(models.rencana_studi, { foreignKey: 'mata_kuliah_id', as: 'RencanaStudi' });
    }
  }
  mata_kuliah.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nama_matkul: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'mata_kuliah',
  });
  return mata_kuliah;
};