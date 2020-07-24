const Sequelize = require("sequelize").Sequelize // VSC intelli-sense
const config = require("config")
const pg = require("pg")

pg.defaults.ssl = true

const sequelize = new Sequelize({
  database: config.get("database"),
  username: config.get("username"),
  password: config.get("password"),
  host: config.get("host"),
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

module.exports = sequelize
