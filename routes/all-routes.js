const authorize = require('../middleware/authorize');

const router = require('express').Router();

router.use(require('./auth-routes'))
router.use(authorize);
router.use('/exercise', require('./exercises-routes'))

module.exports = router;