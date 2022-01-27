'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Poll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Poll.hasMany(models.Candidate,{
        foreignKey:'pollId',
        onDelete:'CASCADE'
      })
    }
  };
  Poll.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Poll',
  });
  return Poll;
};