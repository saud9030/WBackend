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
    Vevent.belongsTo(models.Group, {
      foreignKey: "group_id"
    });
    Vevent.hasMany(models.Attendee, {
      foreignKey: "vevent_id"
    });
    Vevent.belongsToMany(models.Vevent, {
      as: "attendance",
      through: "attendee",
      foreignKey: "vevent_id"
    });
  };
  return Vevent;
};
