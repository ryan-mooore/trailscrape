const { Router } = require("express");

const { MongoClient } = require("mongodb");
const router = Router();

const generateResponse = async ({ params }, response) => {
  let json = {};
  let statuses;
  let regions;

  const db_status = await db.collection("status").findOne().catch(console.log);
  const db_region = await db.collection("regions").findOne().catch(console.log);

  statuses = db_status.activities[params.activityID];
  regions = db_region.activities[params.activityID];

  jsonRegions = {};
  for (let [regionID, region] of Object.entries(regions)) {
    jsonRegion = { name: region.name, parks: {} };
    for (let [parkID, park] of Object.entries(region.parks)) {
      jsonRegion.parks[parkID] = {
        park: regions[regionID].parks[parkID],
        status: statuses[regionID].parks[parkID],
      };
    }
    jsonRegions[regionID] = jsonRegion;
  }
  json[params.activityID] = jsonRegions;
  return response.send(json);
};

(async () => {
  client = await MongoClient.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017",
    { useUnifiedTopology: true }
  );
  db = client.db("trailscrape");

  router.get("/:activityID", function (req, response) {
    return generateResponse(req, response);
  });
})();

module.exports = router;
