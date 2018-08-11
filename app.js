const express = require("express")
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
    fs.readFile(path.join(__dirname + "/public/pdf/" + req.params.id + ".pdf"), function (err, data) {
        if (err) {
            res.status(404).send("Cannot find file.")
            res.end
        } else {
            res.writeHead(200, {'Content-Type': 'application/pdf'})
            res.write(data)
            res.end()
        }
    });
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
