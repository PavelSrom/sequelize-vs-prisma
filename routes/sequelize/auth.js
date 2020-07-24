const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../../middleware/auth")
const User = require("../../models/User")
const Profile = require("../../models/Profile")

router.post("/register", async (req, res) => {
  const { email, password } = req.body

  try {
    const userExists = await User.findOne({ where: { email } })
    if (userExists) return res.status(400).send({ message: "Email taken" })

    const newUser = User.build({ email })
    newUser.password = await bcrypt.hash(password, 8)
    await newUser.save()

    const token = jwt.sign({ id: newUser.id }, "superSecret", {
      expiresIn: 3600,
    })

    return res.status(201).send({ token })
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(400).send({ message: "Invalid credentials" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).send({ message: "Invalid credentials" })

    const token = jwt.sign({ id: user.id }, "superSecret", {
      expiresIn: 3600,
    })

    return res.send({ token })
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.delete("/", auth, async (req, res) => {
  try {
    const myProfile = await Profile.findOne({ where: { userId: req.userID } })
    if (!myProfile)
      return res.status(404).send({ message: "Profile not found" })

    const me = await User.findOne({ where: { id: req.userID } })
    if (!me) return res.status(404).send({ message: "User not found" })

    await myProfile.destroy()
    await me.destroy()

    return res.send({ message: "Account deleted" })
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

module.exports = router
