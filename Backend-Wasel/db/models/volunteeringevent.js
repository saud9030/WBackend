"use strict";
module.exports = (sequelize, DataTypes) => {
  const Volunteeringevent = sequelize.define(
    "Volunteeringevent",
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      data: DataTypes.DATEONLY,
      type: DataTypes.STRING
    },
    {}
  );
  Volunteeringevent.associate = function(models) {
    Volunteeringevent.belongsTo(models.Group, {
      foreignKey: "group_id"
    });
    Volunteeringevent.belongsToMany(models.User, {
      through: "memberevent",
      as: "attendees",
      foreignKey: "volunteeringevent_id"
    });
  };
  return Volunteeringevent;
};
