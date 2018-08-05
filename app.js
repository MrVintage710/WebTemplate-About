const express = require("express")
const Joi = require("joi")
const path = require("path")
const fs = require("fs")

const app = express()

app.use(express.static(__dirname + '/public'))

const shouldAB = false
var siteA = true

app.get("/", (req, res) => {
    if(shouldAB) {
        if(siteA) {
            res.sendFile(path.join(__dirname + '/index-a.html'))
        } else {
            res.sendFile(path.join(__dirname + '/index-b.html'))
        }

        siteA = !siteA
    } else {
        res.sendFile(path.join(__dirname + "/index-a.html"))
    }
})

app.get("/examples/:id", (req, res) => {
    var file = fs.readFile(path.join(__dirname + "/pdf_" + req.params.id + ".html"), function (err, data) {
        if (err) {
            res.status(404).send("Cannot find file.")
        } else {
            res.sendFile(path.join(__dirname + "/pdf_" + req.params.id + ".html"))
        }
    });
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
