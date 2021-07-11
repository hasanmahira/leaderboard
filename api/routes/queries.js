var express = require("express");
var router = express.Router();
const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://boardsys:sys123@ec2-18-189-54-164.us-east-2.compute.amazonaws.com:27017/admin";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        var dbo = client.db("board");
        var coll = dbo.collection("users");
        // var query = { CountryName: "Turkey" };
        // var query = { playerId: { $gt: 20 } };

        var blalal = await coll.find({  }).toArray();
         return blalal;
        
         console.log("blabla",blabla);
        // somelist = coll.find({}).toArray(function (err, result) {
        //     console.log(result);
        //     someList = result;
        //     client.close();
        // });;

    } catch (e) {
        console.error("error", e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
module.exports = router;
