var express = require("express");
var router = express.Router();
var originData = require("../public/data.json");


// var body = {
//     playerId: String,
//     username: String,
//     country: String,
//     money: Number,
//     rank: Number,
//     dailyDif: Number,
//     earn: Number,
// };

// var bodyList = List(body);



// let student = user
// student.fromJson(jsonBody)
// console.log("student.getPlayerId()",student.getPlayerId())
// console.log("student.getUsername()",student.getUsername())

router.get("/", function (req, res, next) {

    const objson = JSON;
    objson["items"] = [];

    var totalMoney = 0;

    var bla;
    bla = originData.items.sort(function (a, b) {
        return b.money - a.money;
    });

    var bune = JSON.stringify(bla);
    var columns = ['playerId', 'username', 'country', 'money', 'rank', 'dailyDif', "earn"];

    // var result = JSON.parse(bune);
    // console.log("result2", result);

    var result = JSON.parse(bune)
        .map(function (obj) {
            return columns.map(function (key) {
                return obj[key];
            });
        });
    result.unshift(columns);
    // console.log("result", result2);


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

            element[6] = "prize"
        }
        // console.log("element",element);

        //  const bubi = JSON.parse(element);
        // console.log("bubi",bubi);

        // const text = '[ "Ford", "BMW", "Audi", "Fiat" ]';
        // const text = JSON.stringify(element);
        // console.log("text", text);
        // const myArr = JSON.parse(text);
        // console.log("myArr", myArr);


    }

    prizeCalculator(totalMoney, result);
    // console.log("objson123", objson);

    // var formattedList = arrayToJSONObject(result);
    // console.log("formattedList",formattedList);
    // objson["items"].push(formattedList);
    // console.log("objson",objson);

    //header
    var keys = result[0];

    //vacate keys from main array
    var newArr = result.slice(1, result.length);

    var formatted = [],
        data = newArr,
        cols = keys,
        l = cols.length;
    for (var i = 0; i < data.length; i++) {
        var d = data[i],
            o = {};
        for (var j = 0; j < l; j++)
            o[cols[j]] = d[j];
        formatted.push(o);
    }
    // return formatted;
    objson["items"].push(formatted);

    console.log("formatted", objson);

    res.send(objson);
});

module.exports = router;

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


//javascript create JSON object from two dimensional Array
// function arrayToJSONObject (arr){
//     //header
//     var keys = arr[0];

//     //vacate keys from main array
//     var newArr = arr.slice(1, arr.length);

//     var formatted = [],
//     data = newArr,
//     cols = keys,
//     l = cols.length;
//     for (var i=0; i<data.length; i++) {
//             var d = data[i],
//                     o = {};
//             for (var j=0; j<l; j++)
//                     o[cols[j]] = d[j];
//             formatted.push(o);
//     }
//     return formatted;
// }