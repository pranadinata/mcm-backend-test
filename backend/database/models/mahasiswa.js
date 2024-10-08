'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mahasiswa.hasMany(models.rencana_studi, { foreignKey: 'mahasiswa_id', as: 'RencanaStudi' });

    }
  }
  mahasiswa.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nama_lengkap: DataTypes.STRING,
    nim: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    semester: DataTypes.INTEGER,
    jurusan: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'mahasiswa',
  });
  return mahasiswa;
};