const express = require("express");
const Joi = require("joi");
const path = require("path");

const app = express();

app.use(express.static(__dirname + '/public'))

const shouldAB = false
var siteA = true

app.get("/", (req, res) => {
    if(shouldAB) {
        if(siteA) {
            res.sendFile(path.join(__dirname + '/index-a.html'));
        } else {
            res.sendFile(path.join(__dirname + '/index-b.html'));
        }

        siteA = !siteA
    } else {
        res.sendfile(path.join(__dirname + "/index-a.html"))
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
