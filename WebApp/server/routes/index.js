var router = require('express').Router();

router.use('/', require('./index/index.js'));
router.use('/image', require('./image'));

module.exports = router;
