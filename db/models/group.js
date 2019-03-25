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
    // associations can be defined here
  };
  return Group;
};
