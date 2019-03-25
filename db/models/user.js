"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.BOOLEAN,
      occupation: DataTypes.STRING,
      bio: DataTypes.TEXT
    },
    {}
  );
  User.associate = function(models) {
    User.belongsToMany(models.Group, {
      through: "GroupUser",
      as: "groups",
      foreignKey: "user_id"
    });
    User.belongsToMany(models.volunteeringevent, {
      through: "memberevent",
      as: "events",
      foreignKey: "user_id"
    });
  };
  return User;
};
