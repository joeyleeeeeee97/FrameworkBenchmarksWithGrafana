var express = require('express');
var router = express.Router();
const wrap = (fn) => (req, res) =>
    fn(req, res).catch(console.error.bind(console));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/FrameworkBenchmarks', wrap(require("./FrameworkBenchmarks")))

module.exports = router;