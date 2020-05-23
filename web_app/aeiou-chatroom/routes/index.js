var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/test_api', (req, res, next) => {
    console.log("request: " + req.body);
    res.json({ user: "Bot", message: req.body.message });
});

module.exports = router;
