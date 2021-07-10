var express = require("express");
var router = express.Router();
var originData = require("../public/data.json");

var totalMoney = 0;

class BoardUser {
    playerId;
    username;
    country;
    money;
    rank;
    dailyDif;
    earn;

    constructor(data) {
        Object.assign(this, data);
        //  ^^^^^^^^^^^^^^^^^^^^^^^^^^
    }
}

var list = new BoardUser(originData);

list.items.sort(function (a, b) {
    return b.money - a.money;
});

 
list.items.forEach(element => {
    console.log("element",element);
    var i = 1;
    element.rank = i;
    totalMoney += element.money;

    var random = Math.floor(Math.random() * 3);
    if (random == 0) {
        element.dailyDif = "green";
    } else if (random == 1) {
        element.dailyDif = "yellow";
    } else {
        element.dailyDif = "red";
    }

    element.earn = Math.floor(Math.random() * 3000);

    i++;
});


function prizeCalculator(totalMoney, result) {
    console.log("totalMoney", totalMoney)

    var twoOfTotalMoney = totalMoney * 0.02;
    console.log("twoOfTotalMoney", twoOfTotalMoney);

    result[1][6] = twoOfTotalMoney * 0.2;
    console.log("result[1][6]", result[1][6]);

    result[2][6] = twoOfTotalMoney * 0.15;
    console.log("result[1][6]", result[2][6]);

    result[3][6] = twoOfTotalMoney * 0.1;
    console.log("result[1][6]", result[3][6]);
}




router.get("/", function (req, res, next) {

           

    res.send(list);
});

module.exports = router;