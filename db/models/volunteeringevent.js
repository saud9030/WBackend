'use strict';
module.exports = (sequelize, DataTypes) => {
  const Volunteeringevent = sequelize.define('Volunteeringevent', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    data: DataTypes.DATEONLY,
    type: DataTypes.STRING
  }, {});
  Volunteeringevent.associate = function(models) {
    // associations can be defined here
  };
  return Volunteeringevent;
};