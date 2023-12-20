var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/health-check', function(req, res, next) {
  res.send("ok")
});

module.exports = router;
