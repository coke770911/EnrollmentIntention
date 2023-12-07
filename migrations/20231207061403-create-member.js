'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING
      },
      Birthday: {
        type: Sequelize.DATEONLY
      },
      Gender: {
        type: Sequelize.STRING
      },
      Country: {
        type: Sequelize.STRING
      },
      Nationality: {
        type: Sequelize.STRING
      },
      Language: {
        type: Sequelize.STRING
      },
      Qualification: {
        type: Sequelize.STRING
      },
      Institution: {
        type: Sequelize.STRING
      },
      YearCompleted: {
        type: Sequelize.DATEONLY
      },
      QualificationCountry: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      City: {
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      ZipCode: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      PhysicalConditionCheck: {
        type: Sequelize.BOOLEAN
      },
      PhysicalCondition: {
        type: Sequelize.STRING
      },
      PhysicalConditionOther: {
        type: Sequelize.STRING
      },
      MessageSource: {
        type: Sequelize.STRING
      },
      Comment: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Members');
  }
};