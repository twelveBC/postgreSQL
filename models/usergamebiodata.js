'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameBiodata.belongsTo(models.UserGames)
    }
  }
  UserGameBiodata.init({
    fullname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    UserGameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserGameBiodata',
  });
  return UserGameBiodata;
};