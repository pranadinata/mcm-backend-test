'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personal_access_token extends Model {

    static associate(models) {
      // define association here
    }
  }
  personal_access_token.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tokenable_type: DataTypes.STRING,
    tokenable_id: DataTypes.STRING,
    name: DataTypes.STRING,
    token: DataTypes.STRING,
    expires_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'personal_access_token',
  });
  return personal_access_token;
};