var express = require('express');

var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

var uri = process.env.MONGODB_URI || "mongodb://localhost:27017/trailscrape";
var db = MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    db = client.db('trailscrape');

    router.get('/:activityID', function (req, response, next) {
        let json = {};
        let statuses;
        let regions;

        db.collection("status").findOne((err, res) => {
            if (err) {
                console.log(err);
                throw err;
            }
            statuses = res.activities[req.params.activityID]
            db.collection("regions").findOne((err, res) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                regions = res.activities[req.params.activityID];
                if (!regions) {
                    res.statusCode = 404;
                    return res.send("The specified region does not exist.")
                }
                
                jsonRegions = {}
                for (let [regionID, region] of Object.entries(regions)) {
                    jsonRegion = {name: region.name, parks: {}}
                    for (let [parkID, park] of Object.entries(region.parks)) {
                        jsonRegion.parks[parkID] = {
                            park: regions[regionID].parks[parkID],
                            status: statuses[regionID].parks[parkID]
                        }
                    }
                    jsonRegions[regionID] = jsonRegion
                }
                json[req.params.activityID] = jsonRegions
                return response.send(json);
            });
        });
    });
});

module.exports = router;