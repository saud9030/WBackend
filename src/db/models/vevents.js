"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vevent = sequelize.define(
    "Vevent",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    },
    { tableName: "vevents" }
  );
  Vevent.associate = function(models) {
    // associations can be defined here
  };
  return Vevent;
};
