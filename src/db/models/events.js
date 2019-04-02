'use strict';
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {});
  events.associate = function(models) {
    // associations can be defined here
  };
  return events;
};