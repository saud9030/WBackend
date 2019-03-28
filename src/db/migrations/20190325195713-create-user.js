"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        allowNull: false,
        field: "hashed_password",
        type: Sequelize.STRING
      },
      number: {
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
      gender: {
        allowNull: false,
        // true is for male, and false is for female
        type: Sequelize.BOOLEAN
      },
      occupation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bio: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
