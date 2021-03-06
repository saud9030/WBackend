("use strict");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        isUnique: {
          args: true,
          msg: "name is already taken"
        },
        validate: {
          len: {
            args: [3, 20],
            msg: "your name should be between 3 and 20 letters"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        },
        isUnique: {
          args: true,
          msg: "email is already taken"
        }
      },
      password: {
        type: DataTypes.STRING,
        // field: "hashed_password",
        allowNull: false
      },
      number: {
        allowNull: true,
        type: DataTypes.DOUBLE
        // validate: {
        //   // isNumeric: {
        //   //   args: true,
        //   //   msg: "Only numbers are acceptable"
        //   // },
        //   // to ensure that the user will add 10 digits whenever they decide to add a number.
        //   givenNumber(num) {
        //     if (num === null && num.length !== 10) {
        //       throw new error(`your contact number should have 10 digits`);
        //     }
        //   }
        // }
      },
      // true for male, false for female
      gender: {
        type: DataTypes.STRING
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "users",
      hooks: {
        beforeCreate: user => {
          const hashCost = 10;
          user.password = bcrypt.hashSync(user.password, hashCost);
        }
      }
    }
  );

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.bcrypt = function(password) {
    // authentication will take approximately 13 seconds
    // https://pthree.org/wp-content/uploads/2016/06/bcrypt.png
    const hashCost = 10;
    this.password = bcrypt.hashSync(password, hashCost);
    this.save();
  };
  User.associate = function(models) {
    // const Member = sequelize.define(
    //   "Member",
    //   {
    //     number: DataTypes.INTEGER
    //   },
    //   { tableName: "group_users" }
    // );
    User.hasMany(models.Group, {
      foreignKey: "user_id"
    });
    User.hasMany(models.UserGroup, {
      foreignKey: "user_id"
    });
    User.belongsToMany(models.Group, {
      as: "groupMemberships",
      through: "userGroup",
      foreignKey: "user_id"
    });
    User.hasMany(models.Attendee, {
      foreignKey: "user_id"
    });
    User.belongsToMany(models.Vevent, {
      as: "attendance",
      through: "attendee",
      foreignKey: "user_id"
    });
  };
  return User;
};
