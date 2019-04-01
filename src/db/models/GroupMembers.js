export default (sequelize, DataTypes) => {
  const GroupMembers = sequelize.define("GroupMembers", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "groups",
        key: "id"
      }
    }
  });
  return GroupMembers;
};
