"use strict";
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      founded: DataTypes.DATEONLY,
      description: DataTypes.TEXT,
      contactNumber: DataTypes.DOUBLE,
      Email: DataTypes.STRING,
      type: DataTypes.STRING
    },
    {}
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
