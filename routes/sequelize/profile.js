const router = require("express").Router()
const auth = require("../../middleware/auth")
const Profile = require("../../models/Profile")

router.get("/", auth, async (req, res) => {
  try {
    const myProfile = await Profile.findOne({ where: { userId: req.userID } })
    if (!myProfile)
      return res.status(404).send({ message: "Profile not found" })

    return res.send(myProfile)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.post("/", auth, async (req, res) => {
  const { firstName, lastName, role, phoneNumber } = req.body

  try {
    const profileExists = await Profile.findOne({
      where: { userId: req.userID },
    })
    if (profileExists)
      return res.status(400).send({ message: "Profile already exists" })

    const newProfile = Profile.build({
      userId: req.userID,
      firstName,
      lastName,
      role,
    })

    if (phoneNumber) newProfile.phoneNumber = phoneNumber
    await newProfile.save()

    return res.status(201).send(newProfile)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.put("/", auth, async (req, res) => {
  const { role, phoneNumber } = req.body

  try {
    const myProfile = await Profile.findOne({ where: { userId: req.userID } })
    if (!myProfile)
      return res.status(404).send({ message: "Profile not found" })

    if (role) myProfile.role = role
    if (phoneNumber) myProfile.phoneNumber = phoneNumber
    await myProfile.save()

    return res.send(myProfile)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

module.exports = router
