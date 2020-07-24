const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const token = req.header("Authorization")
  if (!token) return res.status(401).send({ message: "Missing token" })

  try {
    const decoded = jwt.verify(token, "superSecret")
    req.userID = decoded.id

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).send({ message: "Invalid token" })
  }
}
