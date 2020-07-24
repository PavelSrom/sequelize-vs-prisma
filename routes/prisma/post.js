const router = require("express").Router()
const prisma = require("../../prisma-client")
const auth = require("../../middleware/auth")

router.get("/", auth, async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany()

    return res.send(allPosts)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.get("/:id", auth, async (req, res) => {
  try {
    const targetPost = await prisma.post.findOne({
      where: { id: Number(req.params.id) },
    })
    if (!targetPost) return res.status(404).send({ message: "Post not found" })

    return res.send(targetPost)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.post("/", auth, async (req, res) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        User: {
          connect: {
            id: req.userID,
          },
        },
        ...req.body,
      },
    })

    return res.status(201).send(newPost)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.delete("/:id", auth, async (req, res) => {
  try {
    const postToDelete = await prisma.post.findOne({
      where: { id: Number(req.params.id) },
    })
    if (!postToDelete)
      return res.status(404).send({ message: "Post not found" })
    if (postToDelete.authorId !== req.userID)
      return res.status(403).send({ message: "Access denied" })

    await prisma.post.delete({ where: { id: Number(req.params.id) } })

    return res.send(postToDelete)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

module.exports = router
