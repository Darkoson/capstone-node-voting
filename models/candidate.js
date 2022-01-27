'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Candidate.belongsTo(models.Poll,{
        foreignKey:'pollId',
        onDelete:'CASCADE'
      });
    }
  };
  Candidate.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    politicalParty: DataTypes.STRING,
    position: DataTypes.STRING,
    pollId: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Candidate',
  });
  return Candidate;
};