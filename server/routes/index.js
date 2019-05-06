var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Welcome to Chorequest API");
});

module.exports = router;