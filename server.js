const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

const clubController = require("./controllers/clubController")
const userController = require("./controllers/userController")

app.use(cors())
app.use(bodyParser.json())

app.use("/clubs", clubController)
app.use("/users", userController)

app.use("/health", (req, res) => {
    res.send("I'm Ok...")
})

app.listen(80, () => {
    console.log("start server in 80")
})