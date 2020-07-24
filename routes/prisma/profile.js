const router = require("express").Router()
const auth = require("../../middleware/auth")
const prisma = require("../../prisma-client")

router.get("/", auth, async (req, res) => {
  try {
    const myProfile = await prisma.profile.findOne({
      where: { userId: req.userID },
    })
    if (!myProfile)
      return res.status(404).send({ message: "Profile not found" })

    return res.send(myProfile)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.post("/", auth, async (req, res) => {
  try {
    const profileExists = await prisma.profile.findOne({
      where: { userId: req.userID },
    })
    if (profileExists)
      return res.status(404).send({ message: "Profile already exists" })

    const newProfile = await prisma.profile.create({
      data: {
        User: {
          connect: {
            id: req.userID,
          },
        },
        ...req.body,
      },
    })

    return res.status(201).send(newProfile)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.put("/", auth, async (req, res) => {
  try {
    const myProfile = await prisma.profile.findOne({
      where: { userId: req.userID },
    })
    if (!myProfile)
      return res.status(404).send({ message: "Profile not found" })

    const updatedProfile = await prisma.profile.update({
      where: { userId: req.userID },
      data: {
        ...req.body,
      },
    })

    return res.send(updatedProfile)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

module.exports = router
