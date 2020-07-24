const router = require("express").Router()
const auth = require("../../middleware/auth")
const Post = require("../../models/Post")

router.get("/", auth, async (req, res) => {
  try {
    const allPosts = await Post.findAll()

    return res.send(allPosts)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.get("/:id", auth, async (req, res) => {
  try {
    const targetPost = await Post.findOne({ where: { id: req.params.id } })
    if (!targetPost) return res.status(404).send({ message: "Post not found" })

    return res.send(targetPost)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.post("/", auth, async (req, res) => {
  const { title, content, published } = req.body

  try {
    const newPost = Post.build({
      authorId: req.userID,
      title,
      content,
    })
    if (published) newPost.published = published
    await newPost.save()

    return res.status(201).send(newPost)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

router.delete("/:id", auth, async (req, res) => {
  try {
    const postToDelete = await Post.findOne({ where: { id: req.params.id } })

    if (!postToDelete)
      return res.status(404).send({ message: "Post not found" })
    if (postToDelete.authorId !== req.userID)
      return res.status(403).send({ message: "Access denied" })

    await postToDelete.destroy()

    return res.send(postToDelete)
  } catch ({ message }) {
    console.log(message)
    return res.status(500).send({ message })
  }
})

module.exports = router
