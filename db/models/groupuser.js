'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    group_id: DataTypes.INTEGER,
    user_: DataTypes.INTEGER
  }, {});
  GroupUser.associate = function(models) {
    // associations can be defined here
  };
  return GroupUser;
};