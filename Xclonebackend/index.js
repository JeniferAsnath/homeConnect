const express = require('express')
const app = express()
const port = 3000
const postRoute = require("../routes/postRoute/postsRoute.js")

app.use('/post', postRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
