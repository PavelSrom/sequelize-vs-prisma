const Sequelize = require("sequelize")
const sequelize = require("../sequelize")

const User = sequelize.define("sUser", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
})

module.exports = User
