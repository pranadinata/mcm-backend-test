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
    max_matkul: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'mahasiswa',
  });
  return mahasiswa;
};