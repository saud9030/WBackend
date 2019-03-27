'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Volunteeringevents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5,50],
            msg: "the title is too long, add more details in the info section"
          },
      },
      info: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        validate: {
          // to ensure that the user have chosen the right date but limiting the date to today and after
          checkDate(day) {
            let today = new Date();
            let validDate = today.setDate(today.getDate()-1);
            if (day < validDate){
              throw new error('you only can choose from today and onward')
            }
          }
        }
      },
      type: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Volunteeringevents');
  }
};