const express = require("express");
const Joi = require("joi");
const path = require("path");

const app = express();

app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})