'use strict';
const {
  Model
} = require('sequelize');
const { HashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Quiz,{foreignKey:"userId"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull : {
          msg: "Email is Required"
        },
        notEmpty : {
          msg: "Email is Required"
        }
      }
    },
    password:  {
      type : DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull : {
          msg: "Password is Required"
        },
        notEmpty : {
          msg: "Password is Required"
        }
      }
    }
  }, {
    sequelize, 
    hooks: {
      beforeCreate(user) {
        user.password = HashPass(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};