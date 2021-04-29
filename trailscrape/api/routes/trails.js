var express = require('express');

var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/trailscrape";

router.get('/', function (req, response, next) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            console.log(err);
            throw err;
        }
        var db = client.db('trailscrape');

        let json = { regions: [] };
        let statuses;
        let regions;

        db.collection("region_status").find().toArray((err, res) => {
            if (err) {
                console.log(err);
                throw err;
            }
            statuses = res;
            db.collection("region").find().toArray((err, res) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                regions = res;

                for (let status of statuses) {
                    for (let region of regions) {
                        if (region.ID === status.ID) {
                            json.regions.push({
                                status: status,
                                region: region
                            });
                        }
                    }
                }

                return response.send(json);
            });
        });
    });
});

router.get('/:regionID', function (req, res, next) {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            console.log(err);
            throw err;
        }
        var db = client.db('trailscrape');
        db.collection("region_status").findOne({ ID: req.params.regionID }, (err, status) => {
            db.collection("region").findOne({ ID: req.params.regionID }, (err, region) => {
                if (status === null || region === null) {
                    res.statusCode = 404;
                    return res.send("The specified region does not exist.")
                }
                return res.send({ region: region, status: status })
            })
        })
    }
    )
}
);
module.exports = router;