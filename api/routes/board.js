var express = require("express");
var router = express.Router();
var originData = require("../public/players.json");
var totalMoney = 0;
var index = 1;

class BoardUser {

    constructor(data) {
        Object.assign(this, data);

        this.playerId = data.playerId;
        this.username = data.username;
        this.country = data.country;
        this.money = data.money;
        this.rank = data.rank;
        this.dailyDif = data.dailyDif;
        this.difColor = data.difColor;
        this.prize = data.prize;
    }
}

function prizeCalculator(totalMoney, result) {

    var twoOfTotalMoney = totalMoney * 0.02;
    var remainingPrizeFirst = ((twoOfTotalMoney * 0.25) / 17).toFixed(0);
    var remainingPrizeSecond = ((twoOfTotalMoney * 0.2) / 30).toFixed(0);
    var remainingPrizeThird = ((twoOfTotalMoney * 0.1) / 50).toFixed(0);

    list.items.forEach(element => {

        if (element.rank == 1) {
            element.prize = (twoOfTotalMoney * 0.2).toFixed(0);
        } else if (element.rank == 2) {
            element.prize = (twoOfTotalMoney * 0.15).toFixed(0);
        } else if (element.rank == 3) {
            element.prize = (twoOfTotalMoney * 0.1).toFixed(0);
        } else if (element.rank > 3 && element.rank <= 20) {
            element.prize = remainingPrizeFirst;
        } else if (element.rank > 20 && element.rank <= 50) {
            element.prize = remainingPrizeSecond;
        } else if (element.rank > 50 && element.rank <= 100) {
            element.prize = remainingPrizeThird;
        } else {
            element.prize = ":)"
        }
    });
}

var list = new BoardUser(originData);

list.items.sort(function (a, b) {
    return b.money - a.money;
});

list.items.forEach(element => {
    element.rank = index;
    totalMoney += element.money;

    var random = Math.floor(Math.random() * 3);
    if (random == 0 || element.rank < 3) {
        element.dailyDif = "↑" + Math.floor(Math.random() * 10);
        element.difColor = "Success";
    } else if (random == 1) {
        element.dailyDif = "↔";
        element.difColor = "Stable";
    } else if (random == 0 || element.rank < 10) {
        element.dailyDif = "↓" + Math.floor(Math.random() * 5);
        element.difColor = "Down";
    } else {
        element.dailyDif = "↓" + Math.floor(Math.random() * 20);
        element.difColor = "Down";
    }
    index++;

});

prizeCalculator(totalMoney, list.items);

var index = -1;
var val = "New York Winder"
var filteredObj = list.items.find(function (item, i) {
    if (item.username === val) {
        index = item.rank;
        return i;
    }
});

var filteredList = list.items.slice(index - 4, index + 2)

list["items"] = list.items.slice(0, 100);
list["useritems"] = filteredList;

router.get("/", function (req, res, next) {
    res.send(list);
});

module.exports = router;