var express = require("express");
var router = express.Router();
// var originData = require("../public/data.json");
const { MongoClient } = require('mongodb');
const uri = "mongodb://boardsys:sys123@ec2-18-189-54-164.us-east-2.compute.amazonaws.com:27017/admin";
var list;
var originData;

var totalMoney = 0;
var index = 1;
var datalist;
class BoardUser {
    _id;
    playerId;
    username;
    country;
    money;
    rank;
    dailyDif;
    prize;

    constructor(data) {
        Object.assign(this, data);
    }
}

var someList;

async function getData() {
    const uri = "mongodb://boardsys:sys123@ec2-18-189-54-164.us-east-2.compute.amazonaws.com:27017/admin";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        var dbo = client.db("board");
        var coll = dbo.collection("users");
        var blalal = await coll.find({}).sort({ 
            "_id" : -1
        }).limit(1)
        .toArray();
        

    } catch (e) {
        console.error("error", e);
    } finally {
        await client.close();
        return blalal;
    }
}

getData().catch(console.error);


router.get("/", function (req, res, next) {


    (async () => {


        originData = await getData();
        console.log("originData", originData);


        list = new BoardUser(originData);
        console.log("list", list);

        // list.sort(function (a, b) {
        //     return b.money - a.money;
        // });


        originData.forEach(element => {
            element.rank = index;
            totalMoney += element.money;

            var random = Math.floor(Math.random() * 3);
            // if (random == 0) {
            //     element.dailyDif = "green";
            // } else if (random == 1) {
            //     element.dailyDif = "yellow";
            // } else {
            //     element.dailyDif = "red";
            // }
            if (random == 0 || element.rank < 3) {
                element.dailyDif = "↑" + Math.floor(Math.random() * 10);
            } else if (random == 1) {
                element.dailyDif = "↔";
            } else if (random == 0 || element.rank < 10) {
                element.dailyDif = "↓" + Math.floor(Math.random() * 5);
            } else {
                element.dailyDif = "↓" + Math.floor(Math.random() * 20);
            }
            index++;

        });

        prizeCalculator(totalMoney, list);

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
                }
            });
        }

        res.send(await list);



    })()

    // var blaaaa = await getData();
});


// datalist = await getData();
// console.log("datalist", datalist);

// list = new BoardUser(datalist);
// // console.log("list", list);

// list.sort(function (a, b) {
//     return b.money - a.money;
// });


// list.forEach(element => {
//     element.rank = index;
//     totalMoney += element.money;

//     var random = Math.floor(Math.random() * 3);
//     // if (random == 0) {
//     //     element.dailyDif = "green";
//     // } else if (random == 1) {
//     //     element.dailyDif = "yellow";
//     // } else {
//     //     element.dailyDif = "red";
//     // }
//     if (random == 0 || element.rank < 3) {
//         element.dailyDif = "↑" + Math.floor(Math.random() * 10);
//     } else if (random == 1) {
//         element.dailyDif = "↔";
//     } else if (random == 0 || element.rank < 10) {
//         element.dailyDif = "↓" + Math.floor(Math.random() * 5);
//     } else {
//         element.dailyDif = "↓" + Math.floor(Math.random() * 20);
//     }
//     index++;

// });

// prizeCalculator(totalMoney, list);

// function prizeCalculator(totalMoney, result) {

//     var twoOfTotalMoney = totalMoney * 0.02;
//     var remainingPrizeFirst = ((twoOfTotalMoney * 0.25) / 17).toFixed(0);
//     var remainingPrizeSecond = ((twoOfTotalMoney * 0.2) / 30).toFixed(0);
//     var remainingPrizeThird = ((twoOfTotalMoney * 0.1) / 50).toFixed(0);

//     list.items.forEach(element => {

//         if (element.rank == 1) {
//             element.prize = (twoOfTotalMoney * 0.2).toFixed(0);
//         } else if (element.rank == 2) {
//             element.prize = (twoOfTotalMoney * 0.15).toFixed(0);
//         } else if (element.rank == 3) {
//             element.prize = (twoOfTotalMoney * 0.1).toFixed(0);
//         } else if (element.rank > 3 && element.rank <= 20) {
//             element.prize = remainingPrizeFirst;
//         } else if (element.rank > 20 && element.rank <= 50) {
//             element.prize = remainingPrizeSecond;
//         } else if (element.rank > 50 && element.rank <= 100) {
//             element.prize = remainingPrizeThird;
//         }
//     });
// }

// router.get("/", function (req, res, next) {
//     res.send(list);
// });


module.exports = router;