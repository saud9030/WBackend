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
  Attendee.associate = function(models) {
    Attendee.belongsTo(models.User, {
      foreignKey: "user_id"
    });

    Attendee.belongsTo(models.Vevent, {
      foreignKey: "vevent_id"
    });
  };
  return Attendee;
};
