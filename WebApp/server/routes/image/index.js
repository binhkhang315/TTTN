var router = require('express').Router();

// split up route handling
router.use('/image', require('./image'));

// etc.

module.exports = router;
