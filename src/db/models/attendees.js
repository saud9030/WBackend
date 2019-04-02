"use strict";
module.exports = (sequelize, DataTypes) => {
  const Attendee = sequelize.define(
    "Attendee",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      },
      vevent_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "vevents",
          key: "id"
        }
      }
    },
    { tableName: "attendees" }
  );
  Attendees.associate = function(models) {
    // associations can be defined here
  };
  return Attendee;
};
