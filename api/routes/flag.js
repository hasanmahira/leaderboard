var express = require("express");
var router = express.Router();
const { MongoClient } = require('mongodb');

var someList;

async function getData() {
    const uri = "mongodb://boardsys:sys123@ec2-18-189-54-164.us-east-2.compute.amazonaws.com:27017/admin";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        var dbo = client.db("board");
        var coll = dbo.collection("users");
        // var query = { CountryName: "Turkey" };
        var query = { playerId: { $gt: 20 } };

        var blalal = await coll.find({}).toArray();
        // console.log("blalal", blalal);
        // somelist["items"] = blalal;
        // console.log("somelist", somelist);

        // console.log("blabla",blabla);
        // somelist = coll.find({}).toArray(function (err, result) {
        //     console.log(result);
        //     someList = result;
        //     client.close();
        // });;


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
        // console.log(await getData())
        res.send(await getData());

    })()

    // var blaaaa = await getData();
});

module.exports = router;


//https://steamcommunity-a.akamaihd.net/public/images/countryflags/nl.gif

