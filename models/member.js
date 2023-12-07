'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Member.init({
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Birthday: DataTypes.DATE,
    Gender: DataTypes.STRING,
    Country: DataTypes.STRING,
    Nationality: DataTypes.STRING,
    Language: DataTypes.STRING,
    Qualification: DataTypes.STRING,
    Institution: DataTypes.STRING,
    YearCompleted: DataTypes.DATE,
    QualificationCountry: DataTypes.STRING,
    Address: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    ZipCode: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Email: DataTypes.STRING,
    PhysicalConditionCheck: DataTypes.BOOLEAN,
    PhysicalCondition: DataTypes.STRING,
    PhysicalConditionOther: DataTypes.STRING,
    MessageSource: DataTypes.STRING,
    Comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};