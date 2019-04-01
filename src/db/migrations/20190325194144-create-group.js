"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      // leader: {
      //   type: Sequelize.STRING,
      //   allowNull: false
      // },
      founded: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      contact_number: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        validate: {
          isNumeric: {
            args: true,
            msg: "Only numbers are acceptable"
          },
          // to ensure that the user will add 10 digits whenever they decide to add a number.
          givenNumber(num) {
            if (num === null && num.length !== 10) {
              throw new error(`your contact number should have 10 digits`);
            }
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("groups");
  }
};
