var express = require("express");
var router = express.Router();
var data = require("../public/data.json");

router.get("/", function (req, res, next) {

    var totalMoney = 0;

    var bla;
    bla = data.sort(function (a, b) {
        return b.money - a.money;
    });

    var bune = JSON.stringify(bla);
    var columns = ['playerId', 'username', 'country', 'money', 'rank', 'dailyDif', "earn"];

    var result = JSON.parse(bune).map(function (obj) {
        return columns.map(function (key) {
            return obj[key];
        });
    });
    result.unshift(columns);


    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        if (index > 0) {
            element[4] = index;

            totalMoney += element[3]

            var random = Math.floor(Math.random() * 3);
            if (random == 0) {
                element[5] = "green";
            } else if (random == 1) {
                element[5] = "yellow";
            } else {
                element[5] = "red";
            }

        }

    }

    
    console.log("totalMoney", totalMoney)

    var twoOfTotalMoney = totalMoney * 0.02;
    console.log("twoOfTotalMoney",twoOfTotalMoney);
    
   result[1][6] = twoOfTotalMoney*0.2
   console.log("result[1][6]",result[1][6]);

   result[2][6] = twoOfTotalMoney*0.15
   console.log("result[1][6]",result[2][6]);

   result[3][6] = twoOfTotalMoney*0.1
   console.log("result[1][6]",result[3][6]);

   
    // console.log("element", element)

    res.send(result);
});

module.exports = router;