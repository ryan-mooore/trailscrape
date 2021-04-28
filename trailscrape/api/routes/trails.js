var express = require('express');


var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


router.get('/', function (req, response, next) {
    MongoClient.connect("mongodb://localhost:27017/trailscrape", (err, client) => {
        if (err) throw err;
        var db = client.db('trailscrape');

        let json = { regions: [] };
        let statuses;
        let regions;

        db.collection("region_status").find().toArray((err, res) => {
            if (err) throw err;
            statuses = res;
            db.collection("region").find().toArray((err, res) => {
                if (err) throw err;
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

                response.send(json);
            });
        });
    });
});

router.get('/:regionID', function (req, res, next) {
    MongoClient.connect("mongodb://localhost:27017/trailscrape", (err, client) => {
        if (err) throw err;
        var db = client.db('trailscrape');
        db.collection("region_status").findOne({ ID: req.params.regionID }, (err, status) => {
            db.collection("region").findOne({ ID: req.params.regionID }, (err, region) => {
                res.send({ region: region, status: status })
            })
        })
    }
    )
}
);
module.exports = router;