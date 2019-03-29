"use strict";
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      leader: DataTypes.STRING,
      founded: DataTypes.DATEONLY,
      description: DataTypes.TEXT,
      contact_number: DataTypes.DOUBLE,
      email: DataTypes.STRING,
      type: DataTypes.STRING
    },
    { tableName: "groups" }
  );
  Group.associate = function(models) {
    Group.belongsToMany(models.User, {
      through: "GroupUser",
      as: "members",
      foreignKey: "group_id"
    });
    Group.hasMany(models.Volunteeringevent, {
      foreignKey: "group_id",
      as: "events"
    });
  };
  return Group;
};
