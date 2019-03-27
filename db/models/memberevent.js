'use strict';
module.exports = (sequelize, DataTypes) => {
  const MemberEvent = sequelize.define('MemberEvent', {
    volunteeringevent_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  MemberEvent.associate = function(models) {
    // associations can be defined here
  };
  return MemberEvent;
};