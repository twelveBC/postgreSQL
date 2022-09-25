'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameHistories.belongsTo(models.UserGames)
    }
  }
  UserGameHistories.init({
    user: DataTypes.STRING,
    com: DataTypes.STRING,
    result: DataTypes.STRING,
    UserGameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserGameHistories',
  });
  return UserGameHistories;
};