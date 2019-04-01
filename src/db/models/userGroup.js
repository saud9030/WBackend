"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define(
    "UserGroup",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      },
      group_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      }
    },
    {
      tableName: "userGroups"
    }
  );
  UserGroup.associate = function(models) {
    // associations can be defined here
  };
  return UserGroup;
};
