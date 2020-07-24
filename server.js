const express = require("express")
const sequelize = require("./sequelize")

const User = require("./models/User")
const Post = require("./models/Post")
const Profile = require("./models/Profile")

const app = express()

app.use(express.json())
app.use("/api/prisma/auth", require("./routes/prisma/auth"))
app.use("/api/prisma/post", require("./routes/prisma/post"))
app.use("/api/prisma/profile", require("./routes/prisma/profile"))
app.use("/api/sequelize/auth", require("./routes/sequelize/auth"))
app.use("/api/sequelize/post", require("./routes/sequelize/post"))
app.use("/api/sequelize/profile", require("./routes/sequelize/profile"))

sequelize
  .authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err))

User.hasMany(Post)
Post.belongsTo(User, { foreignKey: "authorId" })
User.hasOne(Profile)
Profile.belongsTo(User, { foreignKey: "userId" })

sequelize
  .sync()
  .then(() => console.log("Models synced"))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
