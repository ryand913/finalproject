'use strict';
const {
  Model, DataTypes
} = require('sequelize');

var bcrypt = require('bcryptjs');
module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  //define a User attribtues
  User.init({
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate:{
          notNull: {
            msg: "A first name is required"
          },
          notEmpty:{
            msg: "A first name is required to make an account"
          }
        }
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate:{
          notNull: {
            msg: "A last name is required"
          },
          notEmpty:{
            msg: "A last name is required to make an account"
          }
        }
    },
    emailAddress:{
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        unique: {
          msg: 'Email address already in use!'
        },
        isEmail: true,
        validate:{
          notNull: {
            msg: "An email address is required"
          },
          isEmail: {
            msg: 'Please provide a valid email address to make an account'
          },
          notEmpty:{
            msg: "An email address is required  to make an account"
          }
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        set(val){
          const hashPassword = bcrypt.hashSync(val,10);
          this.setDataValue('password', hashPassword)
        },
        validate: {
          notNull: {
            msg: 'A password is required'
          },
          notEmpty:{
            msg: "A password is required to make an account"
          }
        }
    },
}, {
    sequelize
  });
    User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
      },
    });
  };
  return User;
};