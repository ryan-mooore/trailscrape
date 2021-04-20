var express = require('express');


const data = require('../../backend/db/status.json');

var router = express.Router();

router.get('/', function(req, res, next) {

    res.send({"regions": data, "error": false});
});
module.exports = router;