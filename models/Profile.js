const Sequelize = require("sequelize")
const sequelize = require("../sequelize")

const Profile = sequelize.define("sProfile", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING(50),
  },
  role: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
})

module.exports = Profile
