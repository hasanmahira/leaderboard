var express = require("express");
var router = express.Router();
var obj = require("../public/data.json");

router.get("/", function (req, res, next) {

    var bla;
    bla = obj.sort(function (a, b) {
        return b.money - a.money;
    });

    for (const index in bla) {
        console.log(`${bla[index].username} is at position ${index}`)
    }

    


    res.send(bla);
});

module.exports = router;