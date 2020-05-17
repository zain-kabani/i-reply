var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test_api', (req, res, next) => {
  console.log("HELLO")
  res.json({"thing": "thing"})

});

module.exports = router;
