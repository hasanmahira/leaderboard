var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.send("API iis working properly");
});

module.exports = router;