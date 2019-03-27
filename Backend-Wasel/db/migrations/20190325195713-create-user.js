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
        allowNull: false,
        isUnique: {
          args: true,
          msg: "name is already taken"
        },
        validate: {
          len: {
            args: [3, 20],
            msg: "your name should be between 3 and 20 letters"
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        isUnique: {
          args: true,
          msg: "email is already taken"
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      age: {
        allowNull: false,
        type: Sequelize.DATEONLY
        // validate: {
        //   // to limit the user's age between 18 and 80
        //   allowedAge(age) {
        //     if (age < 18 || age > 80) {
        //       throw new error(`you're probably too young to sign up`);
        //     }
        //   }
        // }
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
