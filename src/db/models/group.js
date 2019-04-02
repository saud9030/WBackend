"use strict";
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      // leader: DataTypes.STRING,
      founded: DataTypes.DATEONLY,
      description: DataTypes.TEXT,
      contact_number: DataTypes.DOUBLE,
      email: DataTypes.STRING,
      type: DataTypes.STRING
    },
    { tableName: "groups" }
  );
  Group.associate = function(models) {
    Group.belongsTo(models.User, {
      foreignKey: "user_id"
    });
    Group.hasMany(models.UserGroup, {
      foreignKey: "group_id"
    });
    Group.hasMany(models.Vevent, {
      foreignKey: "group_id"
    });
    Group.belongsToMany(models.User, {
      as: "groupMemberships",
      through: "userGroup",
      foreignKey: "group_id"
    });
    // Group.hasMany(models.Volunteeringevent, {
    //   foreignKey: "group_id",
    //   as: "events"
    // });
  };
  return Group;
};
